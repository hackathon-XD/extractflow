# ExtractFlow AI

> **NotebookLM killer** — upload documents, chat with AI, generate slide decks, infographics, and podcasts. All local. Your data never leaves your machine.

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![llama.cpp](https://img.shields.io/badge/llama.cpp-FF6B35?style=flat&logo=cplusplus&logoColor=white)
![Privacy](https://img.shields.io/badge/100%25-Local-green?style=flat)

---

## Why ExtractFlow?

| Feature | NotebookLM | ExtractFlow |
|---------|-----------|-------------|
| Local / Private | ❌ Google Cloud | ✅ 100% local |
| Slide Generation | ✅ | ✅ HTML export |
| Infographic Generation | ❌ | ✅ Data viz + export |
| Podcast Generation | ✅ | ✅ TTS with speakers |
| Model Library | ❌ Locked | ✅ 40+ GGUF models |
| Open Source | ❌ | ✅ MIT License |
| API Keys Required | ✅ Google | ❌ None |

---

## Features

### Chat with Documents
- Upload TXT, CSV, JSON, MD files
- Smart keyword-RAG retrieval
- Ask questions, get answers from your docs
- Voice input (STT) + voice output (TTS)

### Generate Slide Decks
- AI-powered presentation builder
- Title slide, content slides, summary slide
- Export as standalone HTML
- Keyboard navigation (← →)

### Generate Infographics
- Auto-extract key statistics and topics
- Visual data cards with color-coded sections
- Key numbers highlight
- Export as standalone HTML

### Generate Podcasts
- Two-speaker conversation script
- Host + Co-host alternating dialogue
- Play with browser TTS (Web Speech API)
- Click any segment to start from there

### Model Library (40+ Models)
SmolLM, Qwen, Phi, Llama, Gemma, Mistral, DeepSeek, Yi, StableLM, OpenHermes, SOLAR, Command R, CodeLlama, WizardLM, Starling, MiniCPM, InternLM, Nemotron — every major GGUF model from HuggingFace.

---

## Quick Start

### Windows
```
Double-click start.bat
```

### Manual
```bash
# Backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python server/main.py

# Frontend
cd frontend && npm install && npm run dev
```

Open **http://localhost:3000**

---

## Architecture

```
React + Vite (3000)  ←→  FastAPI (4000)  ←→  llama.cpp (Local LLM)
         │                       │
    WebSocket              HuggingFace Hub
    (progress)            (model downloads)
```

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS v4 |
| Backend | Python 3.12, FastAPI, Uvicorn |
| AI | llama-cpp-python (GGUF models) |
| Downloads | HuggingFace Hub |
| Voice | Web Speech API (TTS/STT) |
| Realtime | WebSocket |

---

## Built for Hackathon XD

ExtractFlow AI proves that powerful AI tools don't need cloud infrastructure. Run NotebookLM-level features entirely on your own hardware.

---

## License

MIT
