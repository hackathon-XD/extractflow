/**
 * ExtractFlow AI — Full NotebookLM-Style Interface
 * Copyright (c) 2025 github.com/al13n-x-v0x | Discord: al13n._.invisible
 * All rights reserved.
 */
import { useState, useEffect, useCallback, useRef, Fragment } from 'react'
const API = '/api'

/* ═══ SVG Icons ═══ */
const Icon = ({ d, size = 18, color = 'currentColor', sw = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
)
const IC = {
  plus: 'M12 5v14M5 12h14', search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', upload: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12',
  file: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6', send: 'M22 2L11 13M22 2l-7 20-4-9-9-4z', trash: 'M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2',
  x: 'M18 6L6 18M6 6l12 12', check: 'M20 6L9 17l-5-5', chevR: 'M9 18l6-6-6-6', chevD: 'M6 9l6 6 6-6',
  mic: 'M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2',
  brain: 'M12 2a7 7 0 00-7 7c0 3 2 5 4 7l3 4 3-4c2-2 4-4 4-7a7 7 0 00-7-7z',
  slide: 'M2 3h20v14H2zM8 21h8M12 17v4', podcast: 'M3 18v-6a9 9 0 0118 0v6M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z',
  mindmap: 'M12 2L2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5', flash: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  chart: 'M18 20V10M12 20V4M6 20v-6', quiz: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11',
  table: 'M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18',
  book: 'M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z',
  summary: 'M4 6h16M4 10h16M4 14h10M4 18h7', globe: 'M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z',
  copy: 'M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-2M16 4h2a2 2 0 012 2v6M8 4a2 2 0 012-2h4a2 2 0 012 2v0M8 4v16',
  settings: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
  paste: 'M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2',
  back: 'M19 12H5M12 19l-7-7 7-7', share: 'M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13',
  video: 'M23 7l-7 5 7 5V7z M14 5H3a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2z',
  report: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  world: 'M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20', zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8',
  key: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4',
  database: 'M12 2C6.48 2 2 4.02 2 6.5V17.5C2 19.98 6.48 22 12 22s10-2.02 10-4.5V6.5C22 4.02 17.52 2 12 2z M2 6.5C2 8.98 6.48 11 12 11s10-2.02 10-4.5 M2 12c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', clock: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2',
  download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
}

const EMOJIS = ['📄','🧠','📚','🔬','💡','🎬','🎵','📊','🗺️','📝','⚡','🎯','🌍','🔮','🎨','📱','💻','🏥','💰','📸']
const COLORS = [
  ['#667eea','#764ba2'], ['#f093fb','#f5576c'], ['#4facfe','#00f2fe'],
  ['#43e97b','#38f9d7'], ['#fa709a','#fee140'], ['#a18cd1','#fbc2eb'],
  ['#fccb90','#d57eeb'], ['#e0c3fc','#8ec5fc'], ['#f5576c','#ff6a88'],
]

/* ═══ Logo ═══ */
function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M32 2L58 17V47L32 62L6 47V17Z" fill="url(#lg1)" stroke="rgba(99,102,241,0.3)" strokeWidth="1"/>
      <path d="M32 10L50 21V43L32 54L14 43V21Z" fill="#1e1f24" stroke="rgba(99,102,241,0.15)"/>
      <path d="M36 18L24 34H32L28 46L40 30H32Z" fill="url(#lg2)"/>
      <defs>
        <linearGradient id="lg1" x1="6" y1="2" x2="58" y2="62"><stop stopColor="rgba(99,102,241,0.2)"/><stop offset="1" stopColor="rgba(168,85,247,0.1)"/></linearGradient>
        <linearGradient id="lg2" x1="24" y1="18" x2="40" y2="46"><stop stopColor="#818cf8"/><stop offset="1" stopColor="#a78bfa"/></linearGradient>
      </defs>
    </svg>
  )
}

/* ═══ Settings Modal ═══ */
function SettingsModal({ onClose }) {
  const [settings, setSettings] = useState(null)
  const [apiKey, setApiKey] = useState('')
  const [provider, setProvider] = useState('openai')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    Promise.all([
      fetch(`${API}/app-info`).then(r => r.ok ? r.json() : {}),
      fetch(`${API}/settings`).then(r => r.ok ? r.json() : {})
    ]).then(([info, prefs]) => setSettings({ ...info, ...prefs })).catch(() => {})
  }, [])

  const saveCloudKey = async () => {
    if (!apiKey.trim()) return
    setSaving(true); setMsg('')
    try {
      const r = await fetch(`${API}/cloud/configure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, api_key: apiKey, model: '' })
      })
      if (r.ok) { setMsg('✅ Saved!'); setApiKey(''); setTimeout(() => setMsg(''), 3000) }
      else { setMsg('❌ Failed to save') }
    } catch (e) { setMsg('❌ ' + e.message) }
    setSaving(false)
  }

  if (!settings) return <div className="modal-overlay" onClick={onClose}><div className="modal" onClick={e => e.stopPropagation()}><p>Loading settings...</p></div></div>

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal settings-modal" onClick={e => e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <h2 style={{fontSize:18,fontWeight:700}}>Settings</h2>
          <button className="icon-btn small" onClick={onClose}><Icon d={IC.x} size={16}/></button>
        </div>

        {/* App Info */}
        <div className="settings-section">
          <h3><Icon d={IC.shield} size={14}/> App Info</h3>
          <div className="settings-row"><span>Version</span><span className="settings-val">{settings.version}</span></div>
          <div className="settings-row"><span>Models available</span><span className="settings-val">{settings.models_count}</span></div>
          <div className="settings-row"><span>Copyright</span><span className="settings-val" style={{fontSize:11}}>al13n-x-v0x</span></div>
        </div>

        {/* Cloud API Keys */}
        <div className="settings-section">
          <h3><Icon d={IC.database} size={14}/> Cloud API Keys</h3>
          <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:12}}>Connect cloud AI providers to unlock more models</p>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
            {['openai','gemini','anthropic','groq','deepseek'].map(p => (
              <button key={p} className={`provider-chip ${provider === p ? 'active' : ''}`} onClick={() => setProvider(p)}>
                {settings.cloud_providers?.find(c => c.provider === p)?.has_key && <span className="key-dot"/>}
                {p}
              </button>
            ))}
          </div>
          <div style={{display:'flex',gap:8}}>
            <input className="settings-input" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder={`${provider} API key...`} type="password"/>
            <button className="btn-confirm" onClick={saveCloudKey} disabled={saving || !apiKey.trim()}>{saving ? '...' : 'Save'}</button>
          </div>
          {msg && <p style={{fontSize:12,marginTop:8,color: msg.startsWith('✅') ? 'var(--green)' : '#ef4444'}}>{msg}</p>}
        </div>

        {/* Connected Providers */}
        <div className="settings-section">
          <h3><Icon d={IC.check} size={14}/> Connected</h3>
          {settings.cloud_providers?.filter(c => c.has_key).length > 0 ? (
            settings.cloud_providers.filter(c => c.has_key).map(c => (
              <div key={c.provider} className="settings-row">
                <span style={{display:'flex',alignItems:'center',gap:6}}><span className="connected-dot"/> {c.provider}</span>
                <span className="settings-val">{c.model || 'default'}</span>
              </div>
            ))
          ) : <p style={{fontSize:12,color:'var(--text-muted)'}}>No cloud providers connected yet</p>}
        </div>

        {/* Footer */}
        <div style={{borderTop:'1px solid var(--border)',paddingTop:12,marginTop:8}}>
          <p style={{fontSize:11,color:'var(--text-faint)',textAlign:'center'}}>Copyright © 2025 github.com/al13n-x-v0x</p>
        </div>
      </div>
    </div>
  )
}

/* ═══ HOME PAGE ═══ */
function HomePage({ notebooks, onSelect, onDelete, refresh }) {
  const [showCreate, setShowCreate] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [search, setSearch] = useState('')
  const [view, setView] = useState('grid')
  const [homeTab, setHomeTab] = useState('all')
  const [sort, setSort] = useState('recent')
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [showSettings, setShowSettings] = useState(false)

  const create = async () => {
    if (!title.trim() || creating) return
    setCreating(true); setCreateError('')
    try {
      const r = await fetch(`${API}/notebooks`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description: desc })
      })
      if (r.ok) {
        const nb = await r.json()
        setTitle(''); setDesc(''); setShowCreate(false)
        await refresh()
        onSelect(nb.id)
      } else { setCreateError('Failed: ' + r.status) }
    } catch (e) { setCreateError('Network error: ' + e.message) }
    setCreating(false)
  }

  let filtered = notebooks.filter(n => !search || n.title.toLowerCase().includes(search.toLowerCase()))
  if (sort === 'recent') filtered.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
  if (sort === 'alpha') filtered.sort((a, b) => a.title.localeCompare(b.title))
  const featured = filtered.slice(0, 3)
  const rest = filtered.slice(3)

  return (
    <div className="home-page">
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      <nav className="home-nav">
        <div className="home-nav-left">
          <Logo size={32} />
          <span className="home-nav-title">ExtractFlow AI</span>
          <span className="home-nav-sub">Notebook</span>
        </div>
        <div className="home-nav-right">
          <button className="btn-settings" onClick={() => setShowSettings(true)}>
            <Icon d={IC.settings} size={14}/> Settings
          </button>
          <span className="pro-badge">PRO</span>
          <div className="avatar">A</div>
        </div>
      </nav>

      <div className="home-toolbar">
        <div className="toolbar-left">
          <div className="view-toggle">
            <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><Icon d={'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z'} size={14}/></button>
            <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><Icon d={'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01'} size={14}/></button>
          </div>
          <div className="sort-dropdown" onClick={() => setSort(s => s === 'recent' ? 'alpha' : 'recent')}>
            <span>{sort === 'recent' ? 'Most recent' : 'A → Z'}</span>
            <Icon d={IC.chevD} size={12}/>
          </div>
        </div>
        <button className="btn-create" onClick={() => setShowCreate(true)}>
          <Icon d={IC.plus} size={14}/> Create new
        </button>
      </div>

      <div className="home-filters">
        {['all','my','discover','collections'].map(t => (
          <button key={t} className={`filter-chip ${homeTab === t ? 'active' : ''}`} onClick={() => setHomeTab(t)}>
            {t === 'all' && 'All'}{t === 'my' && 'My notebooks'}{t === 'discover' && 'Discover'}{t === 'collections' && 'Collections'}
          </button>
        ))}
      </div>

      <div className="home-content">
        <div className="search-bar">
          <Icon d={IC.search} size={16} color="#64748b"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notebooks..."/>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-home">
            <div className="empty-icon">📓</div>
            <h2>{search ? 'No matching notebooks' : 'No notebooks yet'}</h2>
            <p>{search ? 'Try a different search' : 'Create your first notebook to start extracting insights'}</p>
            {!search && <button className="btn-create-large" onClick={() => setShowCreate(true)}><Icon d={IC.plus} size={16}/> Create notebook</button>}
          </div>
        ) : (
          <Fragment>
            {homeTab !== 'my' && featured.length > 0 && (
              <div className="section-row">
                <div className="section-header"><h2>Featured notebooks</h2></div>
                <div className="featured-grid">
                  {featured.map((nb, i) => {
                    const c = COLORS[i % COLORS.length]
                    return (
                      <div key={nb.id} className="notebook-card featured" onClick={() => onSelect(nb.id)}>
                        <div className="card-cover" style={{background:`linear-gradient(135deg,${c[0]},${c[1]})`}}>
                          <div className="card-emoji">{nb.emoji || EMOJIS[i % EMOJIS.length]}</div>
                        </div>
                        <div className="card-body">
                          <h3>{nb.title}</h3>
                          <p className="card-meta">{nb.updatedAt?.slice(0,10)} · {nb.sourceCount || 0} sources</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            <div className="section-row">
              <div className="section-header"><h2>{homeTab === 'my' ? 'My notebooks' : 'Recent notebooks'}</h2></div>
              {view === 'grid' ? (
                <div className="notebooks-grid">
                  {(homeTab === 'my' ? filtered : rest).map((nb, i) => {
                    const c = COLORS[(i+3) % COLORS.length]
                    return (
                      <div key={nb.id} className="notebook-card" onClick={() => onSelect(nb.id)}>
                        <div className="card-cover small" style={{background:`linear-gradient(135deg,${c[0]},${c[1]})`}}>
                          <div className="card-emoji">{nb.emoji || EMOJIS[(i+3) % EMOJIS.length]}</div>
                          <button className="card-menu" onClick={e => {e.stopPropagation(); if(confirm('Delete?')) onDelete(nb.id)}}>⋯</button>
                        </div>
                        <div className="card-body"><h3>{nb.title}</h3><p className="card-meta">{nb.sourceCount || 0} sources</p></div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="notebooks-list">
                  {(homeTab === 'my' ? filtered : rest).map((nb, i) => (
                    <div key={nb.id} className="notebook-row" onClick={() => onSelect(nb.id)}>
                      <div className="row-emoji">{nb.emoji || EMOJIS[i % EMOJIS.length]}</div>
                      <div className="row-info"><h3>{nb.title}</h3><p>{nb.description || 'No description'} · {nb.sourceCount || 0} sources</p></div>
                      <p className="row-date">{nb.updatedAt?.slice(0,10)}</p>
                      <button className="row-delete" onClick={e => {e.stopPropagation(); if(confirm('Delete?')) onDelete(nb.id)}}><Icon d={IC.trash} size={14}/></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>

      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 style={{fontSize:18,fontWeight:700,marginBottom:16}}>New Notebook</h2>
            <div className="modal-field">
              <label>Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Market Research" onKeyDown={e => e.key === 'Enter' && create()} autoFocus/>
            </div>
            <div className="modal-field">
              <label>Description (optional)</label>
              <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="What is this notebook about?" rows={3}/>
            </div>
            {createError && <p style={{color:'#ef4444',fontSize:12,margin:'8px 0 0'}}>{createError}</p>}
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn-confirm" onClick={create} disabled={!title.trim() || creating}>{creating ? 'Creating...' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}

      <footer className="home-footer">
        <p>Copyright © 2025 github.com/al13n-x-v0x · Discord: al13n._.invisible · All rights reserved.</p>
      </footer>
    </div>
  )
}

/* ═══ NOTEBOOK WORKSPACE ═══ */
function NotebookView({ notebook, onBack, refresh }) {
  const [tab, setTab] = useState('sources')
  const [nb, setNb] = useState(notebook)
  const [chat, setChat] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [generating, setGenerating] = useState(false)
  const [genType, setGenType] = useState('')
  const [generated, setGenerated] = useState(null)
  const [showPaste, setShowPaste] = useState(false)
  const [pasteText, setPasteText] = useState('')
  const [pasteName, setPasteName] = useState('')
  const [showAddSources, setShowAddSources] = useState(false)
  const [webSearch, setWebSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchMode, setSearchMode] = useState('fast')
  const [searchResults, setSearchResults] = useState(null)
  const [typing, setTyping] = useState(false)
  const [showChatHistory, setShowChatHistory] = useState(false)
  const [chatSearch, setChatSearch] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [scrapeUrl, setScrapeUrl] = useState('')
  const [scraping, setScraping] = useState(false)
  const chatRef = useRef(null)

  const load = useCallback(async () => {
    const r = await fetch(`${API}/notebooks/${notebook.id}`)
    if (r.ok) { const d = await r.json(); setNb(d); setChat(d.chats || []) }
  }, [notebook.id])

  useEffect(() => { load() }, [load])
  useEffect(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }) }, [chat])

  const handleFiles = async files => {
    for (const f of files) { const fd = new FormData(); fd.append('file', f); await fetch(`${API}/notebooks/${nb.id}/sources/upload`, { method: 'POST', body: fd }) }
    load(); refresh()
  }

  const pasteSource = async () => {
    if (!pasteText.trim()) return
    await fetch(`${API}/notebooks/${nb.id}/sources/paste`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: pasteText, name: pasteName || 'Pasted text' }) })
    setPasteText(''); setPasteName(''); setShowPaste(false); load(); refresh()
  }

  const deleteSource = async sid => {
    await fetch(`${API}/notebooks/${nb.id}/sources/${sid}`, { method: 'DELETE' }); load(); refresh()
  }

  /* ═══ WEB SEARCH ═══ */
  const webSearchSources = async () => {
    if (!webSearch.trim() || searching) return
    setSearching(true); setSearchResults(null)
    try {
      const r = await fetch(`${API}/notebooks/${nb.id}/sources/search`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: webSearch, mode: searchMode })
      })
      const d = await r.json()
      setSearchResults(d)
      load(); refresh()
    } catch (e) { setSearchResults({ count: 0, error: e.message }) }
    setSearching(false)
  }

  const scrapeSingleUrl = async () => {
    if (!scrapeUrl.trim() || scraping) return
    setScraping(true)
    try {
      await fetch(`${API}/notebooks/${nb.id}/sources/scrape`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: scrapeUrl })
      })
      setScrapeUrl(''); load(); refresh()
    } catch (e) { console.error(e) }
    setScraping(false)
  }

  const loadDemo = async () => {
    const demo = `Global Renewable Energy Report 2024\n\nExecutive Summary:\nRenewable energy accounted for 30% of global electricity in 2023. $1.8 trillion invested.\n\nSolar: 1,419 GW globally. China leads at 425 GW. LCOE declined 89% since 2010.\nWind: 906 GW installed. Offshore grew 25% to 75 GW.\nBatteries: 45 GW / 99 GWh. Costs fell 14% to $139/kWh.\nInvestment: Solar $82B, wind $64B, batteries $150B.`
    await fetch(`${API}/notebooks/${nb.id}/sources/paste`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: demo, name: 'Energy Report 2024' })
    }); load(); refresh()
  }

  /* ═══ CHAT ═══ */
  const sendChat = async () => {
    if (!chatInput.trim()) return
    const msg = chatInput; setChatInput(''); setTyping(true)
    setChat(p => [...p, { role: 'user', content: msg, createdAt: new Date().toISOString() }])
    try {
      const r = await fetch(`${API}/notebooks/${nb.id}/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg, guard: true }) })
      const d = await r.json()
      setChat(p => [...p, { role: 'assistant', content: d.response, createdAt: new Date().toISOString() }])
    } catch (e) { setChat(p => [...p, { role: 'assistant', content: 'Error: ' + e.message, createdAt: new Date().toISOString() }]) }
    setTyping(false)
  }

  const clearChat = async () => { if (!confirm('Clear all chat history?')) return; await fetch(`${API}/notebooks/${nb.id}/chats`, { method: 'DELETE' }); setChat([]); load() }

  const exportChat = () => {
    const md = chat.map(m => { const t = m.createdAt ? new Date(m.createdAt).toLocaleString() : ''; const r = m.role === 'user' ? '**You**' : '**ExtractFlow AI**'; return `### ${r} _${t}_\n\n${m.content}` }).join('\n\n---\n\n')
    const blob = new Blob([`# ${nb.title} — Chat History\n\nExported ${new Date().toLocaleString()}\n\n---\n\n${md}`], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${nb.title.replace(/[^a-z0-9]/gi,'_')}_chat.md`; a.click(); URL.revokeObjectURL(url)
  }

  const formatTime = ts => {
    if (!ts) return ''
    const diff = Date.now() - new Date(ts).getTime()
    if (diff < 60000) return 'just now'
    if (diff < 3600000) return Math.floor(diff/60000) + 'm ago'
    if (diff < 86400000) return Math.floor(diff/3600000) + 'h ago'
    return new Date(ts).toLocaleDateString('en-US', {month:'short',day:'numeric'}) + ' ' + new Date(ts).toLocaleTimeString('en-US', {hour:'2-digit',minute:'2-digit'})
  }

  const groupByDate = msgs => {
    const groups = []; let last = ''
    msgs.forEach(m => { const d = m.createdAt ? new Date(m.createdAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}) : 'Today'; if (d !== last) { groups.push({date:d,msgs:[]}); last = d }; groups[groups.length-1].msgs.push(m) })
    return groups
  }

  /* ═══ GENERATE ═══ */
  const generate = async type => {
    setGenerating(true); setGenType(type); setGenerated(null)
    try {
      const r = await fetch(`${API}/notebooks/${nb.id}/generate/${type}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
      const d = await r.json(); setGenerated({ type, data: d }); setTab('studio')
    } catch (e) { setGenerated({ type: 'error', data: { message: e.message } }); setTab('studio') }
    setGenerating(false)
  }

  return (
    <div className="nb-workspace">
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      {/* ═══ Header ═══ */}
      <header className="nb-header">
        <div className="nb-header-left">
          <button className="icon-btn" onClick={onBack}><Icon d={IC.back} size={20}/></button>
          <Logo size={24}/>
          <h1 className="nb-title">{nb.title}</h1>
        </div>
        <div className="nb-header-right">
          <button className="icon-btn toolbar" title="Settings" onClick={() => setShowSettings(true)}><Icon d={IC.settings} size={16}/></button>
          <span className="pro-badge small">PRO</span>
          <div className="avatar small">A</div>
        </div>
      </header>

      {/* ═══ Tabs ═══ */}
      <div className="nb-tabs">
        {[{id:'sources',label:'Sources'},{id:'chat',label:'Chat'},{id:'studio',label:'Studio'}].map(t => (
          <button key={t.id} className={`nb-tab ${tab===t.id?'active':''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      <div className="nb-content">

        {/* ═══ SOURCES TAB ═══ */}
        {tab === 'sources' && (
          <div className="sources-panel">
            <button className="btn-add-sources" onClick={() => setShowAddSources(!showAddSources)}>
              <Icon d={IC.plus} size={16}/> Add sources
            </button>

            {/* ═══ Web Search Bar ═══ */}
            <div className="source-search">
              <div className="source-search-row">
                <Icon d={IC.search} size={16} color="#64748b"/>
                <input value={webSearch} onChange={e => setWebSearch(e.target.value)} placeholder="Search the web for sources..." onKeyDown={e => e.key === 'Enter' && webSearchSources()}/>
                <div className="search-mode-toggle">
                  <button className={`mode-btn ${searchMode==='fast'?'active fast':''}`} onClick={() => setSearchMode('fast')}>
                    <Icon d={IC.zap} size={12}/> Fast Research
                  </button>
                  <button className={`mode-btn ${searchMode==='deep'?'active deep':''}`} onClick={() => setSearchMode('deep')}>
                    <Icon d={IC.brain} size={12}/> Deep Research
                  </button>
                </div>
                <button className="btn-search-go" onClick={webSearchSources} disabled={searching || !webSearch.trim()}>
                  {searching ? <span className="search-spinner"/> : <Icon d={IC.search} size={16}/>}
                </button>
              </div>
              {searchMode === 'deep' && <p className="search-mode-hint">Deep Research scrapes full page content from top results — slower but more comprehensive</p>}
            </div>

            {/* Search Results Status */}
            {searchResults && (
              <div className="search-results-banner">
                <span>✅ Found {searchResults.count} sources from "{searchResults.query}" ({searchResults.mode} mode)</span>
                <button className="icon-btn small" onClick={() => setSearchResults(null)}><Icon d={IC.x} size={14}/></button>
              </div>
            )}

            {/* Source Controls */}
            <div className="source-controls">
              <span className="source-count-label">{nb.sources?.length || 0} source{(nb.sources?.length||0) !== 1 ? 's' : ''}</span>
            </div>

            {/* Source List */}
            <div className="source-list">
              {!nb.sources?.length ? (
                <div className="empty-sources">
                  <div className="empty-sources-icon">📎</div>
                  <p>No sources yet</p>
                  <p className="empty-hint">Search the web, upload files, paste text, or load demo data to get started</p>
                  <div className="empty-actions">
                    <button className="btn-demo" onClick={loadDemo}>Load demo data</button>
                  </div>
                </div>
              ) : nb.sources.map(s => (
                <div key={s.id} className="source-item">
                  <div className="source-icon">
                    {s.type === 'file' ? <Icon d={IC.upload} size={18} color="#ef4444"/> :
                     s.type === 'web' ? <Icon d={IC.globe} size={18} color="#10b981"/> :
                     <Icon d={IC.paste} size={18} color="#818cf8"/>}
                  </div>
                  <div className="source-info">
                    <p className="source-name">{s.name}</p>
                    <p className="source-meta">{s.type} · {s.content?.length || 0} chars{s.url ? ` · ${s.url.slice(0,40)}...` : ''}</p>
                  </div>
                  <button className="icon-btn tiny" title="Delete" onClick={() => deleteSource(s.id)}><Icon d={IC.trash} size={12}/></button>
                </div>
              ))}
            </div>

            <input id="srcInput" type="file" multiple accept=".txt,.csv,.json,.md,.pdf" style={{display:'none'}} onChange={e => handleFiles(e.target.files)}/>

            {/* ═══ Add Sources Popup ═══ */}
            {showAddSources && (
              <div className="add-sources-popup">
                <button className="add-source-option" onClick={() => document.getElementById('srcInput').click()}>
                  <Icon d={IC.upload} size={18} color="#818cf8"/> Upload files
                </button>
                <button className="add-source-option" onClick={() => { setShowPaste(true); setShowAddSources(false) }}>
                  <Icon d={IC.paste} size={18} color="#10b981"/> Paste text
                </button>
                <button className="add-source-option" onClick={() => { loadDemo(); setShowAddSources(false) }}>
                  <Icon d={IC.file} size={18} color="#f59e0b"/> Load demo data
                </button>
                <button className="add-source-option" onClick={() => setShowAddSources(false)}>
                  <Icon d={IC.globe} size={18} color="#06b6d4"/> Use search above
                </button>
              </div>
            )}

            {/* ═══ Paste Modal ═══ */}
            {showPaste && (
              <div className="modal-overlay" onClick={() => setShowPaste(false)}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                  <h2 style={{fontSize:18,fontWeight:700,marginBottom:16}}>Paste text</h2>
                  <div className="modal-field">
                    <label>Source name</label>
                    <input value={pasteName} onChange={e => setPasteName(e.target.value)} placeholder="e.g. Article about AI"/>
                  </div>
                  <div className="modal-field">
                    <label>Content</label>
                    <textarea value={pasteText} onChange={e => setPasteText(e.target.value)} placeholder="Paste your text content here..." rows={8} style={{minHeight:150}}/>
                  </div>
                  <div className="modal-actions">
                    <button className="btn-cancel" onClick={() => setShowPaste(false)}>Cancel</button>
                    <button className="btn-confirm" onClick={pasteSource} disabled={!pasteText.trim()}>Add source</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ CHAT TAB ═══ */}
        {tab === 'chat' && (
          <div className="chat-panel">
            <div className="chat-header">
              <div className="chat-header-left">
                <div className="chat-notebook-info">
                  <h2>{nb.title}</h2>
                  <p>{nb.sources?.length || 0} source{(nb.sources?.length||0) !== 1 ? 's' : ''} · {chat.length} messages</p>
                </div>
              </div>
              <div className="chat-header-actions">
                <button className="btn-chat-action" onClick={() => setShowChatHistory(!showChatHistory)}><Icon d={IC.clock} size={14}/> History</button>
                <button className="btn-chat-action" onClick={exportChat} disabled={chat.length === 0}><Icon d={IC.download} size={14}/> Export</button>
                <button className="btn-chat-action danger" onClick={clearChat} disabled={chat.length === 0}><Icon d={IC.trash} size={14}/> Clear</button>
              </div>
            </div>

            {/* History Sidebar */}
            {showChatHistory && (
              <div className="chat-history-sidebar">
                <div className="history-header"><h3>Chat History</h3><button className="icon-btn small" onClick={() => setShowChatHistory(false)}><Icon d={IC.x} size={14}/></button></div>
                <div className="history-search"><Icon d={IC.search} size={14} color="#64748b"/><input value={chatSearch} onChange={e => setChatSearch(e.target.value)} placeholder="Search messages..."/></div>
                <div className="history-list">
                  {chat.length === 0 ? <p className="history-empty">No messages yet</p> : groupByDate(chat).map((g, gi) => (
                    <div key={gi} className="history-group">
                      <p className="history-date">{g.date}</p>
                      {g.msgs.filter(m => !chatSearch || m.content.toLowerCase().includes(chatSearch.toLowerCase())).map((m, mi) => (
                        <div key={mi} className="history-msg">
                          <div className="history-msg-role"><Icon d={m.role==='user' ? 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2' : IC.brain} size={12} color={m.role==='user'?'#818cf8':'#10b981'}/></div>
                          <div className="history-msg-content">
                            <p className="history-msg-text">{m.content.slice(0,80)}{m.content.length>80?'...' :''}</p>
                            <p className="history-msg-time">{formatTime(m.createdAt)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="history-footer"><span>{chat.length} messages total</span></div>
              </div>
            )}

            {/* Empty State */}
            {chat.length === 0 && nb.sources?.length > 0 && !showChatHistory && (
              <div className="chat-summary">
                <div className="summary-icon"><Icon d={IC.book} size={24} color="#818cf8"/></div>
                <h3>Start a conversation</h3>
                <p>Ask questions about your {nb.sources?.length || 0} source{(nb.sources?.length||0) !== 1 ? 's' : ''}</p>
                <div className="suggestion-chips">
                  {['Summarize this document','What are the key findings?','List all statistics'].map(s => (
                    <button key={s} className="suggestion-chip" onClick={() => setChatInput(s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {nb.sources?.length === 0 && chat.length === 0 && !showChatHistory && (
              <div className="chat-summary">
                <div className="summary-icon"><Icon d={IC.upload} size={24} color="#f59e0b"/></div>
                <h3>Add sources first</h3>
                <p>Go to the Sources tab and add documents, paste text, or search the web before chatting</p>
                <button className="suggestion-chip" onClick={() => setTab('sources')}>Go to Sources</button>
              </div>
            )}

            {/* Messages */}
            <div className="chat-messages" ref={chatRef}>
              {!showChatHistory && chat.map((m, i) => (
                <div key={i} className={`chat-msg ${m.role}`}>
                  <div className="msg-avatar">
                    <div className={`avatar-circle ${m.role==='user'?'user':'ai'}`}>{m.role==='user'?'U':<Logo size={16}/>}</div>
                  </div>
                  <div className="msg-content">
                    <div className="msg-meta"><span className="msg-role">{m.role==='user'?'You':'ExtractFlow AI'}</span><span className="msg-time">{formatTime(m.createdAt)}</span></div>
                    <div className="msg-bubble"><p>{m.content}</p></div>
                    {m.role==='assistant' && (
                      <div className="msg-actions">
                        <button className="msg-action-btn" onClick={() => navigator.clipboard.writeText(m.content)} title="Copy"><Icon d={IC.copy} size={12}/></button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="chat-msg assistant">
                  <div className="msg-avatar"><div className="avatar-circle ai"><Logo size={16}/></div></div>
                  <div className="msg-content"><div className="msg-meta"><span className="msg-role">ExtractFlow AI</span></div><div className="msg-bubble typing"><div className="typing-dots"><span></span><span></span><span></span></div></div></div>
                </div>
              )}
            </div>

            {/* Input */}
            {!showChatHistory && (
              <div className="chat-input-bar">
                <div className="chat-input-wrap">
                  <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key==='Enter' && !e.shiftKey && sendChat()} placeholder="Ask a question or create something"/>
                  <span className="source-count-badge">{nb.sources?.length || 0} source{(nb.sources?.length||0) !== 1 ? 's' : ''}</span>
                  <button className="btn-send" onClick={sendChat} disabled={!chatInput.trim() || typing}><Icon d={IC.send} size={18}/></button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ STUDIO TAB ═══ */}
        {tab === 'studio' && (
          <div className="studio-panel">
            {generating ? (
              <div className="studio-loading"><div className="spinner"/><p>Generating {genType}...</p></div>
            ) : generated ? (
              <div className="studio-result">
                <div className="result-header">
                  <h2>Generated {generated.type}</h2>
                  <button className="btn-back-studio" onClick={() => setGenerated(null)}>Back to Studio</button>
                </div>
                <GeneratedOutput data={generated}/>
              </div>
            ) : (
              <Fragment>
                <div className="studio-grid">
                  {[
                    {type:'podcast',label:'Audio Overview',icon:IC.podcast,color:'#8b5cf6'},
                    {type:'slides',label:'Slide Deck',icon:IC.slide,color:'#6366f1'},
                    {type:'video',label:'Video Overview',icon:IC.video,color:'#06b6d4'},
                    {type:'mindmap',label:'Mind Map',icon:IC.mindmap,color:'#10b981'},
                    {type:'summary',label:'Reports',icon:IC.report,color:'#f59e0b'},
                    {type:'flashcards',label:'Flashcards',icon:IC.flash,color:'#ec4899'},
                    {type:'quiz',label:'Quiz',icon:IC.quiz,color:'#ef4444'},
                    {type:'infographic',label:'Infographic',icon:IC.chart,color:'#a855f7'},
                    {type:'datatable',label:'Data Table',icon:IC.table,color:'#14b8a6'},
                  ].map(g => (
                    <button key={g.type} className="studio-card" onClick={() => generate(g.type)}>
                      <div className="studio-card-icon" style={{background:g.color+'18',color:g.color}}><Icon d={g.icon} size={18}/></div>
                      <span className="studio-card-label">{g.label}</span>
                      <Icon d={IC.chevR} size={16} color="#475569"/>
                    </button>
                  ))}
                </div>
                {!nb.sources?.length && <p className="studio-hint">Add sources first to generate content</p>}
              </Fragment>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══ GENERATED OUTPUT — REAL VISUALS ═══ */
function GeneratedOutput({ data }) {
  const d = data.data || data

  if (data.type === 'error') return (
    <div className="output-error" style={{textAlign:'center',padding:40}}>
      <p style={{fontSize:40,marginBottom:12}}>❌</p>
      <p style={{fontSize:16,fontWeight:600,marginBottom:8}}>Generation failed</p>
      <p style={{color:'var(--text-muted)',fontSize:13}}>{d.message || 'Make sure you have sources added.'}</p>
    </div>
  )

  /* ═══ SLIDES — real presentation ═══ */
  if (data.type === 'slides' && data.html) {
    return (
      <div className="output-visual">
        <iframe srcDoc={data.html} style={{width:'100%',height:'70vh',border:'none',borderRadius:'var(--radius)',background:'#0a0e1a'}} title="Presentation"/>
        <div className="output-actions">
          <button className="btn-export" onClick={() => {const b=new Blob([data.html],{type:'text/html'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download='presentation.html';a.click()}}>
            <Icon d={IC.download} size={14}/> Download HTML
          </button>
        </div>
      </div>
    )
  }

  /* ═══ MIND MAP — real visual tree ═══ */
  if (data.type === 'mindmap' && data.html) {
    return (
      <div className="output-visual">
        <iframe srcDoc={data.html} style={{width:'100%',height:'70vh',border:'none',borderRadius:'var(--radius)',background:'#06080f'}} title="Mind Map"/>
        <div className="output-actions">
          <button className="btn-export" onClick={() => {const b=new Blob([data.html],{type:'text/html'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download='mindmap.html';a.click()}}>
            <Icon d={IC.download} size={14}/> Download HTML
          </button>
        </div>
      </div>
    )
  }

  /* ═══ INFOGRAPHIC — real visual ═══ */
  if (data.type === 'infographic' && data.html) {
    return (
      <div className="output-visual">
        <iframe srcDoc={data.html} style={{width:'100%',height:'80vh',border:'none',borderRadius:'var(--radius)',background:'#06080f'}} title="Infographic"/>
        <div className="output-actions">
          <button className="btn-export" onClick={() => {const b=new Blob([data.html],{type:'text/html'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download='infographic.html';a.click()}}>
            <Icon d={IC.download} size={14}/> Download HTML
          </button>
        </div>
      </div>
    )
  }

  /* ═══ PODCAST — real playable audio ═══ */
  if (data.type === 'podcast') {
    const script = data.script || data.data || []
    return <PodcastPlayer script={script}/>
  }

  /* ═══ VIDEO — slides + audio ═══ */
  if (data.type === 'video') {
    const slides = data.slides || data.data?.slides || []
    const script = data.script || data.data?.script || []
    return <VideoPlayer slides={slides} script={script}/>
  }

  /* ═══ FLASHCARDS — real flip cards ═══ */
  if (data.type === 'flashcards') {
    const cards = d.cards || d.data?.cards || []
    return <FlashcardDeck cards={cards}/>
  }

  /* ═══ QUIZ — interactive quiz ═══ */
  if (data.type === 'quiz') {
    const qs = d.questions || d.data?.questions || []
    return <QuizGame questions={qs}/>
  }

  /* ═══ SUMMARY — rich report ═══ */
  if (data.type === 'summary') {
    return (
      <div className="output-report">
        <div className="report-hero">
          <h1>{d.title || 'Report'}</h1>
          <div className="report-stats">
            {d.wordCount && <div className="report-stat"><span className="stat-val">{d.wordCount.toLocaleString()}</span><span className="stat-label">Words</span></div>}
            {d.keyPoints?.length && <div className="report-stat"><span className="stat-val">{d.keyPoints.length}</span><span className="stat-label">Key Points</span></div>}
            {d.topics?.length && <div className="report-stat"><span className="stat-val">{d.topics.length}</span><span className="stat-label">Topics</span></div>}
          </div>
        </div>
        {d.topics?.length > 0 && (
          <div className="report-section">
            <h2>Topics</h2>
            <div className="topic-tags">{d.topics.map((t,i) => <span key={i} className="topic-tag">{t}</span>)}</div>
          </div>
        )}
        {d.keyPoints?.length > 0 && (
          <div className="report-section">
            <h2>Key Findings</h2>
            {d.keyPoints.map((p,i) => (
              <div key={i} className="finding-card">
                <span className="finding-num">{i+1}</span>
                <p>{p}</p>
              </div>
            ))}
          </div>
        )}
        {d.sections?.length > 0 && (
          <div className="report-section">
            <h2>Source Content</h2>
            {d.sections.map((s,i) => (
              <p key={i} className="source-excerpt">{s.slice(0,300)}{s.length>300?'...':''}</p>
            ))}
          </div>
        )}
      </div>
    )
  }

  /* ═══ DATA TABLE — real table ═══ */
  if (data.type === 'datatable') {
    const headers = d.headers || []
    const rows = d.rows || []
    return (
      <div className="output-table-wrap">
        <table className="output-table">
          <thead><tr>{headers.map((h,i) => <th key={i}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r,i) => <tr key={i}>{r.map((c,j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    )
  }

  return <pre className="output-raw" style={{padding:20,background:'var(--bg-card)',borderRadius:'var(--radius)',fontSize:12,maxHeight:400,overflow:'auto'}}>{JSON.stringify(d,null,2)}</pre>
}

/* ═══ PODCAST PLAYER — real TTS audio ═══ */
function PodcastPlayer({ script }) {
  const [playing, setPlaying] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState(0)
  const utterRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const loadVoices = () => { const v = speechSynthesis.getVoices().filter(v => v.lang.startsWith('en')); setVoices(v) }
    loadVoices()
    speechSynthesis.onvoiceschanged = loadVoices
    return () => { speechSynthesis.cancel(); clearInterval(timerRef.current) }
  }, [])

  const playFrom = (idx) => {
    speechSynthesis.cancel()
    setCurrentIdx(idx); setPlaying(true)
    const item = script[idx]
    if (!item) { setPlaying(false); return }
    const utter = new SpeechSynthesisUtterance(item.text)
    utter.voice = voices[selectedVoice] || null
    utter.rate = 0.95
    utter.pitch = item.speaker === 'host' ? 1.0 : 0.85
    utter.onend = () => {
      if (idx < script.length - 1) {
        setCurrentIdx(idx + 1)
        setTimeout(() => playFrom(idx + 1), 300)
      } else { setPlaying(false); setProgress(100) }
    }
    utter.onerror = () => { setPlaying(false) }
    utterRef.current = utter
    speechSynthesis.speak(utter)
    setProgress(Math.round((idx / script.length) * 100))
  }

  const togglePlay = () => {
    if (playing) { speechSynthesis.cancel(); setPlaying(false) }
    else { playFrom(currentIdx) }
  }

  const stop = () => { speechSynthesis.cancel(); setPlaying(false); setCurrentIdx(0); setProgress(0) }

  return (
    <div className="podcast-player">
      <div className="podcast-hero">
        <div className="podcast-icon"><Icon d={IC.podcast} size={32} color="#8b5cf6"/></div>
        <h2>Audio Overview</h2>
        <p>{script.length} lines · {Math.round(script.reduce((a,s) => a + s.text.split(' ').length, 0) / 150)} min</p>
      </div>
      <div className="podcast-controls">
        <button className="podcast-btn" onClick={stop}><Icon d={'M3 6h18M3 6v12a2 2 0 002 2h10a2 2 0 002-2V6'} size={18}/></button>
        <button className="podcast-btn play" onClick={togglePlay}>{playing ? <Icon d={'M6 4h4v16H6zM14 4h4v16h-4z'} size={24}/> : <Icon d={'M5 3l14 9-14 9V3z'} size={24}/>}</button>
        <div className="podcast-progress"><div className="progress-bar" style={{width:progress+'%'}}/></div>
      </div>
      {voices.length > 1 && (
        <div className="voice-select">
          <label>Voice:</label>
          <select value={selectedVoice} onChange={e => setSelectedVoice(Number(e.target.value))}>
            {voices.map((v,i) => <option key={i} value={i}>{v.name}</option>)}
          </select>
        </div>
      )}
      <div className="podcast-script">
        {script.map((line, i) => (
          <div key={i} className={`script-line ${i === currentIdx ? 'active' : ''} ${line.speaker}`} onClick={() => { speechSynthesis.cancel(); playFrom(i) }}>
            <div className="speaker-badge">{line.speaker === 'host' ? '🎙️' : '🎤'} {line.speaker}</div>
            <p>{line.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══ VIDEO PLAYER — slides + audio ═══ */
function VideoPlayer({ slides, script }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [voiceIdx, setVoiceIdx] = useState(0)
  const [voices, setVoices] = useState([])
  const linesPerSlide = Math.ceil(script.length / Math.max(slides.length, 1))
  const currentScriptLines = script.slice(currentSlide * linesPerSlide, (currentSlide + 1) * linesPerSlide)
  const s = slides[currentSlide]

  useEffect(() => {
    const v = speechSynthesis.getVoices().filter(v => v.lang.startsWith('en')); setVoices(v)
    speechSynthesis.onvoiceschanged = () => setVoices(speechSynthesis.getVoices().filter(v => v.lang.startsWith('en')))
    return () => { speechSynthesis.cancel() }
  }, [])

  const playFromSlide = (idx) => {
    speechSynthesis.cancel(); setCurrentSlide(idx); setPlaying(true)
    const lines = script.slice(idx * linesPerSlide, (idx + 1) * linesPerSlide)
    let i = 0
    const speakNext = () => {
      if (i >= lines.length || !playing) { if (idx < slides.length - 1) setTimeout(() => playFromSlide(idx + 1), 500); else setPlaying(false); return }
      const utter = new SpeechSynthesisUtterance(lines[i].text)
      utter.voice = speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'))[voiceIdx] || null
      utter.rate = 0.95
      utter.onend = () => { i++; speakNext() }
      speechSynthesis.speak(utter)
    }
    speakNext()
  }

  const togglePlay = () => {
    if (playing) { speechSynthesis.cancel(); setPlaying(false) }
    else playFromSlide(currentSlide)
  }

  if (!s) return null
  return (
    <div className="video-player">
      <div className="video-screen" style={{borderTop:`4px solid ${s.accent || '#10b981'}`}}>
        {s.type === 'title' ? (
          <div className="video-title-slide">
            <h1 style={{background:`linear-gradient(135deg,${s.accent},#fff)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontSize:'2.5rem',fontWeight:800}}>{s.title}</h1>
            <p style={{color:'#64748b',fontSize:'1.2rem',marginTop:12}}>{s.subtitle || ''}</p>
          </div>
        ) : (
          <div className="video-content-slide">
            <h2 style={{color:s.accent,fontSize:'1.6rem',fontWeight:700,marginBottom:20}}>{s.title}</h2>
            {(s.bullets || s.items || []).map((b,i) => <p key={i} style={{fontSize:'1.1rem',color:'#94a3b8',lineHeight:2}}>• {b}</p>)}
          </div>
        )}
      </div>
      <div className="video-controls">
        <button className="podcast-btn" onClick={() => {speechSynthesis.cancel();setPlaying(false);setCurrentSlide(p=>Math.max(0,p-1))}} disabled={currentSlide===0}>←</button>
        <button className="podcast-btn play" onClick={togglePlay}>{playing ? <Icon d={'M6 4h4v16H6zM14 4h4v16h-4z'} size={20}/> : <Icon d={'M5 3l14 9-14 9V3z'} size={20}/>}</button>
        <button className="podcast-btn" onClick={() => {speechSynthesis.cancel();setPlaying(false);setCurrentSlide(p=>Math.min(slides.length-1,p+1))}} disabled={currentSlide>=slides.length-1}>→</button>
        <span style={{color:'var(--text-muted)',fontSize:12,marginLeft:8}}>{currentSlide+1}/{slides.length}</span>
      </div>
    </div>
  )
}

/* ═══ FLASHCARD DECK — real flip cards ═══ */
function FlashcardDeck({ cards }) {
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [mastered, setMastered] = useState([])
  const card = cards[idx]
  if (!card) return <p style={{color:'var(--text-muted)',textAlign:'center',padding:40}}>No flashcards generated</p>
  return (
    <div className="flashcard-deck">
      <div className="flashcard-progress-bar"><div className="fill" style={{width: ((idx+1)/cards.length*100)+'%'}}/></div>
      <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
        <div className={`flashcard-3d ${flipped ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <span className="card-label">QUESTION</span>
            <p className="card-text">{card.q}</p>
            <span className="card-hint">Click to reveal answer</span>
          </div>
          <div className="flashcard-back">
            <span className="card-label">ANSWER</span>
            <p className="card-text">{card.a}</p>
          </div>
        </div>
      </div>
      <div className="flashcard-nav">
        <button onClick={() => {setIdx(p=>Math.max(0,p-1));setFlipped(false)}} disabled={idx===0}>← Previous</button>
        <span>{idx+1} / {cards.length}</span>
        <button onClick={() => {setIdx(p=>Math.min(cards.length-1,p+1));setFlipped(false)}} disabled={idx>=cards.length-1}>Next →</button>
      </div>
    </div>
  )
}

/* ═══ QUIZ GAME — interactive quiz ═══ */
function QuizGame({ questions }) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const q = questions[current]
  const answered = answers[current] !== undefined
  const score = questions.filter((q,i) => answers[i] === q.answer).length

  if (!q) return null
  return (
    <div className="quiz-game">
      <div className="quiz-progress"><div className="fill" style={{width:((current+1)/questions.length*100)+'%'}}/></div>
      <div className="quiz-card">
        <p className="quiz-q-num">Question {current+1} of {questions.length}</p>
        <p className="quiz-question-text">{q.question}</p>
        <div className="quiz-options-grid">
          {q.options?.map((o,j) => (
            <button key={j} className={`quiz-option-btn ${answered ? (j===q.answer?'correct':(answers[current]===j?'wrong':'')) : ''}`} onClick={() => {if(!answered) setAnswers(p=>({...p,[current]:j}))}} disabled={answered}>
              <span className="option-letter">{String.fromCharCode(65+j)}</span>
              <span>{o}</span>
            </button>
          ))}
        </div>
        {answered && (
          <button className="quiz-next" onClick={() => {if(current < questions.length-1) setCurrent(p=>p+1); else setShowResult(true)}}>
            {current < questions.length-1 ? 'Next Question →' : 'See Results'}
          </button>
        )}
      </div>
      {showResult && (
        <div className="quiz-result">
          <div className="score-circle">
            <span className="score-num">{score}/{questions.length}</span>
            <span className="score-pct">{Math.round(score/questions.length*100)}%</span>
          </div>
          <p className="score-label">{score === questions.length ? 'Perfect!' : score >= questions.length/2 ? 'Good job!' : 'Keep studying!'}</p>
          <button className="quiz-retry" onClick={() => {setAnswers({});setCurrent(0);setShowResult(false)}}>Try Again</button>
        </div>
      )}
    </div>
  )
}

/* ═══ MAIN APP ═══ */
export default function App() {
  const [notebooks, setNotebooks] = useState([])
  const [selected, setSelected] = useState(null)

  const refresh = useCallback(async () => {
    try { const r = await fetch(`${API}/notebooks`); if (r.ok) setNotebooks(await r.json()) } catch (e) {}
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const deleteNotebook = useCallback(async id => {
    await fetch(`${API}/notebooks/${id}`, { method: 'DELETE' }); if (selected === id) setSelected(null); refresh()
  }, [selected, refresh])

  const currentNotebook = notebooks.find(n => n.id === selected)
  if (selected && currentNotebook) return <NotebookView notebook={currentNotebook} onBack={() => setSelected(null)} refresh={refresh}/>
  return <HomePage notebooks={notebooks} onSelect={setSelected} onDelete={deleteNotebook} refresh={refresh}/>
}
