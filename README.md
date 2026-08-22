
<div align="center">

```
   ██████╗██████╗  ██████╗ ██████╗ ███████╗███████╗███╗   ██╗███████╗███████╗
  ██╔════╝██╔══██╗██╔═══██╗██╔══██╗██╔════╝██╔════╝████╗  ██║██╔════╝██╔════╝
  ██║     ██████╔╝██║   ██║██████╔╝███████╗█████╗  ██╔██╗ ██║███████╗█████╗
  ██║     ██╔══██╗██║   ██║██╔═══╝ ╚════██║██╔══╝  ██║╚██╗██║╚════██║██╔══╝
  ╚██████╗██║  ██║╚██████╔╝██║     ███████║███████╗██║ ╚████║███████║███████╗
   ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝╚══════╝
```

### 🌿 Point. Snap. Diagnose. Save the harvest. 🌿

**An AI agronomist that lives in your browser, powered by lightning-fast vision models on Groq.**

![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-Backend-000000?style=for-the-badge&logo=flask&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-Vision%20AI-F55036?style=for-the-badge&logo=lightning&logoColor=white)
![Status](https://img.shields.io/badge/status-growing%20wild-brightgreen?style=for-the-badge)

</div>

---

## 🚨 WHAT IS THIS SORCERY?

Farmers have been squinting at leaves since the dawn of agriculture. **CropSense says: no more.**

Snap a photo of a crop leaf → a vision-capable LLM interrogates it like a plant detective →
you get a full diagnosis faster than you can say *"is that blight or just bad lighting?"*

No apps to install. No agronomy degree required. Just a browser, a photo, and a sprinkle of AI wizardry. 🧙‍♂️🌾

---

## ⚡ THE MAGIC TRICK (a.k.a. how it works)

```
📸  Upload leaf photo
        │
        ▼
🖼️  Flask compresses & encodes image (because nobody has time for slow uploads)
        │
        ▼
🚀  Image rockets to Groq's vision model at ludicrous speed
        │
        ▼
🧠  AI plays plant doctor — crop type, disease, severity, confidence
        │
        ▼
📋  Clean JSON verdict beams back to your screen
        │
        ▼
🎉  You save your tomatoes. Or wheat. Or dignity.
```

---

## 🛠️ TECH STACK (the Avengers of this repo)

| Hero | Power |
|---|---|
| 🐍 **Python + Flask** | The backend brain holding it all together |
| 🖼️ **Pillow (PIL)** | Resizes & compresses images so your server doesn't cry |
| 🤖 **Groq API** | Blazing-fast inference — vision model doing the actual detective work |
| 🎨 **HTML/CSS/JS** | The face you actually see and click things on |

---

## 🚀 QUICKSTART — FROM ZERO TO CROP DOCTOR IN 5 STEPS

```bash
# 1️⃣ Clone this beauty
git clone https://github.com/VrishtiRajput/crop_sense.git
cd crop_sense

# 2️⃣ Summon a virtual environment
python3 -m venv venv
source venv/bin/activate      # Windows warriors: venv\Scripts\activate

# 3️⃣ Feed it dependencies
pip install -r requirements.txt

# 4️⃣ Give it a brain (your Groq API key)
cp .env.example .env
# open .env and paste: GROQ_API_KEY=gsk_your_key_here
# get one free at https://console.groq.com/keys

# 5️⃣ LIFT OFF 🚀
python3 app.py
```

Then swing by **http://localhost:5000** and start diagnosing.

---

## 🔒 THE ONE RULE OF CROPSENSE CLUB

> **Never, ever commit your `.env` file.**
> It's already blacklisted in `.gitignore` for your own protection. Respect it. 🙏
> (Ask us how we know this is important. 👀)

---

## 🌱 ROADMAP TO WORLD DOMINATION (a.k.a. future ideas)

- [ ] 📱 Mobile-friendly camera capture
- [ ] 🗣️ Multi-language diagnosis (because plants don't only speak English)
- [ ] 📊 Disease history dashboard per crop
- [ ] 🌦️ Weather-aware risk predictions
- [ ] 🏆 "Healthiest Farm" leaderboard, because why not

---

<div align="center">

### 🌾 Built with equal parts Python, ambition, and mild sleep deprivation 🌾

**⭐ Star this repo if you believe leaves deserve better healthcare.**

</div>
