# CropSense — AI Crop Disease Detection

## Setup

1. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate       # Mac/Linux
   venv\Scripts\activate          # Windows
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Add your Groq API key:
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and paste your key:
   ```
   GROQ_API_KEY=gsk_your_key_here
   ```
   Get a key at https://console.groq.com/keys

4. Run the app:
   ```bash
   python3 app.py
   ```

5. Open http://localhost:5000 in your browser.

## Notes
- The vision model used is `qwen/qwen3.6-27b` (a Groq preview model). Groq's free-tier
  model lineup changes fairly often — if you get a `model_not_found` error, check
  https://console.groq.com/docs/models for the current vision-capable model name.
- Never commit your `.env` file — it's already excluded via `.gitignore`.
