import { useState, useEffect, useRef } from 'react'
import avatarImg from './assets/avatar.jpg'
import './index.css'

// ─── DATA ────────────────────────────────────────────────────────────────────
const RESUME = {
  name: 'Jenish',
  role: 'Software Developer',
  tagline: 'Crafting scalable, elegant software with 2 years of hands-on experience.',
  about: `I'm Jenish, a passionate Software Developer with 2 years of experience building
    full-stack web applications. I specialise in creating intuitive, high-performance
    applications using React JS on the frontend and C# / ASP.NET on the backend,
    with SQL for robust data management.`,
  about2: `I love turning complex problems into clean, efficient code. Whether it's a sleek
    React interface or a powerful .NET API, I bring a detail-oriented mindset and a
    passion for quality to every project.`,
  email: 'jenishj868@gmail.com',
  github: 'https://github.com/jenishjerry21-ops',
  linkedin: 'https://www.linkedin.com/in/jenishs057?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=iso_app',
  stats: [
    { number: '2+', label: 'Years Experience' },
    { number: '15+', label: 'Projects Built' },
    { number: '5+', label: 'Technologies' },
  ],
  skills: [
    {
      title: 'Frontend Development',
      icon: '⚛️',
      color: 'rgba(6, 182, 212, 0.15)',
      tags: ['React JS', 'HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      bars: [
        { label: 'React JS', pct: 88 },
        { label: 'HTML / CSS', pct: 92 },
      ],
    },
    {
      title: 'Backend Development',
      icon: '⚙️',
      color: 'rgba(124, 58, 237, 0.15)',
      tags: ['C#', 'ASP.NET', 'REST APIs', 'MVC', '.NET Core'],
      bars: [
        { label: 'C# / ASP.NET', pct: 82 },
        { label: 'REST APIs', pct: 80 },
      ],
    },
    {
      title: 'Database & Data',
      icon: '🗄️',
      color: 'rgba(236, 72, 153, 0.15)',
      tags: ['SQL Server', 'T-SQL', 'Stored Procedures', 'Query Optimisation'],
      bars: [
        { label: 'SQL Server', pct: 80 },
        { label: 'T-SQL', pct: 75 },
      ],
    },
  ],
  projects: [
    {
      title: 'Employee Management System',
      desc: 'A full-stack CRUD application for managing employees with role-based access control, real-time search, and advanced reporting built with React JS and ASP.NET Core Web API.',
      emoji: '👔',
      tags: [
        { label: 'React JS', cls: 'tag-react' },
        { label: 'ASP.NET', cls: 'tag-net' },
        { label: 'SQL Server', cls: 'tag-sql' },
        { label: 'C#', cls: 'tag-cs' },
      ],
      bg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    },
    {
      title: 'E-Commerce Web App',
      desc: 'A feature-rich e-commerce platform with product listing, cart, checkout, and order management. Fully responsive UI with React and a robust .NET backend.',
      emoji: '🛒',
      tags: [
        { label: 'React JS', cls: 'tag-react' },
        { label: 'C#', cls: 'tag-cs' },
        { label: 'SQL', cls: 'tag-sql' },
      ],
      bg: 'linear-gradient(135deg, #0f172a 0%, #064e3b 100%)',
    },
    {
      title: 'Personal Portfolio',
      desc: 'A premium animated developer portfolio (you\'re looking at it!) built with React JS featuring smooth scroll animations, aurora hero backgrounds, and glassmorphism cards.',
      emoji: '🚀',
      tags: [
        { label: 'React JS', cls: 'tag-react' },
        { label: 'HTML5', cls: 'tag-html' },
        { label: 'CSS3', cls: 'tag-html' },
      ],
      bg: 'linear-gradient(135deg, #0f172a 0%, #4c1d95 100%)',
    },
  ],
  experience: [
    {
      period: '2024 – Present',
      title: 'Software Developer',
      company: 'VFast Technologies',
      desc: 'Developing and maintaining full-stack web applications using React JS, C#, ASP.NET, and SQL Server. Leading frontend development efforts and collaborating with cross-functional teams to deliver high-quality software solutions.',
      tech: ['React JS', 'C#', 'ASP.NET Core', 'SQL Server', 'REST API'],
    },
    {
      period: '2023 – 2024',
      title: 'Junior Fullstack Developer',
      company: 'VFast Technologies',
      desc: 'Started career building web applications with HTML, CSS, and C# / ASP.NET MVC. Contributed to database design, SQL query optimisation, and building responsive UI components.',
      tech: ['React JS', 'HTML', 'CSS', 'C#', 'ASP.NET Core', 'SQL'],
    },
  ],
}

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-on-scroll')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ─── TYPED TEXT ──────────────────────────────────────────────────────────────
function TypedText({ words }) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[idx]
    let timeout

    if (!deleting && text.length < word.length) {
      timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), 90)
    } else if (!deleting && text.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 50)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setIdx((i) => (i + 1) % words.length)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, idx, words])

  return (
    <span
      style={{
        borderRight: '3px solid var(--accent-purple-light)',
        paddingRight: '4px',
        animation: 'blink 1s step-end infinite',
      }}
    >
      {text}
    </span>
  )
}

// ─── SKILL BAR ───────────────────────────────────────────────────────────────
function SkillBar({ label, pct }) {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setWidth(pct), 200)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [pct])

  return (
    <div className="skill-bar" ref={ref}>
      <div className="skill-bar-label">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: `${width}%`, transition: 'width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
        />
      </div>
    </div>
  )
}

// ─── NAV ────────────────────────────────────────────────────────────────────
function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="top-nav">
      <div className="container">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {RESUME.name}.dev
          </div>
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <span
                  className={`nav-link${activeSection === link.toLowerCase() ? ' active' : ''}`}
                  onClick={() => scrollTo(link)}
                  id={`nav-${link.toLowerCase()}`}
                >
                  {link}
                </span>
              </li>
            ))}
          </ul>
          <a
            className="nav-cta"
            id="nav-resume-btn"
            href="/resume/JENISH%20S%20.pdf"
            download="JENISH S .pdf"
          >
            Download Resume
          </a>
          <button
            className="nav-cta"
            id="nav-hire-btn"
            onClick={() => scrollTo('Contact')}
            type="button"
          >
            Hire Me ✨
          </button>
          <div
            className="nav-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            id="nav-mobile-toggle"
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        {menuOpen && (
          <div
            style={{
              background: 'rgba(5,5,8,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '16px',
              marginTop: '12px',
            }}
          >
            {NAV_LINKS.map((link) => (
              <div
                key={link}
                className="nav-link"
                onClick={() => scrollTo(link)}
                style={{ display: 'block', padding: '12px 16px', width: '100%', textAlign: 'left' }}
              >
                {link}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="hero">
      {/* Animated Background - 21st.dev inspired */}
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-aurora" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-noise" />
      </div>

      {/* Floating tech tags */}
      <div className="hero-floating-tags" aria-hidden="true">
        {['React JS ⚛️', 'C#', 'SQL Server 🗄️', 'ASP.NET Core', 'JavaScript'].map((tag) => (
          <div className="floating-tag" key={tag}>{tag}</div>
        ))}
      </div>

      {/* Content */}
      <div className="hero-content">
        <div
          className="hero-badge"
          style={{ animation: 'fadeInUp 0.8s ease both' }}
        >
          <span className="hero-badge-dot" />
          Open to Work · Available Now
        </div>

        <h1 className="hero-title" style={{ animation: 'fadeInUp 0.8s ease 0.15s both' }}>
          <span className="hero-title-line">Hi, I&apos;m</span>
          <span className="hero-title-line gradient">{RESUME.name}</span>
          <span className="hero-title-line" style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 600, marginTop: 8, color: 'var(--text-secondary)' }}>
            <TypedText words={['Software Developer', 'React Developer', 'Full Stack Dev', '.NET Developer']} />
          </span>
        </h1>

        <p className="hero-subtitle" style={{ animation: 'fadeInUp 0.8s ease 0.3s both' }}>
          {RESUME.tagline}
        </p>

        <div className="hero-cta-group" style={{ animation: 'fadeInUp 0.8s ease 0.45s both' }}>
          <button
            type="button"
            className="btn-primary"
            id="hero-view-work-btn"
            onClick={() => scrollTo('projects')}
          >
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="btn-secondary"
            id="hero-contact-btn"
            onClick={() => scrollTo('contact')}
          >
            Get In Touch
          </button>
        </div>

        <div className="hero-stats" style={{ animation: 'fadeInUp 0.8s ease 0.6s both' }}>
          {RESUME.stats.map((s) => (
            <div className="hero-stat" key={s.label}>
              <div className="hero-stat-number">{s.number}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-indicator" id="scroll-hint">
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  )
}

// ─── ABOUT ──────────────────────────────────────────────────────────────────
function About() {
  const highlights = [
    { icon: '⚛️', label: 'React JS Expert' },
    { icon: '⚙️', label: 'C# & ASP.NET' },
    { icon: '🗄️', label: 'SQL Server' },
    { icon: '🌐', label: 'REST APIs' },
    { icon: '📱', label: 'Responsive UI' },
    { icon: '🚀', label: '2 Yrs Experience' },
  ]
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-avatar-wrapper reveal-on-scroll">
            <div className="about-glow" />
            <div className="about-avatar-ring-2" />
            <div className="about-avatar-ring" />
            <img src={avatarImg} alt="Jenish - Software Developer" className="about-avatar" />
          </div>
          <div>
            <p className="section-label reveal-on-scroll">About Me</p>
            <h2 className="section-title reveal-on-scroll reveal-delay-1">
              Passionate about building{' '}
              <span className="gradient-text">great software</span>
            </h2>
            <p className="about-text reveal-on-scroll reveal-delay-1">{RESUME.about}</p>
            <p className="about-text reveal-on-scroll reveal-delay-2">{RESUME.about2}</p>
            <div className="about-highlights reveal-on-scroll reveal-delay-2">
              {highlights.map((h) => (
                <div className="about-highlight" key={h.label}>
                  <div className="about-highlight-icon">{h.icon}</div>
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SKILLS ─────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="skills-bg" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="skills-header">
          <p className="section-label reveal-on-scroll">Technical Skills</p>
          <h2 className="section-title reveal-on-scroll reveal-delay-1">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="reveal-on-scroll reveal-delay-2" style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', fontSize: 16 }}>
            Technologies I use to craft powerful, scalable applications
          </p>
        </div>
        <div className="skills-grid">
          {RESUME.skills.map((sk, i) => (
            <div
              className={`skill-card reveal-on-scroll reveal-delay-${i + 1}`}
              key={sk.title}
            >
              <div className="skill-card-icon" style={{ background: sk.color }}>
                {sk.icon}
              </div>
              <h3 className="skill-card-title">{sk.title}</h3>
              <div className="skill-tags">
                {sk.tags.map((t) => (
                  <span className="skill-tag" key={t}>{t}</span>
                ))}
              </div>
              {sk.bars.map((b) => (
                <SkillBar key={b.label} label={b.label} pct={b.pct} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PROJECTS ───────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div className="projects-header">
          <p className="section-label reveal-on-scroll">Projects</p>
          <h2 className="section-title reveal-on-scroll reveal-delay-1">
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className="reveal-on-scroll reveal-delay-2" style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', fontSize: 16 }}>
            A selection of projects showcasing my full-stack development skills
          </p>
        </div>
        <div className="projects-grid">
          {RESUME.projects.map((p, i) => (
            <article
              className={`project-card reveal-on-scroll reveal-delay-${i + 1}`}
              key={p.title}
              id={`project-card-${i}`}
            >
              <div
                className="project-card-image-placeholder"
                style={{ background: p.bg }}
              >
                <span style={{ position: 'relative', zIndex: 1, fontSize: 64 }}>{p.emoji}</span>
              </div>
              <div className="project-card-body">
                <div className="project-card-tags">
                  {p.tags.map((t) => (
                    <span className={`project-tag ${t.cls}`} key={t.label}>{t.label}</span>
                  ))}
                </div>
                <h3 className="project-card-title">{p.title}</h3>
                <p className="project-card-desc">{p.desc}</p>
                <div className="project-card-links">
                  <a
                    href={RESUME.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link primary"
                    id={`project-github-${i}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── EXPERIENCE ─────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section className="experience section" id="experience">
      <div className="container">
        <div className="experience-header">
          <p className="section-label reveal-on-scroll">Experience</p>
          <h2 className="section-title reveal-on-scroll reveal-delay-1">
            My <span className="gradient-text">Journey</span>
          </h2>
        </div>
        <div className="timeline">
          {RESUME.experience.map((exp, i) => (
            <div
              className={`timeline-item reveal-on-scroll reveal-delay-${i + 1}`}
              key={exp.title}
              id={`timeline-item-${i}`}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-period">📅 {exp.period}</div>
                <h3 className="timeline-title">{exp.title}</h3>
                <div className="timeline-company">🏢 {exp.company}</div>
                <p className="timeline-desc">{exp.desc}</p>
                <div className="timeline-tech">
                  {exp.tech.map((t) => (
                    <span className="skill-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="contact-bg" />
      <div className="container">
        <div className="contact-inner">
          <div className="contact-card reveal-on-scroll">
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p className="section-label" style={{ justifyContent: 'center' }}>Let&apos;s Connect</p>
              <h2
                className="section-title"
                style={{ fontSize: 'clamp(32px, 6vw, 56px)', marginBottom: 16 }}
              >
                Ready to build something <span className="gradient-text">amazing?</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
                I&apos;m currently open to new opportunities. Whether it&apos;s a full-time role,
                freelance project, or just a chat — my inbox is always open.
              </p>
              <div className="contact-links">
                <a
                  href={`mailto:${RESUME.email}`}
                  className="contact-link email"
                  id="contact-email-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Email Me
                </a>
                <a
                  href={RESUME.github}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link github"
                  id="contact-github-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href={RESUME.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link linkedin"
                  id="contact-linkedin-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CURSOR GLOW ─────────────────────────────────────────────────────────────
function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = `${e.clientX}px`
        ref.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return <div className="cursor-glow" ref={ref} aria-hidden="true" />
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <p style={{ marginBottom: 8 }}>
          <span className="gradient-text" style={{ fontWeight: 700, fontSize: 18 }}>
            {RESUME.name}.dev
          </span>
        </p>
        <p>
          Built with ❤️ using{' '}
          <span style={{ color: 'var(--accent-cyan)' }}>React JS</span> ·{' '}
          © {new Date().getFullYear()} {RESUME.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState('')

  useScrollReveal()

  useEffect(() => {
    const sections = ['about', 'skills', 'projects', 'experience', 'contact']
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <CursorGlow />
      <Nav activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
