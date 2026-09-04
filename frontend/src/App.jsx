import { useState, useEffect, useCallback, useRef, Fragment } from 'react'
const API = '/api'

/* ═══ SVG Icon Library ═══ */
const I = {
  Search:    p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Upload:    p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Download:  p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Check:     p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Play:      p => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Pause:     p => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  Trash:     p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  X:         p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Send:      p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Shield:    p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4" strokeWidth="2"/></svg>,
  Volume:    p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>,
  Copy:      p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Cpu:       p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  Sparkles:  p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9.5 8.5 3 12l6.5 3.5L12 22l2.5-6.5L21 12l-6.5-3.5z"/></svg>,
  Message:   p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  FileText:  p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Zap:        p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Star:       p => <svg {...p} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Mic:        p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>,
  Layers:     p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Book:       p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Presentation: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  BarChart:    p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Headphones:  p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
  Globe:       p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  ExternalLink: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  Grid:        p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
}

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

const TABS = [
  { id: 'chat', label: 'Chat', icon: I.Message },
  { id: 'slides', label: 'Slides', icon: I.Presentation },
  { id: 'infographic', label: 'Infographic', icon: I.BarChart },
  { id: 'podcast', label: 'Podcast', icon: I.Headphones },
  { id: 'library', label: 'Models', icon: I.Cpu },
]

export default function App() {
  const [docs, setDocs] = useState([])
  const [activeDocs, setActiveDocs] = useState(new Set())
  const [library, setLibrary] = useState([])
  const [models, setModels] = useState({ installed: [], available: [], active: null, total: 0 })
  const [chat, setChat] = useState([{ role: 'sys', text: 'Welcome to ExtractFlow AI — your local NotebookLM killer. Install a model, upload documents, then chat, generate slides, infographics, or podcasts. Everything runs 100% on your machine.' }])
  const [notes, setNotes] = useState([])
  const [guard, setGuard] = useState(true)
  const [tab, setTab] = useState('chat')
  const [ttsActive, setTtsActive] = useState(false)
  const [modelLoading, setModelLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [familyFilter, setFamilyFilter] = useState('All')
  const [confirmDel, setConfirmDel] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [recording, setRecording] = useState(false)
  const [slides, setSlides] = useState(null)
  const [infographic, setInfographic] = useState(null)
  const [podcast, setPodcast] = useState(null)
  const [generating, setGenerating] = useState(false)
  const recognitionRef = useRef(null)

  const refresh = useCallback(async () => {
    try {
      const [m, d, l] = await Promise.all([fetch(`${API}/models`), fetch(`${API}/documents`), fetch(`${API}/library`)])
      if (m.ok) { const data = await m.json(); setModels(data); setLibrary([...(data.installed || []), ...data.available]) }
      if (d.ok) setDocs(await d.json())
    } catch {}
  }, [])

  useEffect(() => {
    let ws
    try { ws = new WebSocket(`ws://${window.location.host}/ws`); ws.onmessage = () => refresh() } catch {}
    refresh()
    return () => ws?.close()
  }, [])

  useEffect(() => { if (tab === 'library') { const t = setInterval(refresh, 2000); return () => clearInterval(t) } }, [tab, refresh])

  const toggleDoc = useCallback(id => setActiveDocs(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n }), [])
  const delDoc = useCallback(async id => { await fetch(`${API}/documents/${id}`, { method: 'DELETE' }); setDocs(p => p.filter(d => d.id !== id)); setActiveDocs(p => { const n = new Set(p); n.delete(id); return n }) }, [])

  const handleFiles = useCallback(async files => {
    for (const f of files) { const fd = new FormData(); fd.append('file', f); const r = await fetch(`${API}/upload`, { method: 'POST', body: fd }); if (r.ok) { const d = await r.json(); setDocs(p => [...p, d]); setActiveDocs(p => new Set([...p, d.id])) } }
  }, [])

  const handlePaste = useCallback(async (text, name) => {
    const r = await fetch(`${API}/paste`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, name }) })
    if (r.ok) { const d = await r.json(); setDocs(p => [...p, d]); setActiveDocs(p => new Set([...p, d.id])) }
  }, [])

  const loadModel = useCallback(async mid => {
    setModelLoading(true)
    try { const r = await fetch(`${API}/models/${mid}/load`, { method: 'POST' }); if (!r.ok) throw new Error((await r.json()).detail); await refresh(); setChat(p => [...p, { role: 'sys', text: `Model loaded: ${mid}` }]) }
    catch (e) { setChat(p => [...p, { role: 'sys', text: `Load failed: ${e.message}` }]) }
    setModelLoading(false)
  }, [refresh])

  const downloadModel = useCallback(async mid => { try { setChat(p => [...p, { role: 'sys', text: `Downloading ${mid}...` }]); await fetch(`${API}/models/${mid}/download`, { method: 'POST' }) } catch (e) { setChat(p => [...p, { role: 'sys', text: `Error: ${e.message}` }]) } }, [])
  const deleteModel = useCallback(async mid => { await fetch(`${API}/models/${mid}`, { method: 'DELETE' }); if (models.active === mid) setChat(p => [...p, { role: 'sys', text: 'Model unloaded.' }]); await refresh() }, [models.active, refresh])

  const send = useCallback(async text => {
    if (!text.trim()) return; setChat(p => [...p, { role: 'user', text }])
    if (!models.active) { setChat(p => [...p, { role: 'sys', text: 'Load a model first from the Models tab.' }]); return }
    try { const r = await fetch(`${API}/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, mode: 'chat', guard, doc_ids: [...activeDocs] }) }); const d = await r.json(); setChat(p => [...p, { role: 'ai', text: d.response, chunks: d.chunks }]) }
    catch (e) { setChat(p => [...p, { role: 'sys', text: `Error: ${e.message}` }]) }
  }, [models.active, activeDocs, guard])

  const extract = useCallback(async () => {
    if (!models.active) { setChat(p => [...p, { role: 'sys', text: 'Load a model first.' }]); return }
    try { const r = await fetch(`${API}/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Extract all key data as structured JSON', mode: 'extract', guard, doc_ids: [...activeDocs] }) }); const d = await r.json(); setNotes(p => [{ id: Date.now(), text: d.response, chunks: d.chunks, time: new Date().toLocaleTimeString() }, ...p]); setChat(p => [...p, { role: 'sys', text: `Extraction saved (${d.chunks} chunks)` }]) }
    catch (e) { setChat(p => [...p, { role: 'sys', text: `Error: ${e.message}` }]) }
  }, [models.active, activeDocs, guard])

  const generateSlides = useCallback(async () => {
    setGenerating(true); const docId = [...activeDocs][0] || (docs[0]?.id)
    try { const r = await fetch(`${API}/generate/slides`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: 'Document Summary', doc_id: docId }) }); const d = await r.json(); setSlides(d); setChat(p => [...p, { role: 'sys', text: `Generated ${d.count} slides` }]) }
    catch (e) { setChat(p => [...p, { role: 'sys', text: `Error: ${e.message}` }]) }
    setGenerating(false)
  }, [activeDocs, docs])

  const generateInfographic = useCallback(async () => {
    setGenerating(true); const docId = [...activeDocs][0] || (docs[0]?.id)
    try { const r = await fetch(`${API}/generate/infographic`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: 'Document Overview', doc_id: docId }) }); const d = await r.json(); setInfographic(d); setChat(p => [...p, { role: 'sys', text: 'Infographic generated' }]) }
    catch (e) { setChat(p => [...p, { role: 'sys', text: `Error: ${e.message}` }]) }
    setGenerating(false)
  }, [activeDocs, docs])

  const generatePodcast = useCallback(async () => {
    setGenerating(true); const docId = [...activeDocs][0] || (docs[0]?.id)
    try { const r = await fetch(`${API}/generate/podcast`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: 'Document Summary', doc_id: docId }) }); const d = await r.json(); setPodcast(d); setChat(p => [...p, { role: 'sys', text: `Generated ${d.count}-segment podcast script` }]) }
    catch (e) { setChat(p => [...p, { role: 'sys', text: `Error: ${e.message}` }]) }
    setGenerating(false)
  }, [activeDocs, docs])

  const audio = useCallback(() => {
    if (ttsActive) { speechSynthesis?.cancel(); setTtsActive(false); return }
    let s = ''; if (podcast) s = podcast.script.map(l => `${l.speaker === 'host' ? 'Host' : 'Co-host'}: ${l.text}`).join('. ')
    else if (notes.length) s = notes[0].text.slice(0, 800)
    else { const ai = chat.filter(m => m.role === 'ai'); if (ai.length) s = ai[ai.length - 1].text.slice(0, 800) }
    if (!s) s = 'No content to read yet.'
    setTtsActive(true); const u = new SpeechSynthesisUtterance(s); u.lang = 'en-US'; u.onend = () => setTtsActive(false); speechSynthesis?.speak(u)
  }, [podcast, notes, chat, ttsActive])

  const toggleMic = useCallback(() => {
    if (recording) { recognitionRef.current?.stop(); setRecording(false); return }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { setChat(p => [...p, { role: 'sys', text: 'Speech recognition not supported.' }]); return }
    const r = new SR(); r.lang = 'en-US'; r.interimResults = false
    r.onresult = e => { const t = e.results[0][0].transcript; setRecording(false); send(t) }
    r.onerror = () => setRecording(false); r.onend = () => setRecording(false)
    recognitionRef.current = r; r.start(); setRecording(true)
  }, [send])

  const filtered = library.filter(m => {
    if (familyFilter !== 'All' && m.family !== familyFilter) return false
    if (search) { const q = search.toLowerCase(); return m.name.toLowerCase().includes(q) || m.desc?.toLowerCase().includes(q) }
    return true
  })
  const chunkCount = docs.filter(d => activeDocs.has(d.id)).reduce((a, d) => a + d.chunks, 0)

  return (
    <div className="h-screen flex relative z-10">
      <div className="bg-mesh" />
      <div className="bg-orb bg-orb-1" /><div className="bg-orb bg-orb-2" /><div className="bg-orb bg-orb-3" />

      {/* ═══ LEFT PANEL ═══ */}
      <aside className="glass w-72 xl:w-80 flex-shrink-0 border-r border-white/[0.06] flex flex-col overflow-hidden">
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
          {/* Model status */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <I.Cpu className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[10px] text-slate-400 font-mono">{models.active ? models.active : 'No model loaded'}</span>
            {models.active && <span className="ml-auto badge badge-green text-[7px]">Active</span>}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* Drop Zone */}
          <div className={`drop-zone ${dragging ? 'dragging' : ''}`}
            onClick={() => document.getElementById('fileInput').click()}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}>
            <I.Upload className="w-7 h-7 text-emerald-500/30 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-300">Drop files here</p>
            <p className="text-[10px] text-slate-600 mt-0.5">TXT, CSV, JSON, MD</p>
          </div>
          <input id="fileInput" type="file" multiple accept=".txt,.csv,.json,.md" className="hidden" onChange={e => handleFiles(e.target.files)} />

          <button onClick={() => handlePaste(DEMO, 'energy_report_2024.txt')} className="glass-btn glass-btn-secondary w-full text-[11px]">
            <I.FileText className="w-3 h-3" /> Load Demo Document
          </button>

          {docs.length > 0 && (
            <div className="animate-fade-in">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">Sources ({docs.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {docs.map(d => (
                  <div key={d.id} onClick={() => toggleDoc(d.id)} className={`source-chip ${activeDocs.has(d.id) ? 'active' : ''}`}>
                    <span className="text-[6px]">{activeDocs.has(d.id) ? '●' : '○'}</span>
                    <span className="max-w-[5rem] truncate">{d.name}</span>
                    <span onClick={e => { e.stopPropagation(); delDoc(d.id) }} className="opacity-30 hover:opacity-100 hover:text-red-400 transition-opacity">×</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">Paste Text</p>
            <textarea id="pasteInput" className="glass-input glass-input-mono w-full px-3 py-2 text-[11px] resize-none" rows={3} placeholder="Paste text content here..." />
            <button onClick={() => { const el = document.getElementById('pasteInput'); if (el.value.trim()) { handlePaste(el.value, 'pasted.txt'); el.value = '' } }} className="glass-btn glass-btn-secondary w-full mt-1.5 text-[10px]">+ Add Pasted Text</button>
          </div>

          <div className="divider" />

          {/* Injection Guard */}
          <div className="flex items-center gap-3 cursor-pointer py-1.5 px-1 rounded-lg hover:bg-white/[0.02] transition-colors" onClick={() => setGuard(!guard)}>
            <div className={`toggle ${guard ? 'active' : ''}`} />
            <I.Shield className={`w-4 h-4 transition-colors ${guard ? 'text-emerald-400' : 'text-slate-600'}`} />
            <div className="flex-1">
              <span className={`text-xs font-medium ${guard ? 'text-slate-200' : 'text-slate-500'}`}>Injection Guard</span>
              <p className="text-[9px] text-slate-600">Prevents prompt injection</p>
            </div>
          </div>

          <div className="divider" />

          {/* Quick Generate Buttons */}
          <button onClick={extract} disabled={!models.active || chunkCount === 0} className="glass-btn glass-btn-primary w-full py-2.5 text-xs">
            <I.Zap className="w-3.5 h-3.5" /> Extract Data (JSON)
          </button>
          <button onClick={generateSlides} disabled={!docs.length || generating} className="glass-btn glass-btn-secondary w-full text-[11px]">
            <I.Presentation className="w-3 h-3" /> Generate Slides
          </button>
          <button onClick={generateInfographic} disabled={!docs.length || generating} className="glass-btn glass-btn-secondary w-full text-[11px]">
            <I.BarChart className="w-3 h-3" /> Generate Infographic
          </button>
          <button onClick={generatePodcast} disabled={!docs.length || generating} className="glass-btn glass-btn-secondary w-full text-[11px]">
            <I.Headphones className="w-3 h-3" /> Generate Podcast
          </button>
          <button onClick={audio} className={`glass-btn w-full text-[11px] ${ttsActive ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'glass-btn-secondary'}`}>
            <I.Volume className="w-3 h-3" /> {ttsActive ? 'Stop Audio' : 'Listen Aloud'}
          </button>
        </div>
      </aside>

      {/* ═══ CENTER PANEL ═══ */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Tab Bar */}
        <div className="flex border-b border-white/[0.06] bg-white/[0.01] px-2">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold transition-all border-b-2 ${
                tab === t.id ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}>
              <t.icon className="w-3.5 h-3.5" /> {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {tab === 'chat' && <ChatView chat={chat} onSend={send} modelLoaded={!!models.active} chunkCount={chunkCount} recording={recording} onMic={toggleMic} />}
          {tab === 'slides' && <SlidesView slides={slides} generating={generating} onExport={slides ? () => window.open(`${API}/export/slides/${slides.id}`, '_blank') : null} />}
          {tab === 'infographic' && <InfographicView data={infographic} generating={generating} onExport={infographic ? () => window.open(`${API}/export/infographic/${infographic.id}`, '_blank') : null} />}
          {tab === 'podcast' && <PodcastView data={podcast} generating={generating} ttsActive={ttsActive} onPlay={audio} />}
          {tab === 'library' && <LibraryView library={filtered} search={search} setSearch={setSearch} familyFilter={familyFilter} setFamilyFilter={setFamilyFilter} onLoad={loadModel} onDownload={downloadModel} onDelete={deleteModel} activeModel={models.active} confirmDel={confirmDel} setConfirmDel={setConfirmDel} modelLoading={modelLoading} totalCount={models.total} />}
        </div>
      </main>

      {/* ═══ RIGHT PANEL: Notes ═══ */}
      <aside className="glass w-72 xl:w-80 flex-shrink-0 border-l border-white/[0.06] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <I.Layers className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <span className="text-sm font-bold">Extractions</span>
            {notes.length > 0 && <span className="ml-auto badge badge-blue">{notes.length}</span>}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notes.length === 0 ? (
            <div className="text-center py-16 opacity-40">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mx-auto mb-3">
                <I.FileText className="w-7 h-7 text-slate-600" />
              </div>
              <p className="text-xs font-semibold text-slate-500">No extractions yet</p>
              <p className="text-[10px] text-slate-600 mt-1">Upload docs + click Extract</p>
            </div>
          ) : notes.map(n => (
            <div key={n.id} className="extraction-note animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="badge badge-blue">Extraction</span>
                <div className="flex gap-1">
                  <button onClick={() => navigator.clipboard?.writeText(n.text)} className="p-1.5 rounded-lg hover:bg-white/5 text-slate-600 hover:text-slate-300 transition-colors"><I.Copy className="w-3 h-3" /></button>
                  <button onClick={() => { speechSynthesis?.cancel(); const u = new SpeechSynthesisUtterance(n.text.slice(0, 500)); u.lang = 'en-US'; speechSynthesis?.speak(u) }} className="p-1.5 rounded-lg hover:bg-white/5 text-slate-600 hover:text-slate-300 transition-colors"><I.Volume className="w-3 h-3" /></button>
                </div>
              </div>
              <pre className="text-[10px] font-mono text-slate-400 leading-relaxed whitespace-pre-wrap max-h-48 overflow-auto bg-black/20 rounded-lg p-2.5 border border-white/[0.03]">{n.text}</pre>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[9px] text-slate-600 font-mono">{n.time}</span>
                <span className="text-[9px] text-slate-600 font-mono">{n.chunks} chunks</span>
              </div>
            </div>
          ))}
          {chat.filter(m => m.role === 'ai').length > 0 && (
            <div className="mt-4 animate-fade-in">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">Recent Insights</p>
              {chat.filter(m => m.role === 'ai').slice(-2).reverse().map((m, i) => (
                <div key={i} className="extraction-note mb-2">
                  <span className="badge badge-green mb-2">AI</span>
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

/* ═══ CHAT VIEW ═══ */
function ChatView({ chat, onSend, modelLoaded, chunkCount, recording, onMic }) {
  const [input, setInput] = useState(''); const [running, setRunning] = useState(false); const ref = useRef(null)
  useEffect(() => { ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' }) }, [chat])
  const send = async () => { if (!input.trim() || running) return; setRunning(true); const m = input; setInput(''); await onSend(m); setRunning(false) }
  return (
    <Fragment>
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-3 bg-white/[0.01]">
        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><I.Message className="w-3.5 h-3.5 text-emerald-400" /></div>
        <span className="text-sm font-bold">Chat</span>
        {modelLoaded && <span className="badge badge-green">AI Ready</span>}
        <span className="ml-auto text-[10px] text-slate-600 font-mono">{chunkCount} chunks</span>
      </div>
      <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="flex-1" />
        {chat.map((m, i) => (
          <div key={i} className={`animate-fade-in ${m.role === 'user' ? 'msg-user px-4 py-3 text-[13px] leading-relaxed' : m.role === 'ai' ? 'msg-ai px-4 py-3 text-[13px] leading-relaxed' : 'msg-sys px-3 py-2 text-center'}`}>
            {m.role === 'ai' && <div className="flex items-center gap-2 mb-2"><span className="badge badge-green">AI</span>{m.chunks && <span className="text-[9px] text-slate-600 font-mono">{m.chunks} chunks</span>}</div>}
            {m.text}
          </div>
        ))}
        {running && <div className="msg-ai px-4 py-3 flex items-center gap-2 animate-fade-in"><div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: `pulseDot 1.2s ease-in-out ${i*0.15}s infinite` }} />)}</div><span className="text-[11px] text-slate-500">Thinking...</span></div>}
      </div>
      <div className="p-3 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="flex gap-2">
          <button onClick={onMic} className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${recording ? 'bg-red-500/15 border border-red-500/30 text-red-400 recording' : 'bg-white/[0.03] border border-white/[0.06] text-slate-500 hover:text-slate-300'}`}>
            <I.Mic className="w-4 h-4" />
          </button>
          <input className="flex-1 glass-input px-4 py-2.5 text-sm" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }} placeholder={modelLoaded ? 'Ask about your documents...' : 'Load a model first...'} disabled={running} />
          <button onClick={send} disabled={!input.trim() || running || !modelLoaded} className="glass-btn glass-btn-primary w-10 h-10 px-0 rounded-xl flex-shrink-0"><I.Send className="w-4 h-4" /></button>
        </div>
      </div>
    </Fragment>
  )
}

/* ═══ SLIDES VIEW ═══ */
function SlidesView({ slides, generating, onExport }) {
  const [current, setCurrent] = useState(0)
  useEffect(() => { setCurrent(0) }, [slides])
  if (generating) return <EmptyState icon={I.Presentation} title="Generating slides..." subtitle="AI is creating your presentation" loading />
  if (!slides || !slides.slides) return <EmptyState icon={I.Presentation} title="Generate Slide Decks" subtitle="Upload documents then click Generate Slides to create a presentation from your content" action="Slides are generated from your document's key topics, sections, and findings." />
  const s = slides.slides[current]
  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="badge badge-green">{current + 1} / {slides.slides.length}</span>
        <div className="flex gap-2">
          <button onClick={onExport} className="glass-btn glass-btn-secondary text-[10px]"><I.ExternalLink className="w-3 h-3" /> Export HTML</button>
        </div>
      </div>
      <div className="flex-1 rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(12,18,35,0.8)', borderTop: `3px solid ${s.accent || '#10b981'}` }}>
        <div className="h-full flex flex-col justify-center p-8 md:p-12">
          {s.type === 'title' && <Fragment><h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ background: `linear-gradient(135deg, ${s.accent}, #fff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.title}</h1><p className="text-xl text-slate-400">{s.subtitle}</p></Fragment>}
          {s.type === 'overview' && <Fragment><h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: s.accent }}>{s.title}</h2><div className="grid grid-cols-2 gap-3">{(s.items || []).map((item, i) => <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.accent }} /><span className="text-sm text-slate-300">{item}</span></div>)}</div></Fragment>}
          {s.type === 'content' && <Fragment><h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: s.accent }}>{s.title}</h2><ul className="space-y-3">{(s.bullets || []).map((b, i) => <li key={i} className="flex items-start gap-3 text-base text-slate-300 leading-relaxed"><span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.accent }} />{b}</li>)}</ul></Fragment>}
          {s.type === 'summary' && <Fragment><h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: s.accent }}>{s.title}</h2><ul className="space-y-3">{(s.items || []).map((item, i) => <li key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed"><span className="text-emerald-400 font-bold">✓</span>{item}</li>)}</ul></Fragment>}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-4">
        <button onClick={() => setCurrent(p => (p - 1 + slides.slides.length) % slides.slides.length)} className="glass-btn glass-btn-secondary text-xs px-4">← Prev</button>
        <div className="flex gap-1.5">{slides.slides.map((_, i) => <div key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full cursor-pointer transition-all ${i === current ? 'bg-emerald-400 scale-125' : 'bg-white/10 hover:bg-white/20'}`} />)}</div>
        <button onClick={() => setCurrent(p => (p + 1) % slides.slides.length)} className="glass-btn glass-btn-secondary text-xs px-4">Next →</button>
      </div>
    </div>
  )
}

/* ═══ INFOGRAPHIC VIEW ═══ */
function InfographicView({ data, generating, onExport }) {
  if (generating) return <EmptyState icon={I.BarChart} title="Generating infographic..." subtitle="Building data visualization" loading />
  if (!data || !data.data) return <EmptyState icon={I.BarChart} title="Generate Infographics" subtitle="Upload documents then click Generate Infographic to create visual data summaries" />
  const d = data.data
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-gradient">{d.title}</h2>
        <button onClick={onExport} className="glass-btn glass-btn-secondary text-[10px]"><I.ExternalLink className="w-3 h-3" /> Export HTML</button>
      </div>
      <p className="text-xs text-slate-500 mb-6">{d.wordCount} words · {d.sentenceCount} sentences</p>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {d.stats.map((s, i) => <div key={i} className="glass-card p-4 text-center"><div className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</div><div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1 font-mono">{s.label}</div></div>)}
      </div>
      <div className="space-y-3 mb-6">
        {d.sections.map((s, i) => <div key={i} className="glass-card p-4" style={{ borderLeft: `3px solid ${s.color}` }}><h3 className="text-sm font-bold mb-1" style={{ color: s.color }}>{s.heading}</h3><p className="text-xs text-slate-400 leading-relaxed">{s.body}</p></div>)}
      </div>
      {d.keyNumbers.length > 0 && (
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">Key Numbers</p>
          <div className="flex flex-wrap gap-2">{d.keyNumbers.map((n, i) => <span key={i} className="badge badge-muted text-[10px]">{n}</span>)}</div>
        </div>
      )}
    </div>
  )
}

/* ═══ PODCAST VIEW ═══ */
function PodcastView({ data, generating, ttsActive, onPlay }) {
  const [playingIdx, setPlayingIdx] = useState(-1)
  useEffect(() => { setPlayingIdx(-1) }, [data])
  const playFrom = useCallback((idx) => {
    if (ttsActive) { speechSynthesis?.cancel(); setPlayingIdx(-1); return }
    if (!data?.script) return
    const lines = data.script.slice(idx)
    const fullText = lines.map(l => `${l.speaker === 'host' ? 'Host' : 'Co-host'}: ${l.text}`).join('. ')
    const u = new SpeechSynthesisUtterance(fullText); u.lang = 'en-US'
    u.onend = () => setPlayingIdx(-1)
    setPlayingIdx(idx)
    speechSynthesis?.speak(u)
  }, [data, ttsActive])

  if (generating) return <EmptyState icon={I.Headphones} title="Generating podcast..." subtitle="Writing conversation script" loading />
  if (!data || !data.script) return <EmptyState icon={I.Headphones} title="Generate Podcast" subtitle="Upload documents then click Generate Podcast to create a two-speaker audio summary" />

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border border-purple-500/20 flex items-center justify-center">
            <I.Headphones className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Podcast Script</h2>
            <p className="text-[10px] text-slate-500">{data.count} segments · Two speakers</p>
          </div>
        </div>
        <button onClick={() => playFrom(0)} className={`glass-btn text-xs ${ttsActive ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'glass-btn-primary'}`}>
          {ttsActive ? <Fragment><I.Pause className="w-3 h-3" /> Stop</Fragment> : <Fragment><I.Play className="w-3 h-3" /> Play All</Fragment>}
        </button>
      </div>
      <div className="space-y-3">
        {data.script.map((line, i) => (
          <div key={i} onClick={() => playFrom(i)} className={`glass-card p-4 cursor-pointer transition-all hover:border-white/[0.12] ${playingIdx === i ? 'border-emerald-500/30' : ''}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${line.speaker === 'host' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'}`}>
                {line.speaker === 'host' ? 'H' : 'C'}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{line.speaker === 'host' ? 'Host' : 'Co-host'}</span>
              {playingIdx === i && <span className="badge badge-green ml-2">Playing</span>}
            </div>
            <p className="text-[13px] text-slate-300 leading-relaxed">{line.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══ EMPTY STATE ═══ */
function EmptyState({ icon: Icon, title, subtitle, action, loading }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 ${loading ? 'bg-emerald-500/10 border border-emerald-500/20 animate-pulse' : 'bg-white/[0.02] border border-white/[0.06]'}`}>
        <Icon className={`w-10 h-10 ${loading ? 'text-emerald-400 animate-spin' : 'text-slate-600'}`} />
      </div>
      <h3 className="text-lg font-bold text-slate-300 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-xs leading-relaxed">{subtitle}</p>
      {action && <p className="text-[10px] text-slate-600 mt-3 max-w-sm">{action}</p>}
    </div>
  )
}

/* ═══ LIBRARY VIEW ═══ */
const FAMILIES_LIST = ['All', 'SmolLM', 'Qwen', 'Phi', 'Llama', 'Gemma', 'Mistral', 'DeepSeek', 'Yi', 'StableLM', 'OpenHermes', 'SOLAR', 'Command R', 'CodeLlama', 'WizardLM', 'Starling', 'MiniCPM', 'InternLM', 'Nemotron']

function LibraryView({ library, search, setSearch, familyFilter, setFamilyFilter, onLoad, onDownload, onDelete, activeModel, confirmDel, setConfirmDel, modelLoading, totalCount }) {
  const installed = library.filter(m => m.installed)
  const available = library.filter(m => !m.installed)
  return (
    <Fragment>
      <div className="px-4 py-3 border-b border-white/[0.06] bg-white/[0.01]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><I.Book className="w-3.5 h-3.5 text-amber-400" /></div>
          <span className="text-sm font-bold">Model Library</span>
          <span className="badge badge-amber">{totalCount || library.length} models</span>
          {installed.length > 0 && <span className="badge badge-green">{installed.length} installed</span>}
        </div>
        <div className="relative mb-2">
          <I.Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
          <input className="glass-input w-full pl-9 pr-3 py-2 text-xs" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search models..." />
        </div>
        <div className="flex gap-1 flex-wrap">
          {FAMILIES_LIST.map(f => (
            <button key={f} onClick={() => setFamilyFilter(f)} className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wide transition-all ${familyFilter === f ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-600 border border-transparent hover:text-slate-400'}`}>{f}</button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {installed.length > 0 && (
          <div className="mb-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-500/60 mb-2 font-mono flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Installed ({installed.length})</p>
            {installed.map(m => (
              <div key={m.id} className={`model-card mb-2 ${activeModel === m.id ? 'active' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border border-emerald-500/15 flex items-center justify-center flex-shrink-0"><I.Cpu className="w-5 h-5 text-emerald-400" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2"><span className="text-sm font-bold">{m.name}</span>{activeModel === m.id && <span className="badge badge-green">Active</span>}</div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{m.disk_mb}MB · {m.ctx >= 1000 ? `${Math.round(m.ctx / 1000)}K` : m.ctx} ctx · {m.params}</p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button onClick={() => onLoad(m.id)} disabled={activeModel === m.id || modelLoading} className="glass-btn glass-btn-primary text-[10px] px-3 py-1.5">
                      {activeModel === m.id ? <Fragment><I.Check className="w-3 h-3" /> Active</Fragment> : <Fragment><I.Play className="w-3 h-3" /> Load</Fragment>}
                    </button>
                    {confirmDel === m.id ? (
                      <div className="flex gap-1"><button onClick={() => { onDelete(m.id); setConfirmDel(null) }} className="glass-btn glass-btn-danger text-[9px] px-2 py-1.5">Yes</button><button onClick={() => setConfirmDel(null)} className="glass-btn glass-btn-secondary text-[9px] px-2 py-1.5">No</button></div>
                    ) : <button onClick={() => setConfirmDel(m.id)} className="glass-btn glass-btn-secondary px-2 py-1.5"><I.Trash className="w-3 h-3" /></button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">Available ({available.length})</p>
          {available.map(m => (
            <div key={m.id} className="model-card mb-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0"><I.Cpu className="w-5 h-5 text-slate-600" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{m.name}</span>
                    {m.tags?.includes('recommended') && <I.Star className="w-3 h-3 text-amber-400" />}
                    {m.tags?.includes('new') && <span className="badge badge-green text-[7px]">New</span>}
                  </div>
                  <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{m.desc}</p>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    <span className="badge badge-amber text-[7px]">~{m.size >= 1000 ? `${(m.size/1000).toFixed(1)}GB` : `${m.size}MB`}</span>
                    <span className="badge badge-blue text-[7px]">{m.quant}</span>
                    <span className="badge badge-muted text-[7px]">{m.ctx >= 1000 ? `${Math.round(m.ctx / 1000)}K` : m.ctx} ctx</span>
                    <span className="badge badge-muted text-[7px]">{m.params}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {m.downloading ? (
                    <div className="text-center w-20"><div className="progress-bar mb-1"><div className="progress-bar-fill" style={{ width: `${m.progress || 0}%` }} /></div><span className="text-[10px] text-emerald-400 font-mono font-bold">{m.progress || 0}%</span></div>
                  ) : (
                    <button onClick={() => onDownload(m.id)} className="glass-btn glass-btn-primary text-[10px] px-3 py-1.5"><I.Download className="w-3 h-3" /> Install</button>
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
