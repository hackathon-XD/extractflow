import { useState, useEffect, useCallback, useRef, Fragment } from 'react'
const API = '/api'

/* ═══════════════════════════════════════════════════════════
   SVG Icon Library — clean, consistent, 24x24 viewBox
   ═══════════════════════════════════════════════════════════ */
const I = {
  Search:    p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Upload:    p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Download:  p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Check:     p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Play:      p => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Trash:     p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  X:         p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Send:      p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Shield:    p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4" strokeWidth="2"/></svg>,
  Volume:    p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>,
  Copy:      p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Cpu:       p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  Sparkles:  p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9.5 8.5 3 12l6.5 3.5L12 22l2.5-6.5L21 12l-6.5-3.5z"/></svg>,
  Book:      p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Message:   p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  FileText:  p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Zap:        p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Star:       p => <svg {...p} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Mic:        p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>,
  Layers:     p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Settings:   p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Globe:      p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
}

/* ═══════════════════════════════════════════════════════════
   Demo Data — renewable energy report for quick testing
   ═══════════════════════════════════════════════════════════ */
const DEMO = `Global Renewable Energy Report 2024

Executive Summary:
Renewable energy sources including solar photovoltaic and onshore wind accounted for 30% of global electricity generation in 2023. Total investment in clean energy reached $1.8 trillion, surpassing fossil fuel investment for the first time.

Solar Energy:
Solar PV capacity reached 1,419 GW globally, with China leading at 425 GW. LCOE for solar PV declined 89% since 2010. India added 18 GW in 2023, a 66% increase year-over-year.

Wind Energy:
Wind energy contributed 7.8% of global electricity, with 906 GW installed. Offshore wind grew 25% year-over-year to 75 GW. Europe leads offshore with 33 GW installed capacity.

Battery Storage:
Battery storage reached 45 GW / 99 GWh. Lithium-ion costs fell 14% to $139/kWh. Grid-scale deployments doubled in the US and China.

Investment:
$1.8 trillion invested in clean energy. Solar ($82B), wind ($64B), batteries ($150B). Southeast Asia and Africa saw 40% growth in renewable investment.`

/* ═══════════════════════════════════════════════════════════
   MAIN APP COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  const [docs, setDocs] = useState([])
  const [activeDocs, setActiveDocs] = useState(new Set())
  const [library, setLibrary] = useState([])
  const [models, setModels] = useState({ installed: [], available: [], active: null })
  const [chat, setChat] = useState([
    { role: 'sys', text: 'Welcome to ExtractFlow AI. Install a model from the Library tab, upload your documents, then chat or extract structured data — all running locally on your machine.' }
  ])
  const [notes, setNotes] = useState([])
  const [guard, setGuard] = useState(true)
  const [view, setView] = useState('chat')
  const [ttsActive, setTtsActive] = useState(false)
  const [modelLoading, setModelLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [familyFilter, setFamilyFilter] = useState('All')
  const [confirmDel, setConfirmDel] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [recording, setRecording] = useState(false)
  const recognitionRef = useRef(null)

  /* ── Data fetching ─────────────────────────────────── */
  const refresh = useCallback(async () => {
    try {
      const [m, d, l] = await Promise.all([
        fetch(`${API}/models`),
        fetch(`${API}/documents`),
        fetch(`${API}/library`)
      ])
      if (m.ok) { const data = await m.json(); setModels(data); setLibrary(Array.isArray(data.available) ? [...(data.installed||[]), ...data.available] : []) }
      if (d.ok) setDocs(await d.json())
    } catch {}
  }, [])

  useEffect(() => {
    let ws
    try {
      ws = new WebSocket(`ws://${window.location.host}/ws`)
      ws.onmessage = () => refresh()
    } catch {}
    refresh()
    return () => ws?.close()
  }, [])

  useEffect(() => { if (view === 'library') { const t = setInterval(refresh, 2000); return () => clearInterval(t) } }, [view, refresh])

  /* ── Handlers ──────────────────────────────────────── */
  const toggleDoc = useCallback(id => setActiveDocs(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n }), [])

  const delDoc = useCallback(async id => {
    await fetch(`${API}/documents/${id}`, { method: 'DELETE' })
    setDocs(p => p.filter(d => d.id !== id))
    setActiveDocs(p => { const n = new Set(p); n.delete(id); return n })
  }, [])

  const handleFiles = useCallback(async files => {
    for (const f of files) {
      const fd = new FormData(); fd.append('file', f)
      const r = await fetch(`${API}/upload`, { method: 'POST', body: fd })
      if (r.ok) { const d = await r.json(); setDocs(p => [...p, d]); setActiveDocs(p => new Set([...p, d.id])) }
    }
  }, [])

  const handlePaste = useCallback(async (text, name) => {
    const r = await fetch(`${API}/paste`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, name }) })
    if (r.ok) { const d = await r.json(); setDocs(p => [...p, d]); setActiveDocs(p => new Set([...p, d.id])) }
  }, [])

  const loadModel = useCallback(async mid => {
    setModelLoading(true)
    try {
      const r = await fetch(`${API}/models/${mid}/load`, { method: 'POST' })
      if (!r.ok) throw new Error((await r.json()).detail)
      await refresh()
      setChat(p => [...p, { role: 'sys', text: `Model loaded: ${mid}` }])
    } catch (e) { setChat(p => [...p, { role: 'sys', text: `Load failed: ${e.message}` }]) }
    setModelLoading(false)
  }, [refresh])

  const downloadModel = useCallback(async mid => {
    try {
      setChat(p => [...p, { role: 'sys', text: `Downloading ${mid}...` }])
      await fetch(`${API}/models/${mid}/download`, { method: 'POST' })
    } catch (e) { setChat(p => [...p, { role: 'sys', text: `Download error: ${e.message}` }]) }
  }, [])

  const deleteModel = useCallback(async mid => {
    await fetch(`${API}/models/${mid}`, { method: 'DELETE' })
    if (models.active === mid) setChat(p => [...p, { role: 'sys', text: 'Model unloaded.' }])
    await refresh()
  }, [models.active, refresh])

  const send = useCallback(async text => {
    if (!text.trim()) return
    setChat(p => [...p, { role: 'user', text }])
    if (!models.active) { setChat(p => [...p, { role: 'sys', text: 'Please load a model first from the Library tab.' }]); return }
    try {
      const r = await fetch(`${API}/chat`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, mode: 'chat', guard, doc_ids: [...activeDocs] })
      })
      const d = await r.json()
      setChat(p => [...p, { role: 'ai', text: d.response, chunks: d.chunks }])
    } catch (e) { setChat(p => [...p, { role: 'sys', text: `Error: ${e.message}` }]) }
  }, [models.active, activeDocs, guard])

  const extract = useCallback(async () => {
    if (!models.active) { setChat(p => [...p, { role: 'sys', text: 'Load a model first.' }]); return }
    try {
      const r = await fetch(`${API}/chat`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Extract all key data', mode: 'extract', guard, doc_ids: [...activeDocs] })
      })
      const d = await r.json()
      setNotes(p => [{ id: Date.now(), text: d.response, chunks: d.chunks, time: new Date().toLocaleTimeString() }, ...p])
      setChat(p => [...p, { role: 'sys', text: `Extraction saved to Notes (${d.chunks} chunks used)` }])
    } catch (e) { setChat(p => [...p, { role: 'sys', text: `Error: ${e.message}` }]) }
  }, [models.active, activeDocs, guard])

  /* ── TTS ───────────────────────────────────────────── */
  const audio = useCallback(() => {
    if (ttsActive) { speechSynthesis?.cancel(); setTtsActive(false); return }
    let s = 'Extraction summary. '
    if (notes.length) s += notes[0].text.slice(0, 500)
    const ai = chat.filter(m => m.role === 'ai')
    if (ai.length) s += ' Key findings: ' + ai[ai.length - 1].text.slice(0, 300)
    if (s.length < 40) s = 'No data to read yet.'
    setTtsActive(true)
    const u = new SpeechSynthesisUtterance(s); u.lang = 'en-US'
    u.onend = () => setTtsActive(false)
    speechSynthesis?.speak(u)
  }, [notes, chat, ttsActive])

  /* ── STT ───────────────────────────────────────────── */
  const toggleMic = useCallback(() => {
    if (recording) { recognitionRef.current?.stop(); setRecording(false); return }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { setChat(p => [...p, { role: 'sys', text: 'Speech recognition not supported in this browser.' }]); return }
    const r = new SR(); r.lang = 'en-US'; r.interimResults = false; r.maxAlternatives = 1
    r.onresult = e => { const t = e.results[0][0].transcript; setRecording(false); send(t) }
    r.onerror = () => setRecording(false)
    r.onend = () => setRecording(false)
    recognitionRef.current = r
    r.start(); setRecording(true)
  }, [send])

  /* ── Filtered library ──────────────────────────────── */
  const filtered = library.filter(m => {
    if (familyFilter !== 'All' && m.family !== familyFilter) return false
    if (search) { const q = search.toLowerCase(); return m.name.toLowerCase().includes(q) || m.desc?.toLowerCase().includes(q) }
    return true
  })

  const chunkCount = docs.filter(d => activeDocs.has(d.id)).reduce((a, d) => a + d.chunks, 0)

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */
  return (
    <div className="h-screen flex relative z-10">
      {/* Background */}
      <div className="bg-mesh" />
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      {/* ═══ LEFT PANEL: Sources ═══ */}
      <aside className="glass w-72 xl:w-80 flex-shrink-0 border-r border-white/[0.06] flex flex-col overflow-hidden">
        {/* Brand Header */}
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <I.Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-[15px] font-extrabold tracking-tight text-gradient">ExtractFlow</h1>
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-emerald-500/50">AI Document Intelligence</p>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 bg-white/[0.02] rounded-xl p-1">
            {[{ id: 'chat', icon: I.Message, label: 'Chat' }, { id: 'library', icon: I.Book, label: 'Library' }].map(v => (
              <button key={v.id} onClick={() => setView(v.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  view === v.id ? 'bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 text-emerald-400 shadow-sm' : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]'
                }`}>
                <v.icon className="w-3.5 h-3.5" /> {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* Drop Zone */}
          <div
            className={`drop-zone ${dragging ? 'dragging' : ''}`}
            onClick={() => document.getElementById('fileInput').click()}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
          >
            <I.Upload className="w-7 h-7 text-emerald-500/30 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-300">Drop files here</p>
            <p className="text-[10px] text-slate-600 mt-0.5">TXT, CSV, JSON, MD</p>
          </div>
          <input id="fileInput" type="file" multiple accept=".txt,.csv,.json,.md" className="hidden" onChange={e => handleFiles(e.target.files)} />

          {/* Demo Button */}
          <button onClick={() => handlePaste(DEMO, 'energy_report_2024.txt')}
            className="glass-btn glass-btn-secondary w-full text-[11px]">
            <I.FileText className="w-3 h-3" /> Load Demo Document
          </button>

          {/* Source Chips */}
          {docs.length > 0 && (
            <div className="animate-fade-in">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">Sources ({docs.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {docs.map(d => (
                  <div key={d.id} onClick={() => toggleDoc(d.id)}
                    className={`source-chip ${activeDocs.has(d.id) ? 'active' : ''}`}>
                    <span className="text-[6px]">{activeDocs.has(d.id) ? '●' : '○'}</span>
                    <span className="max-w-[5rem] truncate">{d.name}</span>
                    <span className="text-[8px] opacity-40">{d.chunks}</span>
                    <span onClick={e => { e.stopPropagation(); delDoc(d.id) }}
                      className="opacity-30 hover:opacity-100 hover:text-red-400 transition-opacity ml-0.5">×</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Paste Text */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">Paste Text</p>
            <textarea id="pasteInput"
              className="glass-input glass-input-mono w-full px-3 py-2 text-[11px] resize-none"
              rows={3} placeholder="Paste text content here..." />
            <button onClick={() => {
              const el = document.getElementById('pasteInput')
              if (el.value.trim()) { handlePaste(el.value, 'pasted.txt'); el.value = '' }
            }} className="glass-btn glass-btn-secondary w-full mt-1.5 text-[10px]">
              + Add Pasted Text
            </button>
          </div>

          <div className="divider" />

          {/* Injection Guard */}
          <div className="flex items-center gap-3 cursor-pointer py-1.5 px-1 rounded-lg hover:bg-white/[0.02] transition-colors"
            onClick={() => setGuard(!guard)}>
            <div className={`toggle ${guard ? 'active' : ''}`} />
            <I.Shield className={`w-4 h-4 transition-colors ${guard ? 'text-emerald-400' : 'text-slate-600'}`} />
            <div className="flex-1">
              <span className={`text-xs font-medium transition-colors ${guard ? 'text-slate-200' : 'text-slate-500'}`}>
                Injection Guard
              </span>
              <p className="text-[9px] text-slate-600">Prevents prompt injection attacks</p>
            </div>
          </div>

          <div className="divider" />

          {/* Action Buttons */}
          <button onClick={extract} disabled={!models.active || chunkCount === 0}
            className="glass-btn glass-btn-primary w-full py-2.5 text-xs shadow-lg shadow-emerald-500/20">
            <I.Zap className="w-3.5 h-3.5" /> Extract Structured Data
          </button>

          <button onClick={audio}
            className={`glass-btn w-full py-2 text-xs ${ttsActive ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'glass-btn-secondary'}`}>
            <I.Volume className="w-3.5 h-3.5" /> {ttsActive ? 'Stop Audio' : 'Audio Summary'}
          </button>
        </div>
      </aside>

      {/* ═══ CENTER PANEL: Chat or Library ═══ */}
      <main className="flex-1 flex flex-col overflow-hidden border-r border-white/[0.06]">
        {view === 'chat' ? (
          <ChatView chat={chat} onSend={send} modelLoaded={!!models.active} chunkCount={chunkCount} recording={recording} onMic={toggleMic} />
        ) : (
          <LibraryView
            library={filtered} search={search} setSearch={setSearch}
            familyFilter={familyFilter} setFamilyFilter={setFamilyFilter}
            onLoad={loadModel} onDownload={downloadModel} onDelete={deleteModel}
            activeModel={models.active} confirmDel={confirmDel} setConfirmDel={setConfirmDel}
            modelLoading={modelLoading}
          />
        )}
      </main>

      {/* ═══ RIGHT PANEL: Notes / Extractions ═══ */}
      <aside className="glass w-72 xl:w-80 flex-shrink-0 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <I.Layers className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <span className="text-sm font-bold">Extractions</span>
            {notes.length > 0 && (
              <span className="ml-auto badge badge-blue">{notes.length}</span>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notes.length === 0 ? (
            <div className="text-center py-16 opacity-40">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mx-auto mb-3">
                <I.FileText className="w-7 h-7 text-slate-600" />
              </div>
              <p className="text-xs font-semibold text-slate-500">No extractions yet</p>
              <p className="text-[10px] text-slate-600 mt-1">Upload docs and click Extract</p>
            </div>
          ) : (
            notes.map(n => (
              <div key={n.id} className="extraction-note animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <span className="badge badge-blue">Extraction</span>
                  <div className="flex gap-1">
                    <button onClick={() => navigator.clipboard?.writeText(n.text)}
                      className="p-1.5 rounded-lg hover:bg-white/5 text-slate-600 hover:text-slate-300 transition-colors">
                      <I.Copy className="w-3 h-3" />
                    </button>
                    <button onClick={() => { speechSynthesis?.cancel(); const u = new SpeechSynthesisUtterance(n.text.slice(0, 500)); u.lang = 'en-US'; speechSynthesis?.speak(u) }}
                      className="p-1.5 rounded-lg hover:bg-white/5 text-slate-600 hover:text-slate-300 transition-colors">
                      <I.Volume className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <pre className="text-[10px] font-mono text-slate-400 leading-relaxed whitespace-pre-wrap max-h-48 overflow-auto bg-black/20 rounded-lg p-2.5 border border-white/[0.03]">{n.text}</pre>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] text-slate-600 font-mono">{n.time}</span>
                  <span className="text-[9px] text-slate-600 font-mono">{n.chunks} chunks</span>
                </div>
              </div>
            ))
          )}

          {/* Chat Insights */}
          {chat.filter(m => m.role === 'ai').length > 0 && (
            <div className="mt-4 animate-fade-in">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">Recent Insights</p>
              {chat.filter(m => m.role === 'ai').slice(-2).reverse().map((m, i) => (
                <div key={i} className="extraction-note mb-2">
                  <span className="badge badge-green mb-2">AI Response</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   CHAT VIEW — Center panel
   ═══════════════════════════════════════════════════════════ */
function ChatView({ chat, onSend, modelLoaded, chunkCount, recording, onMic }) {
  const [input, setInput] = useState('')
  const [running, setRunning] = useState(false)
  const ref = useRef(null)

  useEffect(() => { ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' }) }, [chat])

  const send = async () => {
    if (!input.trim() || running) return
    setRunning(true)
    const m = input; setInput('')
    await onSend(m)
    setRunning(false)
  }

  return (
    <Fragment>
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-3 bg-white/[0.01]">
        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <I.Message className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <span className="text-sm font-bold">Chat</span>
        {modelLoaded && <span className="badge badge-green">AI Ready</span>}
        <span className="ml-auto text-[10px] text-slate-600 font-mono">{chunkCount} chunks loaded</span>
      </div>

      {/* Messages */}
      <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="flex-1" />
        {chat.map((m, i) => (
          <div key={i} className={`animate-fade-in ${
            m.role === 'user' ? 'msg-user px-4 py-3 text-[13px] leading-relaxed' :
            m.role === 'ai' ? 'msg-ai px-4 py-3 text-[13px] leading-relaxed' :
            'msg-sys px-3 py-2 text-center'
          }`}>
            {m.role === 'ai' && (
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-green">AI</span>
                {m.chunks && <span className="text-[9px] text-slate-600 font-mono">{m.chunks} chunks</span>}
              </div>
            )}
            {m.text}
          </div>
        ))}

        {running && (
          <div className="msg-ai px-4 py-3 flex items-center gap-2 animate-fade-in">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: `pulseDot 1.2s ease-in-out ${i * 0.15}s infinite` }} />
              ))}
            </div>
            <span className="text-[11px] text-slate-500">Thinking...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="flex gap-2">
          <button onClick={onMic}
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              recording ? 'bg-red-500/15 border border-red-500/30 text-red-400 recording' : 'bg-white/[0.03] border border-white/[0.06] text-slate-500 hover:text-slate-300 hover:border-white/[0.12]'
            }`}>
            <I.Mic className="w-4 h-4" />
          </button>
          <input
            className="flex-1 glass-input px-4 py-2.5 text-sm"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder={modelLoaded ? 'Ask about your documents...' : 'Load a model from Library first...'}
            disabled={running}
          />
          <button onClick={send} disabled={!input.trim() || running || !modelLoaded}
            className="glass-btn glass-btn-primary w-10 h-10 px-0 rounded-xl flex-shrink-0 disabled:opacity-30">
            <I.Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Fragment>
  )
}

/* ═══════════════════════════════════════════════════════════
   LIBRARY VIEW — Model management
   ═══════════════════════════════════════════════════════════ */
const FAMILIES = ['All', 'SmolLM', 'Qwen', 'Phi', 'Llama', 'Gemma', 'Mistral']

function LibraryView({ library, search, setSearch, familyFilter, setFamilyFilter, onLoad, onDownload, onDelete, activeModel, confirmDel, setConfirmDel, modelLoading }) {
  const installed = library.filter(m => m.installed)
  const available = library.filter(m => !m.installed)

  return (
    <Fragment>
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.06] bg-white/[0.01]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <I.Book className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <span className="text-sm font-bold">Model Library</span>
          {installed.length > 0 && <span className="badge badge-green">{installed.length} installed</span>}
        </div>

        {/* Search */}
        <div className="relative mb-2">
          <I.Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
          <input className="glass-input w-full pl-9 pr-3 py-2 text-xs"
            value={search} onChange={e => setSearch(e.target.value)} placeholder="Search models..." />
        </div>

        {/* Family Filter */}
        <div className="flex gap-1 flex-wrap">
          {FAMILIES.map(f => (
            <button key={f} onClick={() => setFamilyFilter(f)}
              className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide transition-all duration-200 ${
                familyFilter === f
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-600 border border-transparent hover:text-slate-400 hover:border-white/[0.06]'
              }`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Model List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {/* Installed Models */}
        {installed.length > 0 && (
          <div className="mb-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-500/60 mb-2 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Installed ({installed.length})
            </p>
            {installed.map(m => (
              <div key={m.id} className={`model-card mb-2 ${activeModel === m.id ? 'active' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border border-emerald-500/15 flex items-center justify-center flex-shrink-0">
                    <I.Cpu className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{m.name}</span>
                      {activeModel === m.id && <span className="badge badge-green">Active</span>}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {m.disk_mb}MB on disk · {m.ctx >= 1000 ? `${Math.round(m.ctx / 1000)}K` : m.ctx} context
                    </p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button onClick={() => onLoad(m.id)} disabled={activeModel === m.id || modelLoading}
                      className="glass-btn glass-btn-primary text-[10px] px-3 py-1.5">
                      {activeModel === m.id ? <Fragment><I.Check className="w-3 h-3" /> Active</Fragment> : <Fragment><I.Play className="w-3 h-3" /> Load</Fragment>}
                    </button>
                    {confirmDel === m.id ? (
                      <div className="flex gap-1">
                        <button onClick={() => { onDelete(m.id); setConfirmDel(null) }}
                          className="glass-btn glass-btn-danger text-[9px] px-2 py-1.5">Delete</button>
                        <button onClick={() => setConfirmDel(null)}
                          className="glass-btn glass-btn-secondary text-[9px] px-2 py-1.5">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmDel(m.id)}
                        className="glass-btn glass-btn-secondary px-2 py-1.5">
                        <I.Trash className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Available Models */}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">
            Available ({available.length})
          </p>
          {available.map(m => (
            <div key={m.id} className="model-card mb-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <I.Cpu className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{m.name}</span>
                    {m.tags?.includes('recommended') && <I.Star className="w-3 h-3 text-amber-400" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{m.desc}</p>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    <span className="badge badge-amber">~{m.size}MB</span>
                    <span className="badge badge-blue">{m.quant}</span>
                    <span className="badge badge-muted">{m.ctx >= 1000 ? `${Math.round(m.ctx / 1000)}K` : m.ctx} ctx</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {m.downloading ? (
                    <div className="text-center w-20">
                      <div className="progress-bar mb-1.5">
                        <div className="progress-bar-fill" style={{ width: `${m.progress || 0}%` }} />
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">{m.progress || 0}%</span>
                    </div>
                  ) : (
                    <button onClick={() => onDownload(m.id)}
                      className="glass-btn glass-btn-primary text-[10px] px-3 py-1.5">
                      <I.Download className="w-3 h-3" /> Install
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
}
