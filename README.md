# ExtractFlow AI

> **NotebookLM-style local document intelligence** — upload documents, chat with AI, extract structured data. Everything runs 100% locally on your machine. Your files never leave.

![Architecture](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Backend](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![AI](https://img.shields.io/badge/llama.cpp-FF6B35?style=flat&logo=cplusplus&logoColor=white)
![Privacy](https://img.shields.io/badge/Privacy-Local-green?style=flat)

---

## Why ExtractFlow?

Most AI tools send your data to the cloud. ExtractFlow runs **entirely on your machine**:

- Upload confidential documents without privacy concerns
- Chat with AI about your files using local LLM inference
- Extract structured data (JSON) from any document
- Listen to audio summaries of your extractions
- Install any GGUF model from HuggingFace (SmolLM, Qwen, Phi, Llama, Gemma, Mistral)

---

## Quick Start

### Windows (One-Click)
```
Double-click start.bat
```
Auto-installs Python, Node.js, and all dependencies.

### Manual Setup
```bash
# Backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd frontend && npm install

# Start (two terminals)
python server/main.py        # Port 4000
cd frontend && npm run dev   # Port 3000
```

Open **http://localhost:3000**

---

## Architecture

```
┌─────────────────┐     WebSocket      ┌──────────────────┐
│                  │ ◀──────────────── │                  │
│   React + Vite   │                   │   FastAPI Server  │
│   Frontend       │ ◀── REST API ──▶  │   Backend        │
│   Port 3000      │                   │   Port 4000      │
└─────────────────┘                   └────────┬─────────┘
                                                │
                                       ┌────────▼─────────┐
                                       │   llama.cpp       │
                                       │   Local LLM       │
                                       │   Inference       │
                                       └──────────────────┘
```

---

## Features

### Document Intelligence
- **Upload** — Drag & drop TXT, CSV, JSON, or MD files
- **Paste** — Paste text directly for quick analysis
- **Smart Chunking** — Documents split into semantic paragraphs
- **Keyword RAG** — Relevant chunks scored and retrieved per query

### AI Chat
- Ask natural language questions about your documents
- AI answers using only the uploaded context (no hallucination)
- Real-time streaming responses

### Data Extraction
- One-click structured extraction
- Results saved as JSON notes panel
- Copy or listen to extractions (TTS)

### Model Library
- 10 pre-configured GGUF models across 7 families
- One-click download from HuggingFace
- Progress tracking with speed/ETA
- Load, switch, or delete models instantly

### Security
- **Injection Guard** — Toggle prevents prompt injection attacks
- **Local-first** — Zero data leaves your machine
- **No API keys** — No cloud dependencies

---

## Model Library

| Model | Size | Context | Best For |
|-------|------|---------|----------|
| SmolLM2 135M | 270MB | 2K | Testing, speed |
| SmolLM2 360M | 720MB | 4K | Demos (recommended) |
| Qwen 2.5 0.5B | 1GB | 8K | Multilingual |
| Qwen 2.5 1.5B | 1.8GB | 32K | Power users |
| Phi-2 | 480MB | 2K | Reasoning |
| Phi 3.5 Mini | 2.3GB | 128K | Best reasoning |
| Llama 3.2 1B | 1.2GB | 8K | General purpose |
| Llama 3.2 3B | 3.2GB | 128K | Capable all-rounder |
| Gemma 2B | 1.5GB | 8K | Google ecosystem |
| Mistral 7B | 4.4GB | 32K | Industry standard |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Python, FastAPI, Uvicorn |
| AI Engine | llama-cpp-python (GGUF models) |
| Realtime | WebSocket (download progress) |
| Downloads | HuggingFace Hub |
| TTS/STT | Web Speech API (browser) |

---

## Project Structure

```
extractflow-ai/
├── server/
│   └── main.py              # FastAPI backend (260 lines)
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # React app (350 lines)
│   │   ├── index.css         # Premium glassmorphism CSS
│   │   └── main.jsx         # Entry point
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── models/                   # GGUF model files (auto-created)
├── requirements.txt
├── start.bat                 # One-click Windows launcher
├── .gitignore
└── README.md
```

---

## Built for [Hackathon XD](https://github.com/hackathon-XD)

ExtractFlow AI demonstrates that powerful AI doesn't require cloud infrastructure. By combining local LLM inference with a beautiful, responsive UI, we enable anyone to build intelligent document workflows on their own hardware.

---

## License

MIT
