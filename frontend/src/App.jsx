/**
 * ExtractFlow AI — Frontend
 * Copyright (c) 2025 github.com/al13n-x-v0x | Discord: al13n._.invisible
 * All rights reserved. Unauthorized reproduction is prohibited.
 */
import { useState, useEffect, useCallback, useRef, Fragment, useMemo } from 'react'
const API = '/api'

/* ═══ Anti-Copy Protection ═══ */
if (typeof window !== 'undefined') {
  // Disable right-click
  document.addEventListener('contextmenu', e => e.preventDefault())
  // Disable Ctrl+C, Ctrl+X, Ctrl+A (selective)
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'c' && !window.getSelection()?.toString()) e.preventDefault()
    if (e.ctrlKey && e.key === 'x') e.preventDefault()
  })
}

/* ═══ CUSTOM EXTRACTFLOW LOGO ═══ */
const ExtractFlowLogo = ({ size = 40, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outer hexagon frame */}
    <path d="M32 2L58 17V47L32 62L6 47V17L32 2Z" fill="url(#logoGrad)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5"/>
    {/* Inner hexagon */}
    <path d="M32 10L50 21V43L32 54L14 43V21L32 10Z" fill="rgba(6,8,15,0.8)" stroke="rgba(16,185,129,0.2)" strokeWidth="1"/>
    {/* Lightning bolt - the "Extract" */}
    <path d="M36 18L24 34H32L28 46L40 30H32L36 18Z" fill="url(#boltGrad)" stroke="rgba(16,185,129,0.6)" strokeWidth="0.5"/>
    {/* Data flow dots */}
    <circle cx="20" cy="28" r="2" fill="#10b981" opacity="0.6"/>
    <circle cx="44" cy="36" r="2" fill="#6366f1" opacity="0.6"/>
    <circle cx="22" cy="42" r="1.5" fill="#10b981" opacity="0.4"/>
    <circle cx="42" cy="24" r="1.5" fill="#6366f1" opacity="0.4"/>
    {/* Connection lines */}
    <line x1="20" y1="28" x2="32" y2="32" stroke="#10b981" strokeWidth="0.5" opacity="0.3"/>
    <line x1="44" y1="36" x2="32" y2="32" stroke="#6366f1" strokeWidth="0.5" opacity="0.3"/>
    <defs>
      <linearGradient id="logoGrad" x1="6" y1="2" x2="58" y2="62">
        <stop offset="0%" stopColor="rgba(16,185,129,0.15)"/>
        <stop offset="100%" stopColor="rgba(99,102,241,0.1)"/>
      </linearGradient>
      <linearGradient id="boltGrad" x1="24" y1="18" x2="40" y2="46">
        <stop offset="0%" stopColor="#10b981"/>
        <stop offset="100%" stopColor="#34d399"/>
      </linearGradient>
    </defs>
  </svg>
)

/* ═══ SVG ICONS ═══ */
const I = {
  Search: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Upload: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Download: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Check: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Play: p => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Pause: p => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  Trash: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  X: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Send: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Shield: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4" strokeWidth="2"/></svg>,
  Volume: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>,
  Copy: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Cpu: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  Sparkles: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2L9.5 8.5 3 12l6.5 3.5L12 22l2.5-6.5L21 12l-6.5-3.5z"/></svg>,
  Message: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  FileText: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Zap: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Star: p => <svg {...p} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Mic: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>,
  Layers: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Book: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Presentation: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  BarChart: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Headphones: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
  Globe: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  ExternalLink: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  HelpCircle: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Layers3: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>,
  Cloud: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  Users: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Database: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  Brain: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2a7 7 0 0 0-7 7c0 3 2 5 4 7l3 4 3-4c2-2 4-4 4-7a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2"/></svg>,
  Wifi: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  WifiOff: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  Lock: p => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
}

const DEMO = `Global Renewable Energy Report 2024\n\nExecutive Summary:\nRenewable energy sources including solar photovoltaic and onshore wind accounted for 30% of global electricity generation in 2023. Total investment in clean energy reached $1.8 trillion.\n\nSolar Energy:\nSolar PV capacity reached 1,419 GW globally, with China leading at 425 GW. LCOE declined 89% since 2010.\n\nWind Energy:\nWind contributed 7.8% of global electricity, with 906 GW installed. Offshore wind grew 25% to 75 GW.\n\nBattery Storage:\nBattery storage reached 45 GW / 99 GWh. Lithium-ion costs fell 14% to $139/kWh.\n\nInvestment:\n$1.8 trillion invested in clean energy. Solar ($82B), wind ($64B), batteries ($150B).`

/* ═══ MODES ═══ */
const MODES = {
  normal: { label: 'Normal', icon: I.Zap, desc: 'Simple & guided', color: '#10b981', tabs: ['chat', 'slides', 'infographic', 'mindmap'] },
  dev: { label: 'Dev', icon: I.Cpu, desc: 'Full power mode', color: '#6366f1', tabs: ['chat', 'slides', 'infographic', 'mindmap', 'flashcards', 'podcast', 'models', 'cloud', 'ensemble', 'knowledge', 'memory'] },
  demo: { label: 'Demo', icon: I.Play, desc: 'Auto-play presentation', color: '#f59e0b', tabs: ['chat', 'slides', 'infographic', 'mindmap', 'flashcards', 'podcast'] },
}

const ALL_TABS = [
  { id:'chat', label:'Chat', icon:I.Message, color:'#10b981' },
  { id:'slides', label:'Slides', icon:I.Presentation, color:'#6366f1' },
  { id:'infographic', label:'Infographic', icon:I.BarChart, color:'#f59e0b' },
  { id:'mindmap', label:'Mind Map', icon:I.Globe, color:'#06b6d4' },
  { id:'flashcards', label:'Flashcards', icon:I.Layers3, color:'#8b5cf6' },
  { id:'podcast', label:'Podcast', icon:I.Headphones, color:'#ec4899' },
  { id:'models', label:'Models', icon:I.Cpu, color:'#10b981' },
  { id:'cloud', label:'Cloud AI', icon:I.Cloud, color:'#3b82f6' },
  { id:'ensemble', label:'Ensemble', icon:I.Users, color:'#f43f5e' },
  { id:'knowledge', label:'Knowledge', icon:I.Database, color:'#a855f7' },
  { id:'memory', label:'Memory', icon:I.Brain, color:'#10b981' },
]

const FAMILIES_LIST = ['All','SmolLM','Qwen','Phi','Llama','Gemma','Mistral','DeepSeek','Yi','StableLM','OpenHermes','SOLAR','Command R','CodeLlama','WizardLM','Starling','MiniCPM','InternLM','Nemotron','TinyLlama','OpenChat','Neural Chat','Dolphin','Nous Hermes','Arctic']

/* ═══ Markdown ═══ */
function RenderMd({ text }) {
  if (!text) return null
  return <div className="space-y-1">
    {text.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="text-lg font-extrabold mt-3 mb-1">{line.slice(2)}</h1>
      if (line.startsWith('## ')) return <h2 key={i} className="text-base font-bold mt-2 mb-1 text-emerald-400">{line.slice(3)}</h2>
      if (line.startsWith('- ')) return <li key={i} className="text-[12px] text-slate-400 ml-4 list-disc">{line.slice(2)}</li>
      if (line.trim() === '') return <div key={i} className="h-1" />
      const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-200 font-semibold">$1</strong>')
      const coded = bold.replace(/`(.*?)`/g, '<code class="px-1 py-0.5 bg-white/[0.05] rounded text-[11px] font-mono text-emerald-400">$1</code>')
      return <p key={i} className="text-[12px] text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: coded }} />
    })}
  </div>
}

/* ═══ Mode Switcher ═══ */
function ModeSwitcher({ mode, setMode }) {
  return (
    <div className="mode-switcher">
      {Object.entries(MODES).map(([key, cfg]) => {
        const Icon = cfg.icon || I.Zap
        return (
          <button key={key} onClick={() => setMode(key)} className={`mode-btn ${mode === key ? 'active' : ''}`} style={mode === key ? { '--mode-color': cfg.color } : {}} title={cfg.desc}>
            <Icon className="w-3.5 h-3.5" /><span>{cfg.label}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MEMORY VIEW
   ═══════════════════════════════════════════════════════════ */
function MemoryView({ }) {
  const [ltm, setLtm] = useState([])
  const [episodic, setEpisodic] = useState([])
  const [stats, setStats] = useState(null)
  const [filter, setFilter] = useState('')
  const [newFact, setNewFact] = useState('')
  const [newCategory, setNewCategory] = useState('fact')

  useEffect(() => {
    fetch(`${API}/memory/long-term?limit=50`).then(r => r.json()).then(setLtm).catch(() => {})
    fetch(`${API}/memory/episodic`).then(r => r.json()).then(setEpisodic).catch(() => {})
    fetch(`${API}/memory/stats`).then(r => r.json()).then(setStats).catch(() => {})
  }, [])

  const addFact = async () => {
    if (!newFact.trim()) return
    await fetch(`${API}/memory/long-term`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({content:newFact, category:newCategory, importance:0.7}) })
    setNewFact('')
    const r = await fetch(`${API}/memory/long-term?limit=50`); setLtm(await r.json())
  }

  const deleteFact = async (id) => {
    await fetch(`${API}/memory/long-term/${id}`, { method:'DELETE' })
    setLtm(p => p.filter(m => m.id !== id))
  }

  const filtered = ltm.filter(m => !filter || m.category === filter)
  const categories = [...new Set(ltm.map(m => m.category))]

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border border-emerald-500/20 flex items-center justify-center"><I.Brain className="w-5 h-5 text-emerald-400" /></div>
        <div className="flex-1"><h2 className="text-lg font-bold">Memory System</h2><p className="text-[10px] text-slate-500">Long-term & episodic memory — remembers everything across sessions</p></div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Long-term Facts', val: stats.long_term_facts, color: '#10b981' },
            { label: 'Episodic Sessions', val: stats.episodic_sessions, color: '#6366f1' },
            { label: 'Categories', val: Object.keys(stats.categories || {}).length, color: '#f59e0b' },
            { label: 'Short-term Sessions', val: stats.short_term_sessions, color: '#ec4899' },
          ].map((s, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className="text-2xl font-extrabold" style={{ color: s.color }}>{s.val}</div>
              <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-1 font-mono">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Add new fact */}
      <div className="glass-card p-4 mb-6">
        <h3 className="text-sm font-bold mb-3">Add to Long-term Memory</h3>
        <div className="flex gap-2">
          <input className="glass-input flex-1 px-3 py-2 text-xs" value={newFact} onChange={e => setNewFact(e.target.value)} onKeyDown={e => e.key === 'Enter' && addFact()} placeholder="Store a fact, preference, or important information..." />
          <select className="glass-input px-2 py-2 text-xs w-28" value={newCategory} onChange={e => setNewCategory(e.target.value)}>
            <option value="fact">Fact</option>
            <option value="preference">Preference</option>
            <option value="trend">Trend</option>
            <option value="number">Number</option>
            <option value="definition">Definition</option>
          </select>
          <button onClick={addFact} className="glass-btn glass-btn-primary text-[10px] px-3"><I.Zap className="w-3 h-3" /> Store</button>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        <button onClick={() => setFilter('')} className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase ${!filter ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-600 border border-transparent'}`}>All ({ltm.length})</button>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase ${filter === c ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-600 border border-transparent'}`}>{c} ({ltm.filter(m => m.category === c).length})</button>
        ))}
      </div>

      {/* Long-term memories */}
      <div className="space-y-2 mb-6">
        {filtered.map(m => (
          <div key={m.id} className="glass-card p-3 flex items-start gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><I.Brain className="w-4 h-4 text-emerald-400" /></div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-slate-300 leading-relaxed">{m.content}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="badge badge-green text-[7px]">{m.category}</span>
                <span className="text-[8px] text-slate-600 font-mono">importance: {m.importance}</span>
                <span className="text-[8px] text-slate-600 font-mono">accessed: {m.access_count}x</span>
              </div>
            </div>
            <button onClick={() => deleteFact(m.id)} className="p-1.5 rounded-lg hover:bg-white/5 text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"><I.Trash className="w-3 h-3" /></button>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center py-8 opacity-40"><I.Brain className="w-8 h-8 text-slate-600 mx-auto mb-2" /><p className="text-xs text-slate-500">No memories stored yet. Chat with AI and facts will be automatically extracted.</p></div>}
      </div>

      {/* Episodic memory */}
      {episodic.length > 0 && (
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">Past Sessions ({episodic.length})</p>
          {episodic.map(e => (
            <div key={e.id} className="glass-card p-3 mb-2 animate-fade-in">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold">{e.name}</span>
                <span className="badge badge-blue text-[7px]">{e.messages} msgs</span>
                <span className="text-[8px] text-slate-600 font-mono ml-auto">{e.created_at}</span>
              </div>
              <p className="text-[10px] text-slate-500">{e.summary}</p>
              {e.facts?.length > 0 && <div className="flex flex-wrap gap-1 mt-1.5">{e.facts.slice(0, 3).map((f, i) => <span key={i} className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/5 text-emerald-400 border border-emerald-500/10">{f.slice(0, 60)}</span>)}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  const [mode, setMode] = useState('normal')
  const cfg = MODES[mode]
  const [docs, setDocs] = useState([])
  const [activeDocs, setActiveDocs] = useState(new Set())
  const [library, setLibrary] = useState([])
  const [models, setModels] = useState({ installed:[], available:[], active:null, total:0 })
  const [chat, setChat] = useState([{ role:'sys', text:'Welcome to ExtractFlow AI. Upload documents, connect cloud AI, or use local models. Everything works offline. Memory system enabled — I remember our conversations.' }])
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
  const [mindmap, setMindmap] = useState(null)
  const [flashcards, setFlashcards] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [cloudProviders, setCloudProviders] = useState({})
  const [cloudConfig, setCloudConfig] = useState({})
  const [cloudForm, setCloudForm] = useState({ provider:'gemini', api_key:'', model:'gemini-2.0-flash' })
  const [cloudChatProvider, setCloudChatProvider] = useState('gemini')
  const [ensembleModels, setEnsembleModels] = useState([])
  const [ensembleEnabled, setEnsembleEnabled] = useState(false)
  const [ensembleResults, setEnsembleResults] = useState(null)
  const [knowledge, setKnowledge] = useState([])
  const [kbSearch, setKbSearch] = useState('')
  const [kbResults, setKbResults] = useState([])
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const recognitionRef = useRef(null)

  useEffect(() => { if (!cfg.tabs.includes(tab)) setTab(cfg.tabs[0]) }, [mode, cfg.tabs, tab])
  useEffect(() => { const h = () => setIsOffline(!navigator.onLine); window.addEventListener('online', h); window.addEventListener('offline', h); return () => { window.removeEventListener('online', h); window.removeEventListener('offline', h) } }, [])

  const refresh = useCallback(async () => {
    try {
      const [m, d, l, cc, e, k] = await Promise.all([
        fetch(`${API}/models`), fetch(`${API}/documents`), fetch(`${API}/library`),
        fetch(`${API}/cloud/config`).catch(() => ({ok:false})),
        fetch(`${API}/ensemble`).catch(() => ({ok:false})),
        fetch(`${API}/knowledge`).catch(() => ({ok:false})),
      ])
      if (m.ok) { const data = await m.json(); setModels(data); setLibrary([...(data.installed||[]), ...data.available]) }
      if (d.ok) setDocs(await d.json())
      if (cc.ok) setCloudConfig(await cc.json())
      if (e.ok) { const ed = await e.json(); setEnsembleModels(ed.models || []); setEnsembleEnabled(ed.enabled) }
      if (k.ok) setKnowledge(await k.json())
      const cp = await fetch(`${API}/cloud/providers`).catch(() => ({ok:false}))
      if (cp.ok) setCloudProviders(await cp.json())
    } catch {}
  }, [])

  useEffect(() => { let ws; try { ws = new WebSocket(`ws://${window.location.host}/ws`); ws.onmessage = () => refresh() } catch {} refresh(); return () => ws?.close() }, [])
  useEffect(() => { if (cfg.tabs.includes('models') || cfg.tabs.includes('knowledge') || cfg.tabs.includes('memory')) { const t = setInterval(refresh, 3000); return () => clearInterval(t) } }, [tab, refresh, cfg.tabs])

  const toggleDoc = useCallback(id => setActiveDocs(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n }), [])
  const delDoc = useCallback(async id => { await fetch(`${API}/documents/${id}`, { method:'DELETE' }); setDocs(p => p.filter(d => d.id !== id)); setActiveDocs(p => { const n = new Set(p); n.delete(id); return n }) }, [])
  const handleFiles = useCallback(async files => { for (const f of files) { const fd = new FormData(); fd.append('file', f); const r = await fetch(`${API}/upload`, { method:'POST', body: fd }); if (r.ok) { const d = await r.json(); setDocs(p => [...p, d]); setActiveDocs(p => new Set([...p, d.id])) } } }, [])
  const handlePaste = useCallback(async (text, name) => { const r = await fetch(`${API}/paste`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({text, name}) }); if (r.ok) { const d = await r.json(); setDocs(p => [...p, d]); setActiveDocs(p => new Set([...p, d.id])) } }, [])

  const loadModel = useCallback(async mid => { setModelLoading(true); try { const r = await fetch(`${API}/models/${mid}/load`, { method:'POST' }); if (!r.ok) throw new Error((await r.json()).detail); await refresh(); setChat(p => [...p, { role:'sys', text:`Model loaded: ${mid}` }]) } catch (e) { setChat(p => [...p, { role:'sys', text:`Load failed: ${e.message}` }]) } setModelLoading(false) }, [refresh])
  const downloadModel = useCallback(async mid => { try { setChat(p => [...p, { role:'sys', text:`Downloading ${mid}...` }]); await fetch(`${API}/models/${mid}/download`, { method:'POST' }) } catch (e) { setChat(p => [...p, { role:'sys', text:`Error: ${e.message}` }]) } }, [])
  const deleteModel = useCallback(async mid => { await fetch(`${API}/models/${mid}`, { method:'DELETE' }); if (models.active === mid) setChat(p => [...p, { role:'sys', text:'Model unloaded.' }]); await refresh() }, [models.active, refresh])

  const send = useCallback(async text => {
    if (!text.trim()) return
    setChat(p => [...p, { role:'user', text }])
    const activeCloud = cloudConfig[cloudChatProvider]
    if (activeCloud?.configured) {
      try { const r = await fetch(`${API}/cloud/chat`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ message:text, provider:cloudChatProvider, model:activeCloud.model, guard, doc_ids:[...activeDocs] }) }); const d = await r.json(); setChat(p => [...p, { role:'ai', text:d.response, chunks:d.chunks, provider:`${d.provider}/${d.model}` }]) }
      catch (e) { setChat(p => [...p, { role:'sys', text:`Cloud error: ${e.message}` }]) }
    } else if (ensembleEnabled && ensembleModels.length > 0) {
      try { const r = await fetch(`${API}/ensemble/chat`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ message:text, doc_ids:[...activeDocs], guard }) }); const d = await r.json(); setEnsembleResults(d.results); setChat(p => [...p, { role:'ai', text:d.merged, chunks:d.count, provider:'ensemble' }]) }
      catch (e) { setChat(p => [...p, { role:'sys', text:`Ensemble error: ${e.message}` }]) }
    } else if (models.active) {
      try { const r = await fetch(`${API}/chat`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ message:text, mode:'chat', guard, doc_ids:[...activeDocs] }) }); const d = await r.json(); setChat(p => [...p, { role:'ai', text:d.response, chunks:d.chunks }]) }
      catch (e) { setChat(p => [...p, { role:'sys', text:`Error: ${e.message}` }]) }
    } else {
      setChat(p => [...p, { role:'sys', text:'No model loaded. Load a local model, connect a cloud API, or enable ensemble mode.' }])
    }
  }, [models.active, activeDocs, guard, cloudConfig, cloudChatProvider, ensembleEnabled, ensembleModels])

  const extract = useCallback(async () => {
    try { const r = await fetch(`${API}/chat`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ message:'Extract all key data as structured JSON', mode:'extract', guard, doc_ids:[...activeDocs] }) }); const d = await r.json(); setNotes(p => [{ id:Date.now(), text:d.response, chunks:d.chunks, time:new Date().toLocaleTimeString() }, ...p]); setChat(p => [...p, { role:'sys', text:`Extraction saved (${d.chunks} chunks)` }]) } catch (e) { setChat(p => [...p, { role:'sys', text:`Error: ${e.message}` }]) }
  }, [activeDocs, guard])

  const docId = [...activeDocs][0] || docs[0]?.id
  const withDoc = (extra={}) => ({ doc_id: docId, ...extra })
  const gen = useCallback(async (endpoint, extra, setter, label) => { setGenerating(true); try { const r = await fetch(`${API}/generate/${endpoint}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(extra) }); const d = await r.json(); setter(d); setChat(p => [...p, { role:'sys', text:`${label} generated` }]) } catch (e) { setChat(p => [...p, { role:'sys', text:`Error: ${e.message}` }]) } setGenerating(false) }, [])
  const generateSlides = useCallback(() => gen('slides', withDoc({ title:'Document Summary' }), setSlides, 'Slides'), [gen, docId])
  const generateInfographic = useCallback(() => gen('infographic', withDoc({ title:'Document Overview' }), setInfographic, 'Infographic'), [gen, docId])
  const generateMindmap = useCallback(() => gen('mindmap', withDoc({ title:'Document Map' }), setMindmap, 'Mind map'), [gen, docId])
  const generatePodcast = useCallback(() => gen('podcast', withDoc({ title:'Document Summary' }), setPodcast, 'Podcast'), [gen, docId])
  const generateFlashcards = useCallback(async () => { if (!docs.length) return; setGenerating(true); try { const text = docs.find(d => activeDocs.has(d.id))?.text || docs[0]?.text || ''; const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20).slice(0, 10); const cards = sentences.map((s, i) => { const words = s.trim().split(' '); return { q: `What about: ${words.slice(0,6).join(' ')}?`, a: words.slice(6).join(' ').trim() + '.' || s.trim(), id: i } }); setFlashcards({ cards, count: cards.length }); setChat(p => [...p, { role:'sys', text:`Generated ${cards.length} flashcards` }]) } catch (e) { setChat(p => [...p, { role:'sys', text:`Error: ${e.message}` }]) } setGenerating(false) }, [docs, activeDocs])

  const audio = useCallback(() => { if (ttsActive) { speechSynthesis?.cancel(); setTtsActive(false); return }; let s = ''; if (podcast) s = podcast.script.map(l => `${l.speaker === 'host' ? 'Host' : 'Co-host'}: ${l.text}`).join('. '); else if (notes.length) s = notes[0].text.slice(0, 800); else { const ai = chat.filter(m => m.role === 'ai'); if (ai.length) s = ai[ai.length - 1].text.slice(0, 800) }; if (!s) s = 'No content to read yet.'; setTtsActive(true); const u = new SpeechSynthesisUtterance(s); u.lang = 'en-US'; u.onend = () => setTtsActive(false); speechSynthesis?.speak(u) }, [podcast, notes, chat, ttsActive])
  const toggleMic = useCallback(() => { if (recording) { recognitionRef.current?.stop(); setRecording(false); return }; const SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) { setChat(p => [...p, { role:'sys', text:'Speech recognition not supported.' }]); return }; const r = new SR(); r.lang = 'en-US'; r.interimResults = false; r.onresult = e => { const t = e.results[0][0].transcript; setRecording(false); send(t) }; r.onerror = () => setRecording(false); r.onend = () => setRecording(false); recognitionRef.current = r; r.start(); setRecording(true) }, [send])

  const saveCloudConfig = useCallback(async () => { try { const r = await fetch(`${API}/cloud/configure`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(cloudForm) }); if (r.ok) { setChat(p => [...p, { role:'sys', text:`${cloudProviders[cloudForm.provider]?.name || cloudForm.provider} connected!` }]); await refresh() } } catch (e) { setChat(p => [...p, { role:'sys', text:`Error: ${e.message}` }]) } }, [cloudForm, cloudProviders, refresh])
  const removeCloudProvider = useCallback(async provider => { await fetch(`${API}/cloud/${provider}`, { method:'DELETE' }); await refresh() }, [refresh])

  const toggleEnsemble = useCallback(async () => {
    const newEnabled = !ensembleEnabled
    await fetch(`${API}/ensemble/configure`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ models: ensembleModels, enabled: newEnabled }) })
    setEnsembleEnabled(newEnabled); await refresh()
  }, [ensembleEnabled, ensembleModels, refresh])

  const addEnsembleModel = useCallback(model => {
    if (ensembleModels.find(m => m.id === model.id)) return
    setEnsembleModels(prev => { const next = [...prev, model]; fetch(`${API}/ensemble/configure`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ models: next, enabled: ensembleEnabled }) }); return next })
  }, [ensembleModels, ensembleEnabled])

  const removeEnsembleModel = useCallback(id => {
    setEnsembleModels(prev => { const next = prev.filter(m => m.id !== id); fetch(`${API}/ensemble/configure`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ models: next, enabled: ensembleEnabled }) }); return next })
  }, [ensembleEnabled])

  const searchKb = useCallback(async q => { setKbSearch(q); if (!q.trim()) { setKbResults([]); return }; try { const r = await fetch(`${API}/knowledge/search?q=${encodeURIComponent(q)}`); if (r.ok) setKbResults(await r.json()) } catch {} }, [])

  const filtered = library.filter(m => { if (familyFilter !== 'All' && m.family !== familyFilter) return false; if (search) { const q = search.toLowerCase(); return m.name.toLowerCase().includes(q) || m.desc?.toLowerCase().includes(q) }; return true })
  const chunkCount = docs.filter(d => activeDocs.has(d.id)).reduce((a, d) => a + d.chunks, 0)
  const visibleTabs = ALL_TABS.filter(t => cfg.tabs.includes(t.id))

  const demoStarted = useRef(false)
  useEffect(() => { if (mode === 'demo' && !demoStarted.current) { demoStarted.current = true; handlePaste(DEMO, 'energy_report_2024.txt') } }, [mode, handlePaste])

  return (
    <div className="h-screen flex relative z-10" style={{ userSelect: 'none' }}>
      <div className="bg-mesh" />
      <div className="bg-orb bg-orb-1" /><div className="bg-orb bg-orb-2" /><div className="bg-orb bg-orb-3" />

      {/* ═══ LEFT PANEL ═══ */}
      <aside className="glass w-72 xl:w-80 flex-shrink-0 border-r border-white/[0.06] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3 mb-3">
            <ExtractFlowLogo size={40} className="drop-shadow-lg" />
            <div className="flex-1">
              <h1 className="text-[15px] font-extrabold tracking-tight text-gradient">ExtractFlow</h1>
              <p className="text-[7px] font-bold uppercase tracking-[0.15em] text-slate-600">by al13n-x-v0x</p>
            </div>
          </div>
          <ModeSwitcher mode={mode} setMode={setMode} />
          <div className={`flex items-center gap-2 mt-2 p-2 rounded-lg border ${isOffline ? 'bg-amber-500/5 border-amber-500/20' : 'bg-white/[0.02] border-white/[0.04]'}`}>
            {isOffline ? <I.WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <I.Wifi className="w-3.5 h-3.5 text-emerald-400" />}
            <span className={`text-[10px] font-mono ${isOffline ? 'text-amber-400' : 'text-slate-500'}`}>{isOffline ? 'Offline Mode' : 'Online'}</span>
            {models.active && <span className="ml-auto badge badge-green text-[7px]">Local</span>}
            {cloudConfig[cloudChatProvider]?.configured && <span className="ml-auto badge badge-blue text-[7px]">Cloud</span>}
          </div>
          <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <I.Cpu className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[10px] text-slate-400 font-mono truncate">{models.active || cloudConfig[cloudChatProvider]?.configured ? `${cloudChatProvider} cloud` : 'No model loaded'}</span>
            {models.active && <span className="ml-auto badge badge-green text-[7px]">Active</span>}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <div className={`drop-zone ${dragging ? 'dragging' : ''}`} onClick={() => document.getElementById('fileInput').click()} onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}>
            <I.Upload className="w-7 h-7 text-emerald-500/30 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-300">Drop files here</p>
            <p className="text-[10px] text-slate-600 mt-0.5">TXT, CSV, JSON, MD, PDF</p>
          </div>
          <input id="fileInput" type="file" multiple accept=".txt,.csv,.json,.md,.pdf" className="hidden" onChange={e => handleFiles(e.target.files)} />
          <button onClick={() => handlePaste(DEMO, 'energy_report_2024.txt')} className="glass-btn glass-btn-secondary w-full text-[11px]"><I.FileText className="w-3 h-3" /> Load Demo</button>

          {docs.length > 0 && (
            <div className="animate-fade-in">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">Sources ({docs.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {docs.map(d => (
                  <div key={d.id} onClick={() => toggleDoc(d.id)} className={`source-chip ${activeDocs.has(d.id) ? 'active' : ''}`}>
                    <span className="text-[6px]">{activeDocs.has(d.id) ? '●' : '○'}</span>
                    <span className="max-w-[5rem] truncate">{d.name}</span>
                    <span onClick={e => { e.stopPropagation(); delDoc(d.id) }} className="opacity-30 hover:opacity-100 hover:text-red-400">×</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="divider" />
          <div className="flex items-center gap-3 cursor-pointer py-1.5 px-1 rounded-lg hover:bg-white/[0.02]" onClick={() => setGuard(!guard)}>
            <div className={`toggle ${guard ? 'active' : ''}`} />
            <I.Shield className={`w-4 h-4 ${guard ? 'text-emerald-400' : 'text-slate-600'}`} />
            <div className="flex-1"><span className={`text-xs font-medium ${guard ? 'text-slate-200' : 'text-slate-500'}`}>Guard</span><p className="text-[9px] text-slate-600">Injection protection</p></div>
          </div>

          <div className="divider" />
          <button onClick={extract} disabled={chunkCount === 0} className="glass-btn glass-btn-primary w-full py-2.5 text-xs"><I.Zap className="w-3.5 h-3.5" /> Extract Data</button>
          <button onClick={audio} className={`glass-btn w-full text-[11px] ${ttsActive ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'glass-btn-secondary'}`}><I.Volume className="w-3 h-3" /> {ttsActive ? 'Stop Audio' : 'Listen Aloud'}</button>
        </div>

        {/* Copyright footer */}
        <div className="p-3 border-t border-white/[0.04]">
          <p className="text-[7px] text-slate-700 text-center font-mono leading-relaxed">
            © 2025 github.com/al13n-x-v0x<br/>
            Discord: al13n._.invisible<br/>
            All rights reserved
          </p>
        </div>
      </aside>

      {/* ═══ CENTER ═══ */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex border-b border-white/[0.06] bg-white/[0.01] px-2 overflow-x-auto">
          {visibleTabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${tab === t.id ? 'tab-active border-current text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
              <t.icon className="w-3.5 h-3.5" /> {t.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-hidden">
          {tab === 'chat' && <ChatView chat={chat} onSend={send} modelLoaded={!!models.active || !!cloudConfig[cloudChatProvider]?.configured} chunkCount={chunkCount} recording={recording} onMic={toggleMic} cloudProvider={cloudChatProvider} setCloudProvider={setCloudChatProvider} cloudConfig={cloudConfig} />}
          {tab === 'slides' && <SlidesView slides={slides} generating={generating} onExport={slides ? () => window.open(`${API}/export/slides/${slides.id}`) : null} onGenerate={generateSlides} />}
          {tab === 'infographic' && <InfographicView data={infographic} generating={generating} onExport={infographic ? () => window.open(`${API}/export/infographic/${infographic.id}`) : null} onGenerate={generateInfographic} />}
          {tab === 'mindmap' && <MindMapView data={mindmap} generating={generating} onExport={mindmap ? () => window.open(`${API}/export/mindmap/${mindmap.id}`) : null} onGenerate={generateMindmap} />}
          {tab === 'flashcards' && <FlashcardView data={flashcards} generating={generating} onGenerate={generateFlashcards} />}
          {tab === 'podcast' && <PodcastView data={podcast} generating={generating} ttsActive={ttsActive} onPlay={audio} onGenerate={generatePodcast} />}
          {tab === 'models' && <LibraryView library={filtered} search={search} setSearch={setSearch} familyFilter={familyFilter} setFamilyFilter={setFamilyFilter} onLoad={loadModel} onDownload={downloadModel} onDelete={deleteModel} activeModel={models.active} confirmDel={confirmDel} setConfirmDel={setConfirmDel} modelLoading={modelLoading} totalCount={models.total} />}
          {tab === 'cloud' && <CloudView providers={cloudProviders} config={cloudConfig} form={cloudForm} setForm={setCloudForm} onSave={saveCloudConfig} onRemove={removeCloudProvider} />}
          {tab === 'ensemble' && <EnsembleView models={ensembleModels} enabled={ensembleEnabled} onToggle={toggleEnsemble} onAdd={addEnsembleModel} onRemove={removeEnsembleModel} library={library} results={ensembleResults} />}
          {tab === 'knowledge' && <KnowledgeView docs={knowledge} search={kbSearch} onSearch={searchKb} results={kbResults} />}
          {tab === 'memory' && <MemoryView />}
        </div>
      </main>

      {/* ═══ RIGHT PANEL ═══ */}
      <aside className="glass w-72 xl:w-80 flex-shrink-0 border-l border-white/[0.06] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center"><I.Layers className="w-3.5 h-3.5 text-indigo-400" /></div>
            <span className="text-sm font-bold">Extractions</span>
            {notes.length > 0 && <span className="ml-auto badge badge-blue">{notes.length}</span>}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notes.length === 0 ? (
            <div className="text-center py-16 opacity-40">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mx-auto mb-3"><I.FileText className="w-7 h-7 text-slate-600" /></div>
              <p className="text-xs font-semibold text-slate-500">No extractions yet</p>
              <p className="text-[10px] text-slate-600 mt-1">Click Extract Data to start</p>
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
              <div className="flex items-center gap-2 mt-2"><span className="text-[9px] text-slate-600 font-mono">{n.time}</span><span className="text-[9px] text-slate-600 font-mono">{n.chunks} chunks</span></div>
            </div>
          ))}
          {chat.filter(m => m.role === 'ai').length > 0 && (
            <div className="mt-4 animate-fade-in">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">Recent</p>
              {chat.filter(m => m.role === 'ai').slice(-2).reverse().map((m, i) => (
                <div key={i} className="extraction-note mb-2">
                  <span className="badge badge-green mb-2">AI</span>
                  {m.provider && <span className="badge badge-blue ml-1 mb-2 text-[7px]">{m.provider}</span>}
                  <RenderMd text={m.text?.slice(0, 300)} />
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
   SUB-VIEWS (Chat, Slides, Infographic, MindMap, Flashcards, Podcast, Library, Cloud, Ensemble, Knowledge)
   ═══════════════════════════════════════════════════════════ */

function ChatView({ chat, onSend, modelLoaded, chunkCount, recording, onMic, cloudProvider, setCloudProvider, cloudConfig }) {
  const [input, setInput] = useState(''); const [running, setRunning] = useState(false); const ref = useRef(null)
  useEffect(() => { ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior:'smooth' }) }, [chat])
  const sendMsg = async () => { if (!input.trim() || running) return; setRunning(true); const m = input; setInput(''); await onSend(m); setRunning(false) }
  return (
    <Fragment>
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-3 bg-white/[0.01]">
        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><I.Message className="w-3.5 h-3.5 text-emerald-400" /></div>
        <span className="text-sm font-bold">Chat</span>
        {modelLoaded && <span className="badge badge-green">Ready</span>}
        <span className="ml-auto text-[10px] text-slate-600 font-mono">{chunkCount} chunks</span>
        <select value={cloudProvider} onChange={e => setCloudProvider(e.target.value)} className="glass-input text-[10px] px-2 py-1 w-24">
          {Object.entries(cloudConfig).filter(([,v]) => v.configured).map(([k]) => <option key={k} value={k}>{k}</option>)}
        </select>
      </div>
      <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="flex-1" />
        {chat.map((m, i) => (
          <div key={i} className={`animate-fade-in ${m.role === 'user' ? 'msg-user px-4 py-3 text-[13px]' : m.role === 'ai' ? 'msg-ai px-4 py-3 text-[13px]' : 'msg-sys px-3 py-2'}`}>
            {m.role === 'ai' && <div className="flex items-center gap-2 mb-2"><span className="badge badge-green">AI</span>{m.provider && <span className="badge badge-blue text-[7px]">{m.provider}</span>}{m.chunks && <span className="text-[9px] text-slate-600 font-mono">{m.chunks} chunks</span>}</div>}
            {m.role === 'ai' ? <RenderMd text={m.text} /> : m.text}
          </div>
        ))}
        {running && <div className="msg-ai px-4 py-3 flex items-center gap-2 animate-fade-in"><div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation:`pulseDot 1.2s ease-in-out ${i*0.15}s infinite` }} />)}</div><span className="text-[11px] text-slate-500">Thinking...</span></div>}
      </div>
      <div className="p-3 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="flex gap-2">
          <button onClick={onMic} className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${recording ? 'bg-red-500/15 border border-red-500/30 text-red-400 recording' : 'bg-white/[0.03] border border-white/[0.06] text-slate-500 hover:text-slate-300'}`}><I.Mic className="w-4 h-4" /></button>
          <input className="flex-1 glass-input px-4 py-2.5 text-sm" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg() } }} placeholder={modelLoaded ? 'Ask about your documents...' : 'Load a model or connect cloud API...'} disabled={running} />
          <button onClick={sendMsg} disabled={!input.trim() || running || !modelLoaded} className="glass-btn glass-btn-primary w-10 h-10 px-0 rounded-xl flex-shrink-0"><I.Send className="w-4 h-4" /></button>
        </div>
      </div>
    </Fragment>
  )
}

function SlidesView({ slides, generating, onExport, onGenerate }) {
  const [cur, setCur] = useState(0)
  useEffect(() => setCur(0), [slides])
  if (generating) return <EmptyState icon={I.Presentation} title="Generating slides..." loading />
  if (!slides?.slides) return <EmptyState icon={I.Presentation} title="Slide Deck Generator" subtitle="Upload docs, then click Generate" action={<button onClick={onGenerate} className="glass-btn glass-btn-primary text-xs mt-4"><I.Presentation className="w-3 h-3" /> Generate Slides</button>} />
  const s = slides.slides[cur]
  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><span className="badge badge-green">{cur + 1}/{slides.slides.length}</span><span className="text-xs text-slate-500 font-mono">{s.type}</span></div><button onClick={onExport} className="glass-btn glass-btn-secondary text-[10px]"><I.ExternalLink className="w-3 h-3" /> Export</button></div>
      <div className="flex-1 rounded-2xl border border-white/[0.06] overflow-hidden bg-[rgba(12,18,35,0.8)]" style={{ borderTop:`3px solid ${s.accent || '#10b981'}` }}>
        <div className="h-full flex flex-col justify-center p-8 md:p-12">
          {s.type === 'title' && <Fragment><h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ background:`linear-gradient(135deg, ${s.accent}, #fff)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{s.title}</h1><p className="text-xl text-slate-400">{s.subtitle}</p></Fragment>}
          {s.type === 'overview' && <Fragment><h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: s.accent }}>{s.title}</h2><div className="grid grid-cols-2 gap-3">{(s.items||[]).map((item, i) => <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.accent }} /><span className="text-sm text-slate-300">{item}</span></div>)}</div></Fragment>}
          {s.type === 'content' && <Fragment><h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: s.accent }}>{s.title}</h2><ul className="space-y-3">{(s.bullets||[]).map((b, i) => <li key={i} className="flex items-start gap-3 text-base text-slate-300 leading-relaxed"><span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.accent }} />{b}</li>)}</ul></Fragment>}
          {s.type === 'summary' && <Fragment><h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: s.accent }}>{s.title}</h2><ul className="space-y-3">{(s.items||[]).map((item, i) => <li key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed"><span className="text-emerald-400 font-bold">✓</span>{item}</li>)}</ul></Fragment>}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-4">
        <button onClick={() => setCur(p => (p-1+slides.slides.length)%slides.slides.length)} className="glass-btn glass-btn-secondary text-xs px-4">← Prev</button>
        <div className="flex gap-1.5">{slides.slides.map((_, i) => <div key={i} onClick={() => setCur(i)} className={`w-2 h-2 rounded-full cursor-pointer transition-all ${i === cur ? 'bg-emerald-400 scale-125' : 'bg-white/10 hover:bg-white/20'}`} />)}</div>
        <button onClick={() => setCur(p => (p+1)%slides.slides.length)} className="glass-btn glass-btn-secondary text-xs px-4">Next →</button>
      </div>
    </div>
  )
}

function InfographicView({ data, generating, onExport, onGenerate }) {
  if (generating) return <EmptyState icon={I.BarChart} title="Generating infographic..." loading />
  if (!data?.data) return <EmptyState icon={I.BarChart} title="Infographic Generator" subtitle="Upload docs, then click Generate" action={<button onClick={onGenerate} className="glass-btn glass-btn-primary text-xs mt-4"><I.BarChart className="w-3 h-3" /> Generate Infographic</button>} />
  const d = data.data
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-extrabold text-gradient">{d.title}</h2><button onClick={onExport} className="glass-btn glass-btn-secondary text-[10px]"><I.ExternalLink className="w-3 h-3" /> Export</button></div>
      <p className="text-xs text-slate-500 mb-6">{d.wordCount} words · {d.sentenceCount} sentences</p>
      <div className="grid grid-cols-3 gap-3 mb-6">{d.stats.map((s, i) => <div key={i} className="glass-card p-4 text-center"><div className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</div><div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1 font-mono">{s.label}</div></div>)}</div>
      <div className="space-y-3 mb-6">{d.sections.map((s, i) => <div key={i} className="glass-card p-4" style={{ borderLeft:`3px solid ${s.color}` }}><h3 className="text-sm font-bold mb-1" style={{ color: s.color }}>{s.heading}</h3><p className="text-xs text-slate-400 leading-relaxed">{s.body}</p></div>)}</div>
      {d.keyNumbers.length > 0 && <div><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">Key Numbers</p><div className="flex flex-wrap gap-2">{d.keyNumbers.map((n, i) => <span key={i} className="badge badge-muted text-[10px]">{n}</span>)}</div></div>}
    </div>
  )
}

function MindMapView({ data, generating, onExport, onGenerate }) {
  if (generating) return <EmptyState icon={I.Globe} title="Generating mind map..." loading />
  if (!data?.tree) return <EmptyState icon={I.Globe} title="Mind Map Generator" subtitle="Upload docs, then click Generate" action={<button onClick={onGenerate} className="glass-btn glass-btn-primary text-xs mt-4"><I.Globe className="w-3 h-3" /> Generate Mind Map</button>} />
  const tree = data.tree; const colors = ['#10b981','#6366f1','#f59e0b','#ef4444','#8b5cf6','#ec4899','#14b8a6','#f97316']
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center"><I.Globe className="w-5 h-5 text-cyan-400" /></div><div><h2 className="text-lg font-bold">Mind Map</h2><p className="text-[10px] text-slate-500">Document structure</p></div></div><button onClick={onExport} className="glass-btn glass-btn-secondary text-[10px]"><I.ExternalLink className="w-3 h-3" /> Export</button></div>
      <div className="flex flex-col items-center gap-6">
        <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-indigo-500/10 border border-emerald-500/20 text-lg font-bold animate-glow">{tree.label}</div>
        <div className="w-px h-6 bg-white/10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {tree.children.map((child, i) => (
            <div key={i} className="glass-card p-4 animate-fade-in" style={{ animationDelay:`${i*0.05}s`, borderLeft:`3px solid ${colors[i%colors.length]}` }}>
              <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full" style={{ background:colors[i%colors.length] }} /><span className="text-xs font-bold" style={{ color:colors[i%colors.length] }}>{child.label}</span></div>
              {child.children && child.children.map((leaf, j) => (<div key={j} className="ml-4 py-1.5 border-l border-white/[0.06] pl-3"><p className="text-[10px] text-slate-400 leading-relaxed">{leaf.label}</p></div>))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FlashcardView({ data, generating, onGenerate }) {
  const [idx, setIdx] = useState(0); const [flipped, setFlipped] = useState(false)
  useEffect(() => { setIdx(0); setFlipped(false) }, [data])
  if (generating) return <EmptyState icon={I.Layers3} title="Generating flashcards..." loading />
  if (!data?.cards) return <EmptyState icon={I.Layers3} title="Flashcard Generator" subtitle="Upload docs, then click Generate" action={<button onClick={onGenerate} className="glass-btn glass-btn-primary text-xs mt-4"><I.Layers3 className="w-3 h-3" /> Generate Flashcards</button>} />
  const card = data.cards[idx]; const colors = ['#10b981','#6366f1','#f59e0b','#ef4444','#8b5cf6','#ec4899']; const color = colors[idx % colors.length]
  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="flex items-center gap-3 mb-6"><span className="badge badge-green">{idx + 1}/{data.count}</span><span className="text-xs text-slate-500">Click card to flip</span></div>
      <div className={`flashcard w-full max-w-lg h-64 cursor-pointer ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
        <div className="flashcard-inner w-full h-full relative">
          <div className="flashcard-front glass-card" style={{ borderTop:`3px solid ${color}` }}><I.HelpCircle className="w-8 h-8 mb-3" style={{ color }} /><p className="text-base font-bold text-slate-200 text-center leading-relaxed">{card.q}</p><p className="text-[10px] text-slate-500 mt-4">Click to reveal answer</p></div>
          <div className="flashcard-back glass-card" style={{ borderTop:`3px solid ${color}`, transform:'rotateY(180deg)' }}><I.Check className="w-8 h-8 mb-3" style={{ color }} /><p className="text-sm text-slate-300 text-center leading-relaxed">{card.a}</p></div>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={() => { setIdx(p => Math.max(0, p-1)); setFlipped(false) }} disabled={idx === 0} className="glass-btn glass-btn-secondary text-xs px-4">← Prev</button>
        <button onClick={() => setFlipped(!flipped)} className="glass-btn glass-btn-secondary text-xs px-4">Flip</button>
        <button onClick={() => { setIdx(p => Math.min(data.count-1, p+1)); setFlipped(false) }} disabled={idx === data.count-1} className="glass-btn glass-btn-primary text-xs px-4">Next →</button>
      </div>
    </div>
  )
}

function PodcastView({ data, generating, ttsActive, onPlay, onGenerate }) {
  const [playingIdx, setPlayingIdx] = useState(-1)
  useEffect(() => setPlayingIdx(-1), [data])
  const playFrom = useCallback(idx => { if (ttsActive) { speechSynthesis?.cancel(); setPlayingIdx(-1); return } if (!data?.script) return; const lines = data.script.slice(idx); const fullText = lines.map(l => `${l.speaker === 'host' ? 'Host' : 'Co-host'}: ${l.text}`).join('. '); const u = new SpeechSynthesisUtterance(fullText); u.lang = 'en-US'; u.onend = () => setPlayingIdx(-1); setPlayingIdx(idx); speechSynthesis?.speak(u) }, [data, ttsActive])
  if (generating) return <EmptyState icon={I.Headphones} title="Generating podcast..." loading />
  if (!data?.script) return <EmptyState icon={I.Headphones} title="Podcast Generator" subtitle="Upload docs, then click Generate" action={<button onClick={onGenerate} className="glass-btn glass-btn-primary text-xs mt-4"><I.Headphones className="w-3 h-3" /> Generate Podcast</button>} />
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border border-purple-500/20 flex items-center justify-center"><I.Headphones className="w-5 h-5 text-purple-400" /></div><div><h2 className="text-lg font-bold">Podcast</h2><p className="text-[10px] text-slate-500">{data.count} segments</p></div></div>
        <button onClick={() => playFrom(0)} className={`glass-btn text-xs ${ttsActive ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'glass-btn-primary'}`}>{ttsActive ? <Fragment><I.Pause className="w-3 h-3" /> Stop</Fragment> : <Fragment><I.Play className="w-3 h-3" /> Play All</Fragment>}</button>
      </div>
      <div className="space-y-3">
        {data.script.map((line, i) => (
          <div key={i} onClick={() => playFrom(i)} className={`glass-card p-4 cursor-pointer transition-all hover:border-white/[0.12] ${playingIdx === i ? 'border-emerald-500/30' : ''}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${line.speaker === 'host' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'}`}>{line.speaker === 'host' ? 'H' : 'C'}</div>
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

function CloudView({ providers, config, form, setForm, onSave, onRemove }) {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border border-blue-500/20 flex items-center justify-center"><I.Cloud className="w-5 h-5 text-blue-400" /></div>
        <div><h2 className="text-lg font-bold">Cloud AI Providers</h2><p className="text-[10px] text-slate-500">Connect Gemini, OpenAI, Claude, Groq, DeepSeek</p></div>
      </div>
      <div className="space-y-3 mb-6">
        {Object.entries(config).filter(([,v]) => v.configured).map(([provider, cfg]) => (
          <div key={provider} className="glass-card p-4 flex items-center gap-3 animate-fade-in">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><I.Check className="w-5 h-5 text-emerald-400" /></div>
            <div className="flex-1"><div className="flex items-center gap-2"><span className="text-sm font-bold">{providers[provider]?.name || provider}</span><span className="badge badge-green">Connected</span></div><p className="text-[10px] text-slate-500 font-mono">Model: {cfg.model}</p></div>
            <button onClick={() => onRemove(provider)} className="glass-btn glass-btn-danger text-[10px] px-3 py-1.5"><I.Trash className="w-3 h-3" /> Remove</button>
          </div>
        ))}
      </div>
      <div className="glass-card p-4">
        <h3 className="text-sm font-bold mb-3">Connect New Provider</h3>
        <div className="space-y-3">
          <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Provider</label>
            <select className="glass-input w-full px-3 py-2 text-sm" value={form.provider} onChange={e => { const p = e.target.value; setForm({ ...form, provider: p, model: providers[p]?.models[0] || '' }) }}>
              {Object.entries(providers).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
            </select></div>
          <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">API Key</label>
            <input type="password" className="glass-input w-full px-3 py-2 text-sm" value={form.api_key} onChange={e => setForm({ ...form, api_key: e.target.value })} placeholder="Enter your API key..." /></div>
          <div><label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Model</label>
            <select className="glass-input w-full px-3 py-2 text-sm" value={form.model} onChange={e => setForm({ ...form, model: e.target.value })}>
              {(providers[form.provider]?.models || []).map(m => <option key={m} value={m}>{m}</option>)}
            </select></div>
          <button onClick={onSave} disabled={!form.api_key} className="glass-btn glass-btn-primary w-full py-2.5 text-xs"><I.Lock className="w-3.5 h-3.5" /> Connect Provider</button>
        </div>
      </div>
    </div>
  )
}

function EnsembleView({ models: ensembleModels, enabled, onToggle, onAdd, onRemove, library, results }) {
  const [selectedLocal, setSelectedLocal] = useState('')
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 border border-rose-500/20 flex items-center justify-center"><I.Users className="w-5 h-5 text-rose-400" /></div>
        <div className="flex-1"><h2 className="text-lg font-bold">Multi-Model Ensemble</h2><p className="text-[10px] text-slate-500">Models work together as a team</p></div>
        <button onClick={onToggle} className={`glass-btn text-xs ${enabled ? 'glass-btn-primary' : 'glass-btn-secondary'}`}>{enabled ? 'Enabled' : 'Disabled'}</button>
      </div>
      {ensembleModels.length === 0 ? (
        <div className="glass-card p-6 text-center opacity-50"><I.Users className="w-8 h-8 text-slate-600 mx-auto mb-2" /><p className="text-xs text-slate-500">No models in team. Add below.</p></div>
      ) : (
        <div className="space-y-2 mb-6">
          {ensembleModels.map(m => (
            <div key={m.id} className="glass-card p-3 flex items-center gap-3 animate-fade-in">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${m.type === 'local' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-blue-500/10 border border-blue-500/20'}`}>
                {m.type === 'local' ? <I.Cpu className="w-4 h-4 text-emerald-400" /> : <I.Cloud className="w-4 h-4 text-blue-400" />}
              </div>
              <div className="flex-1"><span className="text-xs font-bold">{m.name}</span><span className={`ml-2 badge text-[7px] ${m.type === 'local' ? 'badge-green' : 'badge-blue'}`}>{m.type}</span></div>
              <button onClick={() => onRemove(m.id)} className="p-1.5 rounded-lg hover:bg-white/5 text-slate-600 hover:text-red-400 transition-colors"><I.X className="w-3 h-3" /></button>
            </div>
          ))}
        </div>
      )}
      <div className="glass-card p-4 mb-6">
        <h3 className="text-sm font-bold mb-3">Add Model to Team</h3>
        <div className="flex gap-2">
          <select className="glass-input flex-1 px-3 py-2 text-xs" value={selectedLocal} onChange={e => setSelectedLocal(e.target.value)}>
            <option value="">Local models...</option>
            {library.filter(m => m.installed).map(m => <option key={m.id} value={m.id}>{m.name} ({m.disk_mb}MB)</option>)}
          </select>
          <button onClick={() => { if (selectedLocal) { const m = library.find(l => l.id === selectedLocal); onAdd({ id: m.id, type: 'local', name: m.name }); setSelectedLocal('') } }} disabled={!selectedLocal} className="glass-btn glass-btn-primary text-[10px] px-3"><I.Zap className="w-3 h-3" /> Add</button>
        </div>
      </div>
      {results && (
        <div className="space-y-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 font-mono">Results ({results.length})</p>
          {results.map((r, i) => (
            <div key={i} className="glass-card p-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-2"><span className={`badge ${r.type === 'local' ? 'badge-green' : r.type === 'error' ? 'badge-red' : 'badge-blue'}`}>{r.type}</span><span className="text-xs font-bold">{r.model}</span></div>
              <p className="text-[12px] text-slate-400 leading-relaxed">{r.response}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function KnowledgeView({ docs, search, onSearch, results }) {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/10 border border-purple-500/20 flex items-center justify-center"><I.Database className="w-5 h-5 text-purple-400" /></div>
        <div className="flex-1"><h2 className="text-lg font-bold">Offline Knowledge Base</h2><p className="text-[10px] text-slate-500">All documents stored locally</p></div>
        <span className="badge badge-purple">{docs.length} docs</span>
      </div>
      <div className="relative mb-4"><I.Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" /><input className="glass-input w-full pl-9 pr-3 py-2 text-xs" value={search} onChange={e => onSearch(e.target.value)} placeholder="Search knowledge base..." /></div>
      {results.length > 0 && (
        <div className="mb-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">Search Results ({results.length})</p>
          {results.map(r => (
            <div key={r.id} className="glass-card p-3 mb-2 animate-fade-in">
              <div className="flex items-center gap-2 mb-1"><span className="text-xs font-bold">{r.name}</span><span className="badge badge-muted text-[7px]">score: {r.score}</span></div>
              <p className="text-[10px] text-slate-500">{r.snippet}</p>
            </div>
          ))}
        </div>
      )}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">All Documents ({docs.length})</p>
        {docs.length === 0 ? (
          <div className="glass-card p-6 text-center opacity-50"><I.Database className="w-8 h-8 text-slate-600 mx-auto mb-2" /><p className="text-xs text-slate-500">No documents yet.</p></div>
        ) : docs.map(d => (
          <div key={d.id} className="glass-card p-3 mb-2 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center"><I.FileText className="w-4 h-4 text-purple-400" /></div>
              <div className="flex-1"><span className="text-xs font-bold">{d.name}</span><p className="text-[9px] text-slate-600 font-mono">{d.chars} chars · {d.created_at}</p></div>
              <span className="badge badge-muted text-[7px]">persisted</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LibraryView({ library, search, setSearch, familyFilter, setFamilyFilter, onLoad, onDownload, onDelete, activeModel, confirmDel, setConfirmDel, modelLoading, totalCount }) {
  const installed = library.filter(m => m.installed); const available = library.filter(m => !m.installed)
  return (
    <Fragment>
      <div className="px-4 py-3 border-b border-white/[0.06] bg-white/[0.01]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><I.Book className="w-3.5 h-3.5 text-amber-400" /></div>
          <span className="text-sm font-bold">Model Library</span>
          <span className="badge badge-amber">{totalCount || library.length}</span>
          {installed.length > 0 && <span className="badge badge-green">{installed.length} installed</span>}
        </div>
        <div className="relative mb-2"><I.Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" /><input className="glass-input w-full pl-9 pr-3 py-2 text-xs" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search models..." /></div>
        <div className="flex gap-1 flex-wrap">{FAMILIES_LIST.map(f => <button key={f} onClick={() => setFamilyFilter(f)} className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wide transition-all ${familyFilter === f ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-600 border border-transparent hover:text-slate-400'}`}>{f}</button>)}</div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {installed.length > 0 && <div className="mb-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-500/60 mb-2 font-mono flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Installed ({installed.length})</p>
          {installed.map(m => <div key={m.id} className={`model-card mb-2 ${activeModel === m.id ? 'active' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border border-emerald-500/15 flex items-center justify-center flex-shrink-0"><I.Cpu className="w-5 h-5 text-emerald-400" /></div>
              <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><span className="text-sm font-bold">{m.name}</span>{activeModel === m.id && <span className="badge badge-green">Active</span>}</div><p className="text-[10px] text-slate-500 mt-0.5">{m.disk_mb}MB · {m.ctx >= 1000 ? `${Math.round(m.ctx/1000)}K` : m.ctx} ctx</p></div>
              <div className="flex gap-1.5 flex-shrink-0">
                <button onClick={() => onLoad(m.id)} disabled={activeModel === m.id || modelLoading} className="glass-btn glass-btn-primary text-[10px] px-3 py-1.5">{activeModel === m.id ? <Fragment><I.Check className="w-3 h-3" /> Active</Fragment> : <Fragment><I.Play className="w-3 h-3" /> Load</Fragment>}</button>
                {confirmDel === m.id ? <div className="flex gap-1"><button onClick={() => { onDelete(m.id); setConfirmDel(null) }} className="glass-btn glass-btn-danger text-[9px] px-2 py-1.5">Yes</button><button onClick={() => setConfirmDel(null)} className="glass-btn glass-btn-secondary text-[9px] px-2 py-1.5">No</button></div> : <button onClick={() => setConfirmDel(m.id)} className="glass-btn glass-btn-secondary px-2 py-1.5"><I.Trash className="w-3 h-3" /></button>}
              </div>
            </div>
          </div>)}
        </div>}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-2 font-mono">Available ({available.length})</p>
          {available.map(m => <div key={m.id} className="model-card mb-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0"><I.Cpu className="w-5 h-5 text-slate-600" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2"><span className="text-sm font-bold">{m.name}</span>{m.tags?.includes('recommended') && <I.Star className="w-3 h-3 text-amber-400" />}{m.tags?.includes('new') && <span className="badge badge-green text-[7px]">New</span>}</div>
                <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{m.desc}</p>
                <div className="flex gap-1 mt-1.5 flex-wrap"><span className="badge badge-amber text-[7px]">~{m.size >= 1000 ? `${(m.size/1000).toFixed(1)}GB` : `${m.size}MB`}</span><span className="badge badge-blue text-[7px]">{m.quant}</span><span className="badge badge-muted text-[7px]">{m.ctx >= 1000 ? `${Math.round(m.ctx/1000)}K` : m.ctx} ctx</span><span className="badge badge-muted text-[7px]">{m.params}</span></div>
              </div>
              <div className="flex-shrink-0">{m.downloading ? <div className="text-center w-20"><div className="progress-bar mb-1"><div className="progress-bar-fill" style={{ width:`${m.progress||0}%` }} /></div><span className="text-[10px] text-emerald-400 font-mono font-bold">{m.progress||0}%</span></div> : <button onClick={() => onDownload(m.id)} className="glass-btn glass-btn-primary text-[10px] px-3 py-1.5"><I.Download className="w-3 h-3" /> Install</button>}</div>
            </div>
          </div>)}
        </div>
      </div>
    </Fragment>
  )
}

function EmptyState({ icon: Icon, title, subtitle, action, loading }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 ${loading ? 'bg-emerald-500/10 border border-emerald-500/20 animate-pulse' : 'bg-white/[0.02] border border-white/[0.06]'}`}><Icon className={`w-10 h-10 ${loading ? 'text-emerald-400 animate-spin' : 'text-slate-600'}`} /></div>
      <h3 className="text-lg font-bold text-slate-300 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-xs leading-relaxed">{subtitle}</p>
      {action}
    </div>
  )
}
