/**
 * ExtractFlow AI — NotebookLM-Style Interface
 * Copyright (c) 2025 github.com/al13n-x-v0x | Discord: al13n._.invisible
 * All rights reserved. Unauthorized reproduction is prohibited.
 */
import { useState, useEffect, useCallback, useRef, Fragment } from 'react'
const API = '/api'

/* ═══ Icons ═══ */
const I = {
  plus: 'M12 5v14M5 12h14',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  upload: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12',
  file: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4z',
  trash: 'M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2',
  x: 'M18 6L6 18M6 6l12 12',
  check: 'M20 6L9 17l-5-5',
  chevronR: 'M9 18l6-6-6-6',
  chevronD: 'M6 9l6 6 6-6',
  mic: 'M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2',
  volume: 'M11 5L6 9H2v6h4l5 4zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07',
  brain: 'M12 2a7 7 0 00-7 7c0 3 2 5 4 7l3 4 3-4c2-2 4-4 4-7a7 7 0 00-7-7z',
  slide: 'M2 3h20v14H2zM8 21h8M12 17v4',
  podcast: 'M3 18v-6a9 9 0 0118 0v6M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z',
  mindmap: 'M12 2L2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  flash: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  chart: 'M18 20V10M12 20V4M6 20v-6',
  quiz: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11',
  table: 'M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18',
  book: 'M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z',
  summary: 'M4 6h16M4 10h16M4 14h10M4 18h7',
  globe: 'M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z',
  copy: 'M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-2M16 4h2a2 2 0 012 2v6M8 4a2 2 0 012-2h4a2 2 0 012 2v0M8 4v16',
  settings: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
  paste: 'M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  share: 'M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13',
  video: 'M23 7l-7 5 7 5V7z M14 5H3a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2z',
  report: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  back: 'M19 12H5M12 19l-7-7 7-7',
  duplicate: 'M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-2M16 4h2a2 2 0 012 2v6',
  analytics: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 12l2 2 4-4',
  web: 'M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z',
}

const EMOJIS = ['📄','🧠','📚','🔬','💡','🎬','🎵','📊','🗺️','📝','⚡','🎯','🌍','🔮','🎨','📱','💻','🔬','🏥','💰','🎵','📸']

const COVER_COLORS = [
  ['#667eea','#764ba2'], ['#f093fb','#f5576c'], ['#4facfe','#00f2fe'],
  ['#43e97b','#38f9d7'], ['#fa709a','#fee140'], ['#a18cd1','#fbc2eb'],
  ['#fccb90','#d57eeb'], ['#e0c3fc','#8ec5fc'], ['#f5576c','#ff6a88'],
]

/* ═══ Logo SVG ═══ */
function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M32 2L58 17V47L32 62L6 47V17Z" fill="url(#lglg)" stroke="rgba(99,102,241,0.3)" strokeWidth="1"/>
      <path d="M32 10L50 21V43L32 54L14 43V21Z" fill="#1e1f24" stroke="rgba(99,102,241,0.15)"/>
      <path d="M36 18L24 34H32L28 46L40 30H32Z" fill="url(#blg)"/>
      <defs>
        <linearGradient id="lglg" x1="6" y1="2" x2="58" y2="62">
          <stop stopColor="rgba(99,102,241,0.2)"/><stop offset="1" stopColor="rgba(168,85,247,0.1)"/>
        </linearGradient>
        <linearGradient id="blg" x1="24" y1="18" x2="40" y2="46">
          <stop stopColor="#818cf8"/><stop offset="1" stopColor="#a78bfa"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ═══ HOME PAGE ═══ */
function HomePage({ notebooks, onSelect, onDelete }) {
  const [showCreate, setShowCreate] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [search, setSearch] = useState('')
  const [view, setView] = useState('grid')
  const [homeTab, setHomeTab] = useState('all')
  const [sort, setSort] = useState('recent')

  const create = async () => {
    if (!title.trim()) return
    const r = await fetch(`${API}/notebooks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description: desc })
    })
    if (r.ok) {
      const nb = await r.json()
      setTitle(''); setDesc(''); setShowCreate(false)
      onSelect(nb.id)
    }
  }

  let filtered = notebooks.filter(n => !search || n.title.toLowerCase().includes(search.toLowerCase()))
  if (sort === 'recent') filtered.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
  if (sort === 'alpha') filtered.sort((a, b) => a.title.localeCompare(b.title))

  const featured = filtered.slice(0, 3)
  const recent = filtered.slice(3)

  return (
    <div className="home-page">
      {/* ═══ Navbar ═══ */}
      <nav className="home-nav">
        <div className="home-nav-left">
          <Logo size={32} />
          <span className="home-nav-title">ExtractFlow AI</span>
          <span className="home-nav-sub">Notebook</span>
        </div>
        <div className="home-nav-right">
          <button className="btn-settings">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            Settings
          </button>
          <span className="pro-badge">PRO</span>
          <div className="avatar">A</div>
        </div>
      </nav>

      {/* ═══ Toolbar ═══ */}
      <div className="home-toolbar">
        <div className="toolbar-left">
          <button className="icon-btn" style={{color: '#818cf8'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg></button>
          <div className="view-toggle">
            <button className={view === 'check' ? 'active' : ''} onClick={() => setView('check')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
            </button>
            <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/></svg>
            </button>
            <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
            </button>
          </div>
          <div className="sort-dropdown" onClick={() => setSort(s => s === 'recent' ? 'alpha' : 'recent')}>
            <span>{sort === 'recent' ? 'Most recent' : 'A → Z'}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>
        <button className="btn-create" onClick={() => setShowCreate(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          Create new
        </button>
      </div>

      {/* ═══ Filter Tabs ═══ */}
      <div className="home-filters">
        {['all', 'my', 'discover', 'collections'].map(t => (
          <button key={t} className={`filter-chip ${homeTab === t ? 'active' : ''}`} onClick={() => setHomeTab(t)}>
            {t === 'all' && 'All'}
            {t === 'my' && 'My notebooks'}
            {t === 'discover' && <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/></svg> Discover</>}
            {t === 'collections' && 'Collections'}
          </button>
        ))}
      </div>

      <div className="home-content">
        {/* ═══ Search ═══ */}
        <div className="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notebooks..." />
        </div>

        {/* ═══ Empty State ═══ */}
        {filtered.length === 0 ? (
          <div className="empty-home">
            <div className="empty-icon">📓</div>
            <h2>{search ? 'No matching notebooks' : 'No notebooks yet'}</h2>
            <p>{search ? 'Try a different search term' : 'Create your first notebook to start extracting insights'}</p>
            {!search && (
              <button className="btn-create-large" onClick={() => setShowCreate(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                Create notebook
              </button>
            )}
          </div>
        ) : (
          <Fragment>
            {/* ═══ Featured Notebooks ═══ */}
            {homeTab !== 'my' && featured.length > 0 && (
              <div className="section-row">
                <div className="section-header">
                  <h2>Featured notebooks</h2>
                  <button className="btn-view-all">View all <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></button>
                </div>
                <div className="featured-grid">
                  {featured.map((nb, i) => {
                    const colors = COVER_COLORS[i % COVER_COLORS.length]
                    return (
                      <div key={nb.id} className="notebook-card featured" onClick={() => onSelect(nb.id)}>
                        <div className="card-cover" style={{background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`}}>
                          <div className="card-emoji">{nb.emoji || EMOJIS[i % EMOJIS.length]}</div>
                          <div className="card-globe">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/></svg>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="card-source-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6"/></svg>
                          </div>
                          <h3>{nb.title}</h3>
                          <p className="card-meta">{nb.updatedAt?.slice(0, 10)} · {nb.sourceCount || 0} sources</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ═══ Recent Notebooks ═══ */}
            {recent.length > 0 && (
              <div className="section-row">
                <div className="section-header">
                  <h2>Recent notebooks</h2>
                </div>
                {view === 'grid' ? (
                  <div className="notebooks-grid">
                    {(homeTab === 'my' ? filtered : recent).map((nb, i) => {
                      const colors = COVER_COLORS[(i + 3) % COVER_COLORS.length]
                      return (
                        <div key={nb.id} className="notebook-card" onClick={() => onSelect(nb.id)}>
                          <div className="card-cover small" style={{background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`}}>
                            <div className="card-emoji">{nb.emoji || EMOJIS[(i + 3) % EMOJIS.length]}</div>
                            <button className="card-menu" onClick={e => {e.stopPropagation(); if(confirm('Delete notebook?')) onDelete(nb.id)}}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                            </button>
                          </div>
                          <div className="card-body">
                            <h3>{nb.title}</h3>
                            <p className="card-meta">{nb.sourceCount || 0} sources</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="notebooks-list">
                    {(homeTab === 'my' ? filtered : recent).map((nb, i) => (
                      <div key={nb.id} className="notebook-row" onClick={() => onSelect(nb.id)}>
                        <div className="row-emoji">{nb.emoji || EMOJIS[i % EMOJIS.length]}</div>
                        <div className="row-info">
                          <h3>{nb.title}</h3>
                          <p>{nb.description || 'No description'} · {nb.sourceCount || 0} sources</p>
                        </div>
                        <p className="row-date">{nb.updatedAt?.slice(0, 10)}</p>
                        <button className="row-delete" onClick={e => {e.stopPropagation(); if(confirm('Delete notebook?')) onDelete(nb.id)}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        )}
      </div>

      {/* ═══ Create Modal ═══ */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>New Notebook</h2>
            <div className="modal-field">
              <label>Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Market Research" onKeyDown={e => e.key === 'Enter' && create()} autoFocus />
            </div>
            <div className="modal-field">
              <label>Description (optional)</label>
              <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="What is this notebook about?" rows={3} />
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn-confirm" onClick={create} disabled={!title.trim()}>Create</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Footer ═══ */}
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
  const [sourceFilter, setSourceFilter] = useState('all')
  const [typing, setTyping] = useState(false)
  const [showChatHistory, setShowChatHistory] = useState(false)
  const [chatSearch, setChatSearch] = useState('')
  const chatRef = useRef(null)

  const load = useCallback(async () => {
    const r = await fetch(`${API}/notebooks/${notebook.id}`)
    if (r.ok) { const d = await r.json(); setNb(d); setChat(d.chats || []) }
  }, [notebook.id])

  useEffect(() => { load() }, [load])
  useEffect(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }) }, [chat])

  const handleFiles = async files => {
    for (const f of files) {
      const fd = new FormData(); fd.append('file', f)
      await fetch(`${API}/notebooks/${nb.id}/sources/upload`, { method: 'POST', body: fd })
    }
    load(); refresh()
  }

  const pasteSource = async () => {
    if (!pasteText.trim()) return
    await fetch(`${API}/notebooks/${nb.id}/sources/paste`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: pasteText, name: pasteName || 'Pasted text' })
    })
    setPasteText(''); setPasteName(''); setShowPaste(false); load(); refresh()
  }

  const deleteSource = async sid => {
    await fetch(`${API}/notebooks/${nb.id}/sources/${sid}`, { method: 'DELETE' })
    load(); refresh()
  }

  const sendChat = async () => {
    if (!chatInput.trim()) return
    const msg = chatInput; setChatInput(''); setTyping(true)
    setChat(p => [...p, { role: 'user', content: msg, createdAt: new Date().toISOString() }])
    try {
      const r = await fetch(`${API}/notebooks/${nb.id}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, guard: true })
      })
      const d = await r.json()
      setChat(p => [...p, { role: 'assistant', content: d.response, createdAt: new Date().toISOString() }])
    } catch (e) {
      setChat(p => [...p, { role: 'assistant', content: 'Error: ' + e.message, createdAt: new Date().toISOString() }])
    }
    setTyping(false)
  }

  const clearChat = async () => {
    if (!confirm('Clear all chat history for this notebook?')) return
    await fetch(`${API}/notebooks/${nb.id}/chats`, { method: 'DELETE' })
    setChat([]); load()
  }

  const exportChat = () => {
    const md = chat.map(m => {
      const time = m.createdAt ? new Date(m.createdAt).toLocaleString() : ''
      const role = m.role === 'user' ? '**You**' : '**ExtractFlow AI**'
      return `### ${role} _${time}_\n\n${m.content}`
    }).join('\n\n---\n\n')
    const blob = new Blob([`# ${nb.title} — Chat History\n\nExported ${new Date().toLocaleString()}\n\n---\n\n${md}`], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `${nb.title.replace(/[^a-z0-9]/gi, '_')}_chat.md`; a.click()
    URL.revokeObjectURL(url)
  }

  const formatTime = ts => {
    if (!ts) return ''
    const d = new Date(ts)
    const now = new Date()
    const diffMs = now - d
    if (diffMs < 60000) return 'just now'
    if (diffMs < 3600000) return Math.floor(diffMs / 60000) + 'm ago'
    if (diffMs < 86400000) return Math.floor(diffMs / 3600000) + 'h ago'
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const groupByDate = msgs => {
    const groups = []
    let lastDate = ''
    msgs.forEach(m => {
      const d = m.createdAt ? new Date(m.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Today'
      if (d !== lastDate) { groups.push({ date: d, msgs: [] }); lastDate = d }
      groups[groups.length - 1].msgs.push(m)
    })
    return groups
  }

  const generate = async type => {
    setGenerating(true); setGenType(type); setGenerated(null)
    try {
      const r = await fetch(`${API}/notebooks/${nb.id}/generate/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      const d = await r.json()
      setGenerated({ type, data: d })
      setTab('studio')
    } catch (e) {
      setGenerated({ type: 'error', data: { message: e.message } })
      setTab('studio')
    }
    setGenerating(false)
  }

  const loadDemo = async () => {
    const demo = `Global Renewable Energy Report 2024\n\nExecutive Summary:\nRenewable energy accounted for 30% of global electricity in 2023. $1.8 trillion invested.\n\nSolar: 1,419 GW globally. China leads at 425 GW. LCOE declined 89% since 2010.\nWind: 906 GW installed. Offshore grew 25% to 75 GW.\nBatteries: 45 GW / 99 GWh. Costs fell 14% to $139/kWh.\nInvestment: Solar $82B, wind $64B, batteries $150B.`
    await fetch(`${API}/notebooks/${nb.id}/sources/paste`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: demo, name: 'Energy Report 2024' })
    })
    load(); refresh()
  }

  return (
    <div className="nb-workspace">
      {/* ═══ Notebook Header ═══ */}
      <header className="nb-header">
        <div className="nb-header-left">
          <button className="icon-btn" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <Logo size={24} />
          <h1 className="nb-title">{nb.title}</h1>
        </div>
        <div className="nb-header-right">
          <button className="btn-create-sm" onClick={() => {}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Create notebook
          </button>
          <button className="icon-btn toolbar" title="Duplicate"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-2M16 4h2a2 2 0 012 2v6M8 4a2 2 0 012-2h4a2 2 0 012 2v0M8 4v16"/></svg></button>
          <button className="icon-btn toolbar" title="Analytics"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg></button>
          <button className="icon-btn toolbar" title="Share"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg></button>
          <button className="icon-btn toolbar" title="Settings"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></button>
          <span className="pro-badge small">PRO</span>
          <div className="avatar small">A</div>
        </div>
      </header>

      {/* ═══ Tabs ═══ */}
      <div className="nb-tabs">
        {[{ id: 'sources', label: 'Sources' }, { id: 'chat', label: 'Chat' }, { id: 'studio', label: 'Studio' }].map(t => (
          <button key={t.id} className={`nb-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══ Content ═══ */}
      <div className="nb-content">

        {/* ═══ SOURCES TAB ═══ */}
        {tab === 'sources' && (
          <div className="sources-panel">
            {/* Add Sources */}
            <button className="btn-add-sources" onClick={() => setShowAddSources(!showAddSources)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              Add sources
            </button>

            {/* Search Bar */}
            <div className="source-search">
              <input value={webSearch} onChange={e => setWebSearch(e.target.value)} placeholder="Search the web for new sources" />
              <div className="source-search-filters">
                <button className="chip-active">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/></svg>
                  Web
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <button className="chip">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  Fast Research
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <button className="search-go">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </button>
              </div>
            </div>

            {/* Source Controls */}
            <div className="source-controls">
              <button className="icon-btn small"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54z"/></svg></button>
              <button className="btn-select-all">
                <span>Select all</span>
                <div className="checkbox"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg></div>
              </button>
            </div>

            {/* Source List */}
            <div className="source-list">
              {!nb.sources?.length ? (
                <div className="empty-sources">
                  <p>No sources yet</p>
                  <button className="btn-demo" onClick={loadDemo}>Load demo data</button>
                </div>
              ) : nb.sources.map(s => (
                <div key={s.id} className="source-item">
                  <div className="source-icon">
                    {s.type === 'file' ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4facfe" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6"/></svg>
                    )}
                  </div>
                  <div className="source-info">
                    <p className="source-name">{s.name}</p>
                    <p className="source-meta">{s.type} · {s.content?.length || 0} chars</p>
                  </div>
                  <div className="source-actions">
                    <button className="icon-btn tiny" title="Edit"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                    <button className="icon-btn tiny" title="Delete" onClick={() => deleteSource(s.id)}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>
                  </div>
                </div>
              ))}
            </div>

            {/* Hidden file input */}
            <input id="srcInput" type="file" multiple accept=".txt,.csv,.json,.md,.pdf" style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />

            {/* Add Sources Popup */}
            {showAddSources && (
              <div className="add-sources-popup">
                <button className="add-source-option" onClick={() => document.getElementById('srcInput').click()}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6"/></svg>
                  Upload files
                </button>
                <button className="add-source-option" onClick={() => { setShowPaste(true); setShowAddSources(false) }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/></svg>
                  Paste text
                </button>
                <button className="add-source-option" onClick={() => { loadDemo(); setShowAddSources(false) }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6"/></svg>
                  Load demo data
                </button>
              </div>
            )}
          </div>
        )}

        {/* ═══ CHAT TAB ═══ */}
        {tab === 'chat' && (
          <div className="chat-panel">
            {/* Chat Header with History + Clear + Export */}
            <div className="chat-header">
              <div className="chat-header-left">
                <div className="chat-notebook-info">
                  <h2>{nb.title}</h2>
                  <p>{nb.sources?.length || 0} source{(nb.sources?.length || 0) !== 1 ? 's' : ''} · {chat.length} messages</p>
                </div>
              </div>
              <div className="chat-header-actions">
                <button className="btn-chat-action" onClick={() => setShowChatHistory(!showChatHistory)} title="Chat History">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  History
                </button>
                <button className="btn-chat-action" onClick={exportChat} title="Export Chat" disabled={chat.length === 0}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  Export
                </button>
                <button className="btn-chat-action danger" onClick={clearChat} title="Clear Chat" disabled={chat.length === 0}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                  Clear
                </button>
              </div>
            </div>

            {/* Chat History Sidebar */}
            {showChatHistory && (
              <div className="chat-history-sidebar">
                <div className="history-header">
                  <h3>Chat History</h3>
                  <button className="icon-btn small" onClick={() => setShowChatHistory(false)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                <div className="history-search">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <input value={chatSearch} onChange={e => setChatSearch(e.target.value)} placeholder="Search messages..." />
                </div>
                <div className="history-list">
                  {chat.length === 0 ? (
                    <p className="history-empty">No messages yet</p>
                  ) : (
                    groupByDate(chat).map((group, gi) => (
                      <div key={gi} className="history-group">
                        <p className="history-date">{group.date}</p>
                        {group.msgs.filter(m => !chatSearch || m.content.toLowerCase().includes(chatSearch.toLowerCase())).map((m, mi) => (
                          <div key={mi} className="history-msg">
                            <div className="history-msg-role">
                              {m.role === 'user' ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                              ) : (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M12 2a7 7 0 00-7 7c0 3 2 5 4 7l3 4 3-4c2-2 4-4 4-7a7 7 0 00-7-7z"/></svg>
                              )}
                            </div>
                            <div className="history-msg-content">
                              <p className="history-msg-text">{m.content.slice(0, 80)}{m.content.length > 80 ? '...' : ''}</p>
                              <p className="history-msg-time">{formatTime(m.createdAt)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
                <div className="history-footer">
                  <span>{chat.length} messages total</span>
                </div>
              </div>
            )}

            {/* Chat Summary */}
            {chat.length === 0 && nb.sources?.length > 0 && !showChatHistory && (
              <div className="chat-summary">
                <div className="summary-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                </div>
                <h3>Start a conversation</h3>
                <p>Ask questions about your {nb.sources?.length || 0} source{(nb.sources?.length || 0) !== 1 ? 's' : ''}. The AI will answer based only on the provided documents.</p>
                <div className="suggestion-chips">
                  <button className="suggestion-chip" onClick={() => { setChatInput('Summarize this document'); }}>Summarize this document</button>
                  <button className="suggestion-chip" onClick={() => { setChatInput('What are the key findings?'); }}>What are the key findings?</button>
                  <button className="suggestion-chip" onClick={() => { setChatInput('List all statistics mentioned'); }}>List all statistics</button>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="chat-messages" ref={chatRef}>
              {!showChatHistory && chat.map((m, i) => (
                <div key={i} className={`chat-msg ${m.role}`}>
                  <div className="msg-avatar">
                    {m.role === 'user' ? (
                      <div className="avatar-circle user">U</div>
                    ) : (
                      <div className="avatar-circle ai"><Logo size={16} /></div>
                    )}
                  </div>
                  <div className="msg-content">
                    <div className="msg-meta">
                      <span className="msg-role">{m.role === 'user' ? 'You' : 'ExtractFlow AI'}</span>
                      <span className="msg-time">{formatTime(m.createdAt)}</span>
                    </div>
                    <div className="msg-bubble">
                      <p>{m.content}</p>
                    </div>
                    {m.role === 'assistant' && (
                      <div className="msg-actions">
                        <button className="msg-action-btn" onClick={() => navigator.clipboard.writeText(m.content)} title="Copy">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-2M16 4h2a2 2 0 012 2v6M8 4a2 2 0 012-2h4a2 2 0 012 2v0"/></svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="chat-msg assistant">
                  <div className="msg-avatar">
                    <div className="avatar-circle ai"><Logo size={16} /></div>
                  </div>
                  <div className="msg-content">
                    <div className="msg-meta">
                      <span className="msg-role">ExtractFlow AI</span>
                    </div>
                    <div className="msg-bubble typing">
                      <div className="typing-dots">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            {!showChatHistory && (
              <div className="chat-input-bar">
                <div className="chat-input-wrap">
                  <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendChat()}
                    placeholder="Ask a question or create something" />
                  <span className="source-count-badge">{nb.sources?.length || 0} source{(nb.sources?.length || 0) !== 1 ? 's' : ''}</span>
                  <button className="btn-send" onClick={sendChat} disabled={!chatInput.trim() || typing}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ STUDIO TAB ═══ */}
        {tab === 'studio' && (
          <div className="studio-panel">
            {/* Language Selector */}
            <div className="language-bar">
              <p>Create an Audio Overview in: </p>
              <div className="language-tags">
                {['हिन्दी', 'বাংলা', 'ગુજરાતી', 'ಕನ್ನಡ', 'മലയാളം', 'मराठी', 'ਪੰਜਾਬੀ', 'தமிழ்', 'తెలుగు'].map(lang => (
                  <span key={lang} className="lang-tag">{lang}</span>
                ))}
              </div>
            </div>

            {/* Generation Cards */}
            {generating ? (
              <div className="studio-loading">
                <div className="spinner" />
                <p>Generating {genType}...</p>
              </div>
            ) : generated ? (
              <div className="studio-result">
                <div className="result-header">
                  <h2>Generated {generated.type}</h2>
                  <button className="btn-back-studio" onClick={() => setGenerated(null)}>Back to Studio</button>
                </div>
                <GeneratedOutput data={generated} />
              </div>
            ) : (
              <Fragment>
                <div className="studio-grid">
                  {[
                    { type: 'podcast', label: 'Audio Overview', icon: I.podcast, color: '#8b5cf6' },
                    { type: 'slides', label: 'Slide Deck', icon: I.slide, color: '#6366f1' },
                    { type: 'video', label: 'Video Overview', icon: I.video, color: '#06b6d4' },
                    { type: 'mindmap', label: 'Mind Map', icon: I.mindmap, color: '#10b981' },
                    { type: 'summary', label: 'Reports', icon: I.report, color: '#f59e0b' },
                    { type: 'flashcards', label: 'Flashcards', icon: I.flash, color: '#ec4899' },
                    { type: 'quiz', label: 'Quiz', icon: I.quiz, color: '#ef4444' },
                    { type: 'infographic', label: 'Infographic', icon: I.chart, color: '#a855f7' },
                    { type: 'datatable', label: 'Data Table', icon: I.table, color: '#14b8a6' },
                  ].map(g => (
                    <button key={g.type} className="studio-card" onClick={() => generate(g.type)}>
                      <div className="studio-card-icon" style={{ background: g.color + '18', color: g.color }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={g.icon}/></svg>
                      </div>
                      <span className="studio-card-label">{g.label}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" className="studio-card-arrow"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  ))}
                </div>

                {!nb.sources?.length && (
                  <p className="studio-hint">Add sources first to generate content</p>
                )}

                {/* Previous Generations */}
                <div className="previous-gen">
                  <div className="prev-gen-item">
                    <div className="prev-gen-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                    </div>
                    <div>
                      <p className="prev-gen-title">Sample Presentation</p>
                      <p className="prev-gen-meta">1 source · 20h ago</p>
                    </div>
                    <button className="icon-btn tiny"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        )}
      </div>

      {/* ═══ Paste Modal ═══ */}
      {showPaste && (
        <div className="modal-overlay" onClick={() => setShowPaste(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Add text source</h2>
            <div className="modal-field">
              <input value={pasteName} onChange={e => setPasteName(e.target.value)} placeholder="Source name (optional)" />
            </div>
            <div className="modal-field">
              <textarea value={pasteText} onChange={e => setPasteText(e.target.value)} placeholder="Paste your text content here..." rows={8} />
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowPaste(false)}>Cancel</button>
              <button className="btn-confirm" onClick={pasteSource} disabled={!pasteText.trim()}>Add Source</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══ Generated Output ═══ */
function GeneratedOutput({ data }) {
  if (!data?.data) return <p className="no-data">No data</p>
  const d = data.data

  if (data.type === 'slides') {
    const slides = d.data || d
    const [cur, setCur] = useState(0)
    const s = Array.isArray(slides) ? slides[cur] : slides
    if (!s) return null
    return (
      <div className="output-slides">
        {s.title && <h3 className="slide-title">{s.title}</h3>}
        {s.subtitle && <p className="slide-subtitle">{s.subtitle}</p>}
        {(s.bullets || s.items || []).map((b, i) => <p key={i} className="slide-bullet">• {b}</p>)}
        {Array.isArray(slides) && slides.length > 1 && (
          <div className="slide-nav">
            <button onClick={() => setCur(p => Math.max(0, p - 1))} disabled={cur === 0} className="btn-slide-nav">← Prev</button>
            <span>{cur + 1}/{slides.length}</span>
            <button onClick={() => setCur(p => Math.min(slides.length - 1, p + 1))} disabled={cur >= slides.length - 1} className="btn-slide-nav">Next →</button>
          </div>
        )}
      </div>
    )
  }

  if (data.type === 'podcast') {
    const script = d.data?.script || d.script || []
    return <div className="output-podcast">{script.map((l, i) => (
      <div key={i} className={`podcast-line ${l.speaker}`}>
        <div className={`speaker-avatar ${l.speaker}`}>{l.speaker === 'host' ? 'H' : 'C'}</div>
        <p>{l.text}</p>
      </div>
    ))}</div>
  }

  if (data.type === 'mindmap') {
    const tree = d.data?.tree || d.tree || d
    return (
      <div className="output-mindmap">
        <div className="mindmap-root">{tree.label}</div>
        <div className="mindmap-children">
          {tree.children?.map((c, i) => (
            <div key={i} className="mindmap-child">
              <p className="child-title">{c.label}</p>
              {c.children?.slice(0, 3).map((l, j) => <p key={j} className="child-item">• {l.label}</p>)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (data.type === 'flashcards') {
    const cards = d.data?.cards || d.cards || []
    const [idx, setIdx] = useState(0)
    const [flipped, setFlipped] = useState(false)
    const card = cards[idx]
    if (!card) return null
    return (
      <div className="output-flashcards">
        <div className="flashcard" onClick={() => setFlipped(!flipped)}>
          <p>{flipped ? card.a : card.q}</p>
        </div>
        <p className="flashcard-hint">{idx + 1}/{cards.length} · Click to flip</p>
        <div className="flashcard-nav">
          <button onClick={() => { setIdx(p => Math.max(0, p - 1)); setFlipped(false) }} disabled={idx === 0}>←</button>
          <button onClick={() => setFlipped(!flipped)}>Flip</button>
          <button onClick={() => { setIdx(p => Math.min(cards.length - 1, p + 1)); setFlipped(false) }} disabled={idx >= cards.length - 1}>→</button>
        </div>
      </div>
    )
  }

  if (data.type === 'quiz') {
    const qs = d.data?.questions || d.questions || []
    return <div className="output-quiz">{qs.map((q, i) => (
      <div key={i} className="quiz-question">
        <p className="quiz-q">{i + 1}. {q.question}</p>
        <div className="quiz-options">
          {q.options?.map((o, j) => (
            <div key={j} className={`quiz-option ${j === q.answer ? 'correct' : ''}`}>{o}</div>
          ))}
        </div>
      </div>
    ))}</div>
  }

  if (data.type === 'summary') {
    return (
      <div className="output-summary">
        <h3>{d.title || 'Summary'}</h3>
        {d.keyPoints?.map((p, i) => <p key={i} className="summary-point">• {p}</p>)}
        {d.topics?.length > 0 && <div className="summary-topics">{d.topics.map((t, i) => <span key={i} className="topic-tag">{t}</span>)}</div>}
      </div>
    )
  }

  return <pre className="output-raw">{JSON.stringify(d, null, 2)}</pre>
}

/* ═══ MAIN APP ═══ */
export default function App() {
  const [notebooks, setNotebooks] = useState([])
  const [selected, setSelected] = useState(null)

  const refresh = useCallback(async () => {
    try {
      const r = await fetch(`${API}/notebooks`)
      if (r.ok) setNotebooks(await r.json())
    } catch (e) { console.error('Failed to load notebooks') }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const deleteNotebook = useCallback(async id => {
    await fetch(`${API}/notebooks/${id}`, { method: 'DELETE' })
    if (selected === id) setSelected(null)
    refresh()
  }, [selected, refresh])

  const currentNotebook = notebooks.find(n => n.id === selected)

  if (selected && currentNotebook) {
    return <NotebookView notebook={currentNotebook} onBack={() => setSelected(null)} refresh={refresh} />
  }

  return <HomePage notebooks={notebooks} onSelect={setSelected} onDelete={deleteNotebook} />
}
