import { useState, useEffect, useRef, useCallback } from 'react'

/* ═══ Intersection Observer hook ═══ */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

/* ═══ Animated Counter hook ═══ */
function useCounter(end: number, duration = 2000) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          setVal(Math.floor(progress * end))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end, duration])
  return { ref, val }
}

/* ═══ Typed Text ═══ */
function TypedText({ texts, speed = 80, pause = 2000 }: { texts: string[], speed?: number, pause?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const text = texts[textIdx]
    if (!deleting) {
      if (charIdx < text.length) {
        const t = setTimeout(() => { setDisplayed(text.slice(0, charIdx + 1)); setCharIdx(charIdx + 1) }, speed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setDeleting(true), pause)
        return () => clearTimeout(t)
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => { setDisplayed(text.slice(0, charIdx - 1)); setCharIdx(charIdx - 1) }, speed / 2)
        return () => clearTimeout(t)
      } else {
        setDeleting(false)
        setTextIdx((textIdx + 1) % texts.length)
      }
    }
  }, [charIdx, deleting, textIdx, texts, speed, pause])

  return <span>{displayed}<span className="typed-cursor" /></span>
}

/* ═══ Particles ═══ */
function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${10 + Math.random() * 20}s`,
    size: `${1 + Math.random() * 2}px`,
    color: i % 3 === 0 ? 'rgba(99,102,241,0.4)' : i % 3 === 1 ? 'rgba(236,72,153,0.3)' : 'rgba(16,185,129,0.5)',
  }))
  return (
    <div className="particles">
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: p.left, animationDelay: p.delay, animationDuration: p.duration,
          width: p.size, height: p.size, background: p.color,
        }} />
      ))}
    </div>
  )
}

/* ═══ Icons ═══ */
const I = {
  Zap: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Shield: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Globe: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Cpu: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/></svg>,
  Message: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Headphones: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/></svg>,
  Presentation: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Database: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  Cloud: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  Users: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Download: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Lock: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Layers: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Sparkles: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2L9.5 8.5 3 12l6.5 3.5L12 22l2.5-6.5L21 12l-6.5-3.5z"/></svg>,
  Check: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Github: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  ArrowRight: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Wifi: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  Menu: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
}

/* ═══ DATA ═══ */
const FEATURES = [
  { icon: I.Message, title: 'Chat with Documents', desc: 'Ask questions about your files. Get precise answers grounded in your actual content — not hallucinations.', color: '#10b981', tag: 'Core' },
  { icon: I.Presentation, title: 'Slide Deck Generator', desc: 'Upload any document, get a polished presentation in seconds. Title slides, content slides, summaries — all auto-generated.', color: '#6366f1', tag: 'Content' },
  { icon: I.Headphones, title: 'Audio Podcast', desc: 'Turn any document into a two-person podcast conversation. Listen to your data like a radio show.', color: '#ec4899', tag: 'Audio' },
  { icon: I.Database, title: 'Mind Map Visualization', desc: 'See the structure of your documents at a glance. Interactive mind maps with color-coded branches.', color: '#06b6d4', tag: 'Visual' },
  { icon: I.Layers, title: 'Flashcard Generator', desc: 'Auto-generate study flashcards from any text. Click to flip, navigate with arrows. Study mode built in.', color: '#8b5cf6', tag: 'Education' },
  { icon: I.Zap, title: 'Structured Data Extraction', desc: 'Pull structured JSON from unstructured text. Clean, usable data from messy documents.', color: '#f59e0b', tag: 'Data' },
  { icon: I.Cloud, title: '10 Cloud Providers', desc: 'Gemini, OpenAI, Claude, Groq, DeepSeek, Together, OpenRouter, Fireworks, Replicate, HuggingFace.', color: '#3b82f6', tag: 'Cloud' },
  { icon: I.Users, title: 'Multi-Model Ensemble', desc: 'Multiple AI models work as a team. Compare responses, merge results, get the best answer.', color: '#f43f5e', tag: 'Advanced' },
  { icon: I.Lock, title: '100% Private & Offline', desc: 'Everything runs on your machine. No data leaves your computer. Zero cloud dependency required.', color: '#10b981', tag: 'Privacy' },
]

const CLOUDS = [
  { name: 'Google Gemini', tag: 'gemini-2.0-flash' },
  { name: 'OpenAI', tag: 'gpt-4o' },
  { name: 'Anthropic', tag: 'claude-sonnet-4' },
  { name: 'Groq', tag: 'llama-3.3-70b' },
  { name: 'DeepSeek', tag: 'deepseek-chat' },
  { name: 'Together AI', tag: 'meta-llama/3.3-70b' },
  { name: 'OpenRouter', tag: 'all models' },
  { name: 'Fireworks AI', tag: 'llama + qwen' },
]

const FAQ = [
  { q: 'Is this really 100% local?', a: 'Yes. Once you download a model, everything runs on your machine. Your documents never leave your computer. The only time you need internet is for initial model downloads and optional cloud API connections.' },
  { q: 'How much RAM do I need?', a: 'SmolLM2 (360M): 2GB. Qwen 2.5 7B: 8GB. Llama 3.1 8B: 16GB. Llama 3.3 70B: 48GB+. Start small and upgrade as needed.' },
  { q: 'Can I use cloud APIs instead of local?', a: 'Yes. Connect Gemini, OpenAI, Anthropic, Groq, DeepSeek, and 5 more providers. Enter your API key and chat instantly. Switch between local and cloud anytime.' },
  { q: 'What makes this different from NotebookLM?', a: 'NotebookLM requires Google account, sends your data to Google servers, and has limited output formats. ExtractFlow runs 100% locally, supports 50+ models, generates slides/podcasts/flashcards/mind maps, and your data never leaves your machine.' },
  { q: 'Is it free?', a: 'Completely free. Open source. MIT license. No subscriptions, no API limits, no data collection, no hidden costs. Forever.' },
  { q: 'What file formats work?', a: 'TXT, CSV, JSON, Markdown, and PDF. Upload any text-based document and ExtractFlow will chunk, index, and make it searchable.' },
]

/* ═══════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════ */
export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [mobileMenu, setMobileMenu] = useState(false)

  // Reveal refs
  const heroRef = useReveal()
  const dashRef = useReveal(0.1)
  const featRef = useReveal()
  const modelRef = useReveal()
  const cloudRef = useReveal()
  const ctaRef = useReveal()
  const faqRef = useReveal()

  // Counter refs
  const c1 = useCounter(50, 1500)
  const c2 = useCounter(10, 1500)
  const c3 = useCounter(0, 100)
  const c4 = useCounter(100, 1500)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="mesh-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="noise" />
      <Particles />

      {/* ═══ NAVBAR ═══ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass' : ''}`}
        style={{ padding: '14px 32px', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <I.Sparkles style={{ width: 18, height: 18, color: '#10b981' }} />
            </div>
            <span className="text-gradient" style={{ fontSize: 17, fontWeight: 800 }}>ExtractFlow</span>
          </div>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {['Features', 'Models', 'Cloud', 'FAQ'].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14, fontWeight: 600, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#10b981'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text-dim)'}>{s}</a>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href="https://github.com/hackathon-XD/extractflow" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: 13 }}>
              <I.Github style={{ width: 15, height: 15 }} /> GitHub
            </a>
            <a href="#download" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: 13 }}>
              <I.Download style={{ width: 15, height: 15 }} /> Download
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="reveal" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '140px 24px 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ marginBottom: 24, display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="badge badge-green"><I.Zap style={{ width: 12, height: 12 }} /> 100% Local</span>
          <span className="badge badge-purple"><I.Lock style={{ width: 12, height: 12 }} /> Zero Cloud Required</span>
          <span className="badge badge-blue"><I.Wifi style={{ width: 12, height: 12 }} /> Works Offline</span>
        </div>

        <h1 className="hero-title" style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 1.05, maxWidth: 900, marginBottom: 28, letterSpacing: '-0.03em' }}>
          Your documents.<br />
          <span className="text-gradient">Your AI.</span><br />
          <span style={{ fontSize: '0.6em', color: 'var(--text-dim)' }}>No compromises.</span>
        </h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', maxWidth: 580, lineHeight: 1.7, marginBottom: 20 }}>
          Upload any file. Chat with AI. Generate slides, podcasts, mind maps, flashcards.{' '}
          <span className="text-gradient" style={{ fontWeight: 700 }}>Everything runs on your machine.</span>
        </p>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 40, fontFamily: 'JetBrains Mono, monospace' }}>
          <TypedText texts={['python server/main.py', 'npm run dev', '100% local AI inference', '50+ models available']} speed={60} pause={1800} />
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 60 }}>
          <a href="#download" className="btn btn-primary btn-large">
            <I.Download style={{ width: 20, height: 20 }} /> Download Free
          </a>
          <a href="https://github.com/hackathon-XD/extractflow" target="_blank" rel="noreferrer" className="btn btn-secondary btn-large">
            <I.Github style={{ width: 20, height: 20 }} /> View Source
          </a>
        </div>

        {/* Animated Counters */}
        <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { ref: c1.ref, val: c1.val, suffix: '+', label: 'Local Models' },
            { ref: c2.ref, val: c2.val, suffix: '+', label: 'Cloud Providers' },
            { ref: c4.ref, val: c4.val, suffix: '%', label: 'Private' },
          ].map((c, i) => (
            <div key={i} ref={c.ref} style={{ textAlign: 'center' }}>
              <div className="counter-num">{c.val}{c.suffix}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: 4 }}>{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DASHBOARD MOCKUP ═══ */}
      <section ref={dashRef} className="reveal-scale" style={{ padding: '0 24px 120px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="dash-mockup">
            <div className="dash-bar">
              <div className="dash-dot" style={{ background: '#ef4444' }} />
              <div className="dash-dot" style={{ background: '#f59e0b' }} />
              <div className="dash-dot" style={{ background: '#10b981' }} />
              <span style={{ marginLeft: 12, fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>ExtractFlow AI — Dashboard</span>
            </div>
            <div className="dash-content">
              {/* Sidebar mock */}
              <div style={{ borderRight: '1px solid rgba(255,255,255,0.04)', padding: 16 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sources</div>
                {['energy_report.txt', 'financials.csv', 'research.pdf'].map((f, i) => (
                  <div key={i} className="shimmer-card" style={{ padding: '8px 10px', borderRadius: 8, marginBottom: 6, background: i === 0 ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${i === 0 ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.04)'}`, fontSize: 11, color: i === 0 ? '#34d399' : 'var(--text-dim)' }}>
                    {f}
                  </div>
                ))}
                <div style={{ marginTop: 16, padding: '8px 0', textAlign: 'center', borderRadius: 8, border: '1px dashed rgba(255,255,255,0.08)', fontSize: 10, color: 'var(--text-muted)' }}>
                  + Drop files here
                </div>
              </div>

              {/* Center - Chat mock */}
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  {['Chat', 'Slides', 'Podcast', 'Mind Map'].map((t, i) => (
                    <div key={i} style={{ padding: '6px 14px', borderRadius: 8, fontSize: 11, fontWeight: 700, background: i === 0 ? 'rgba(16,185,129,0.1)' : 'transparent', color: i === 0 ? '#34d399' : 'var(--text-muted)', border: i === 0 ? '1px solid rgba(16,185,129,0.2)' : '1px solid transparent' }}>{t}</div>
                  ))}
                </div>
                {/* Chat bubbles */}
                <div style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.1)', borderRadius: '14px 14px 4px 14px', padding: '10px 14px', marginBottom: 10, maxWidth: '80%', fontSize: 12, color: 'var(--text-dim)', marginLeft: 'auto' }}>
                  What are the key energy trends in 2024?
                </div>
                <div style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.08)', borderRadius: '14px 14px 14px 4px', padding: '10px 14px', maxWidth: '85%', fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                  <span style={{ display: 'inline-block', background: 'rgba(16,185,129,0.1)', color: '#34d399', fontSize: 9, padding: '2px 8px', borderRadius: 999, fontWeight: 700, marginBottom: 6 }}>AI</span>
                  <br />
                  Based on the uploaded report, renewable energy reached 30% of global electricity in 2023. Key trends: Solar PV at 1,419 GW, battery storage doubled, $1.8T invested...
                </div>
                <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', fontSize: 11, color: 'var(--text-muted)' }}>
                    Ask about your documents...
                  </div>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <I.Zap style={{ width: 16, height: 16, color: 'white' }} />
                  </div>
                </div>
              </div>

              {/* Right panel - Extractions mock */}
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.04)', padding: 16 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Extractions</div>
                <div style={{ padding: 10, borderRadius: 10, border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.02)', marginBottom: 8 }}>
                  <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.1)', color: '#818cf8', fontSize: 8, padding: '2px 6px', borderRadius: 999, fontWeight: 700, marginBottom: 6 }}>JSON</div>
                  <pre style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', lineHeight: 1.5, overflow: 'hidden' }}>{`{
  "solar_gw": 1419,
  "investment": "1.8T",
  "renewable_share": "30%"
}`}</pre>
                </div>
                <div style={{ padding: 10, borderRadius: 10, border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'inline-block', background: 'rgba(16,185,129,0.1)', color: '#34d399', fontSize: 8, padding: '2px 6px', borderRadius: 999, fontWeight: 700, marginBottom: 6 }}>AI Response</div>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.5 }}>3 key findings extracted from 3 document chunks...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ padding: '100px 24px', position: 'relative', zIndex: 10 }}>
        <div ref={featRef} className="reveal" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 70 }}>
            <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>Features</span>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: 16, letterSpacing: '-0.02em' }}>
              Everything you need. <span className="text-gradient-purple">Nothing you don't.</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              Chat with docs, generate slides, podcasts, mind maps, flashcards. Use local models or connect cloud AI. Your data stays private.
            </p>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className={`glass-card float-card shimmer-card stagger-${(i % 6) + 1}`}
                style={{ padding: 28, cursor: 'default' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${f.color}12`, border: `1px solid ${f.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <f.icon style={{ width: 22, height: 22, color: f.color }} />
                  </div>
                  <span className="badge" style={{ background: `${f.color}10`, color: f.color, border: `1px solid ${f.color}20` }}>{f.tag}</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MODEL MARQUEE ═══ */}
      <section id="models" style={{ padding: '80px 0', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
        <div ref={modelRef} className="reveal" style={{ textAlign: 'center', marginBottom: 50, padding: '0 24px' }}>
          <span className="badge badge-amber" style={{ marginBottom: 16, display: 'inline-flex' }}>50+ Models</span>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 900 }}>
            <span className="text-gradient">Every major model.</span> All local.
          </h2>
        </div>
        {/* Marquee */}
        <div style={{ overflow: 'hidden', marginBottom: 40 }}>
          <div className="marquee-track">
            {[...['Qwen3 32B','Llama 3.3 70B','Phi 3.5 Mini','DeepSeek R1 7B','Mistral 7B','Gemma 3 4B','SmolLM2 360M','CodeLlama 7B','Yi 1.5 9B','InternLM2 7B','Command R','SOLAR 10.7B','BERT NER','Whisper Large','NLLB-200'], ...['Qwen3 32B','Llama 3.3 70B','Phi 3.5 Mini','DeepSeek R1 7B','Mistral 7B','Gemma 3 4B','SmolLM2 360M','CodeLlama 7B','Yi 1.5 9B','InternLM2 7B','Command R','SOLAR 10.7B','BERT NER','Whisper Large','NLLB-200']].map((m, i) => (
              <div key={i} style={{ padding: '12px 24px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', fontSize: 13, fontWeight: 700, color: 'var(--text-dim)', whiteSpace: 'nowrap', marginRight: 12 }}>
                {m}
              </div>
            ))}
          </div>
        </div>
        {/* Model types */}
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', padding: '0 24px' }}>
          {[
            { type: 'Text Generation', count: 40, color: '#10b981' },
            { type: 'Embeddings', count: 7, color: '#6366f1' },
            { type: 'Translation', count: 10, color: '#f59e0b' },
            { type: 'Speech Recognition', count: 5, color: '#ec4899' },
            { type: 'Image Classification', count: 5, color: '#06b6d4' },
            { type: 'Sentiment Analysis', count: 4, color: '#8b5cf6' },
            { type: 'Object Detection', count: 2, color: '#f43f5e' },
            { type: 'Summarization', count: 5, color: '#10b981' },
          ].map((t, i) => (
            <div key={i} style={{ padding: '10px 20px', borderRadius: 12, background: `${t.color}08`, border: `1px solid ${t.color}20`, fontSize: 12, fontWeight: 700, color: t.color }}>
              {t.type} <span style={{ opacity: 0.5 }}>({t.count})</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CLOUD PROVIDERS ═══ */}
      <section id="cloud" style={{ padding: '100px 24px', position: 'relative', zIndex: 10 }}>
        <div ref={cloudRef} className="reveal" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="badge badge-blue" style={{ marginBottom: 16, display: 'inline-flex' }}>Cloud AI</span>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: 16 }}>
              Or use <span className="text-gradient-blue">any cloud API</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)', maxWidth: 560, margin: '0 auto' }}>
              Connect 10+ providers. Use local for privacy, cloud for power. Switch instantly.
            </p>
          </div>
          <div className="cloud-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {CLOUDS.map((c, i) => (
              <div key={i} className="glass-card gradient-border" style={{ padding: 20, textAlign: 'center' }}>
                <I.Cloud style={{ width: 28, height: 28, color: '#3b82f6', marginBottom: 10 }} />
                <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{c.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VS COMPARE ═══ */}
      <section style={{ padding: '80px 24px', position: 'relative', zIndex: 10 }}>
        <div className="reveal" ref={useReveal()}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>Why ExtractFlow?</h2>
            </div>
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ padding: '16px 24px', background: 'rgba(16,185,129,0.06)', fontWeight: 800, fontSize: 14, color: '#34d399', textAlign: 'center' }}>ExtractFlow AI</div>
                <div style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.02)', fontWeight: 800, fontSize: 14, color: 'var(--text-muted)', textAlign: 'center' }}>NotebookLM</div>
              </div>
              {[
                ['✅ Runs 100% locally', '❌ Requires Google account'],
                ['✅ 50+ local models', '❌ Locked to Google models'],
                ['✅ Export slides/podcast/flashcards', '❌ Limited export options'],
                ['✅ Works offline', '❌ Requires internet'],
                ['✅ Your data stays private', '❌ Data sent to Google servers'],
                ['✅ Free forever (MIT)', '❌ Free but data harvesting'],
                ['✅ Multi-model ensemble', '❌ Single model only'],
                ['✅ Custom prompt templates', '❌ No prompt customization'],
              ].map(([yes, no], i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < 7 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                  <div style={{ padding: '12px 24px', fontSize: 13, color: '#34d399' }}>{yes}</div>
                  <div style={{ padding: '12px 24px', fontSize: 13, color: 'var(--text-muted)' }}>{no}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section id="download" style={{ padding: '100px 24px', position: 'relative', zIndex: 10 }}>
        <div ref={ctaRef} className="reveal" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div className="glass-card gradient-border" style={{ padding: '64px 48px' }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <I.Sparkles style={{ width: 32, height: 32, color: '#10b981' }} />
            </div>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: 16, letterSpacing: '-0.02em' }}>
              Start building with <span className="text-gradient">your own AI</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)', marginBottom: 36, maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>
              Download. Install. Open. Your documents. Your models. Your data. No accounts. No limits.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
              <a href="https://github.com/hackathon-XD/extractflow/releases" target="_blank" rel="noreferrer" className="btn btn-primary btn-large">
                <I.Download style={{ width: 20, height: 20 }} /> Download EXE
              </a>
              <a href="https://github.com/hackathon-XD/extractflow" target="_blank" rel="noreferrer" className="btn btn-secondary btn-large">
                <I.Github style={{ width: 20, height: 20 }} /> View on GitHub
              </a>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Windows / macOS / Linux · Python 3.10+ · MIT License
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" style={{ padding: '80px 24px', position: 'relative', zIndex: 10 }}>
        <div ref={faqRef} className="reveal" style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: 48 }}>FAQ</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQ.map((f, i) => (
              <div key={i} className="glass-card" style={{ padding: '18px 24px', cursor: 'pointer', transition: 'all 0.3s' }}
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{f.q}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 20, transition: 'transform 0.3s', transform: faqOpen === i ? 'rotate(45deg)' : 'rotate(0)', flexShrink: 0, marginLeft: 12 }}>+</span>
                </div>
                <div style={{ overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1)', maxHeight: faqOpen === i ? 200 : 0 }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', lineHeight: 1.7, paddingTop: 12 }}>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '32px 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <I.Sparkles style={{ width: 18, height: 18, color: 'var(--accent)' }} />
            <span style={{ fontSize: 14, fontWeight: 700 }}>ExtractFlow AI</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>MIT License</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="https://github.com/hackathon-XD/extractflow" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none' }}>GitHub</a>
            <a href="terms.html" style={{ color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none' }}>Terms</a>
            <a href="terms.html#privacy" style={{ color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none' }}>Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
