# ⚡ ExtractFlow AI

**Your documents. Your AI. No compromises.**

100% local AI document intelligence. Upload files, chat with AI, generate slide decks, podcasts, mind maps, flashcards, and structured data extractions. Everything runs on your machine.

## Features

- 🗣️ **AI Chat** — Ask questions about your documents, get precise answers
- 📊 **Slide Decks** — Auto-generate presentations from any document
- 🎙️ **Podcast** — Turn documents into two-speaker audio conversations
- 🧠 **Mind Maps** — Visualize document structure with interactive trees
- 📚 **Flashcards** — Auto-generate study materials
- ⚡ **Data Extraction** — Pull structured JSON from unstructured text
- ☁️ **Cloud AI** — Connect Gemini, OpenAI, Claude, Groq, DeepSeek + 5 more
- 🤖 **Ensemble Mode** — Multiple models work together as a team
- 📚 **Knowledge Base** — Persistent offline document storage
- 🔐 **Login System** — User accounts with session memory
- 🎨 **3 Modes** — Normal (simple), Dev (power user), Demo (presentation)
- 🔒 **100% Private** — No data leaves your computer

## Model Library (50+ models)

| Type | Models |
|------|--------|
| Text Generation | Qwen3, Llama 3, Phi-4, Gemma 3, Mistral, DeepSeek, Yi, CodeLlama... |
| Embeddings | MiniLM, BGE, E5, Nomic, Stella |
| Translation | NLLB-200, OPUS (10 language pairs) |
| Speech | Whisper Tiny → Large, Wav2Vec2 |
| Vision | MobileNet, ViT, DeiT, SAM, DETR |
| Classification | DistilBERT, BART, RoBERTa |

## Quick Start

### Windows (One Click)
```
Double-click start.bat
```

### Manual
```bash
# Install Python deps
pip install -r requirements.txt

# Install frontend
cd frontend && npm install && npm run dev

# Build marketing website
cd website && npm install && npm run build

# Start server
python server/main.py
```

Open **http://localhost:4000**

## Project Structure

```
extractflow-ai/
├── server/main.py          # Python FastAPI backend (1000+ lines)
├── frontend/               # React + Vite app
│   └── src/App.jsx         # Main app with 10 tabs
├── website/                # Marketing website (React + TypeScript)
│   ├── src/App.tsx         # Landing page with motion graphics
│   └── terms.html          # Terms & Privacy
├── models/                 # Downloaded GGUF models
├── data/                   # SQLite database (offline)
├── output/                 # Exported files
├── build_exe.py            # EXE builder (PyInstaller)
├── start.bat               # One-click launcher
└── requirements.txt        # Python dependencies
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Create account |
| `/api/auth/login` | POST | Login |
| `/api/chat` | POST | Chat with local LLM |
| `/api/cloud/chat` | POST | Chat via cloud API |
| `/api/ensemble/chat` | POST | Multi-model ensemble chat |
| `/api/models` | GET | List all models |
| `/api/models/{id}/download` | POST | Download model |
| `/api/models/{id}/load` | POST | Load model |
| `/api/upload` | POST | Upload document |
| `/api/generate/slides` | POST | Generate slides |
| `/api/generate/podcast` | POST | Generate podcast |
| `/api/generate/infographic` | POST | Generate infographic |
| `/api/generate/mindmap` | POST | Generate mind map |
| `/api/templates` | GET | List prompt templates |
| `/api/sessions` | GET | List chat sessions |
| `/api/knowledge` | GET | Knowledge base |
| `/api/analytics` | GET | Usage analytics |
| `/api/settings` | GET/POST | User settings |
| `/site` | GET | Marketing website |

## Tech Stack

- **Backend:** Python, FastAPI, llama-cpp-python, SQLite
- **Frontend:** React, Vite, Tailwind CSS
- **Website:** React, TypeScript, Vite, CSS Motion Graphics
- **AI:** llama.cpp (local), 10 cloud API providers
- **License:** MIT

## Links

- [GitHub](https://github.com/hackathon-XD/extractflow)
- [Terms](http://localhost:4000/terms)
- [Website](http://localhost:4000/site)

---

Built with ⚡ by [hackathon-XD](https://github.com/hackathon-XD)
