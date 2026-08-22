# ============================================================
#  CropSense — AI Crop Disease Detection Backend
# ============================================================
import os
import base64
import json
from io import BytesIO
from PIL import Image
from flask import Flask, request, jsonify, render_template
from groq import Groq
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY)


@app.route("/")
def index():
    return render_template("index.html")


def compress_image(image_bytes: bytes) -> bytes:
    img = Image.open(BytesIO(image_bytes)).convert("RGB")
    img.thumbnail((512, 512))
    buffer = BytesIO()
    img.save(buffer, format="JPEG", quality=85)
    return buffer.getvalue()


def analyze_with_groq(image_bytes: bytes) -> dict:
    image_b64 = base64.b64encode(image_bytes).decode("utf-8")

    prompt = """You are an expert agricultural scientist specializing in crop disease detection.

Analyze this crop image and respond ONLY with a valid JSON object in this exact format, no extra text, no markdown:
{
  "crop": "<crop type e.g. Tomato, Wheat, Rice, Corn, Unknown>",
  "status": "<Healthy or Diseased>",
  "disease_name": "<disease name or null if healthy>",
  "diagnosis": "<one sentence diagnosis>",
  "severity": "<Low, Medium, High, or null if healthy>",
  "confidence": "<High, Medium, or Low>",
  "recommendations": ["<tip 1>", "<tip 2>", "<tip 3>"]
}"""

    response = client.chat.completions.create(
        model="qwen/qwen3.6-27b",  # current Groq vision model,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{image_b64}"
                        }
                    },
                    {
                        "type": "text",
                        "text": prompt
                    }
                ]
            }
        ],
        max_tokens=1024,
        temperature=0.1
    )

    raw = response.choices[0].message.content.strip()
    print("RAW MODEL OUTPUT:", repr(raw))  # debug: see exactly what the model returned

    # Strip markdown code blocks if present
    if "```" in raw:
        parts = raw.split("```")
        raw = parts[1] if len(parts) > 1 else raw
        if raw.startswith("json"):
            raw = raw[4:]
    raw = raw.strip()

    # Fallback: extract the first {...} block in case there's leading/trailing text
    if not raw.startswith("{"):
        start = raw.find("{")
        end = raw.rfind("}")
        if start != -1 and end != -1:
            raw = raw[start:end + 1]

    return json.loads(raw)


@app.route("/analyze", methods=["POST"])
def analyze():
    image_data = None

    if "image" in request.files:
        file = request.files["image"]
        raw_bytes = file.read()
        image_data = base64.b64encode(raw_bytes).decode("utf-8")

    elif request.is_json and request.json and "image_base64" in request.json:
        raw = request.json["image_base64"]
        if "," in raw:
            _, raw = raw.split(",", 1)
        image_data = raw
    else:
        return jsonify({"error": "No image provided"}), 400

    try:
        image_bytes = base64.b64decode(image_data)
        image_bytes = compress_image(image_bytes)

        result = analyze_with_groq(image_bytes)
        print("Groq Response:", result)

        return jsonify(result)

    except json.JSONDecodeError:
        return jsonify({"error": "Failed to parse AI response"}), 500
    except Exception as e:
        return jsonify({"error": f"Analysis failed: {str(e)}"}), 500


if __name__ == "__main__":
    print("=" * 50)
    print("  🌾 CropSense — Crop Disease Detector")
    print("  Running at: http://localhost:5000")
    print("=" * 50)
    app.run(debug=True, port=5000)