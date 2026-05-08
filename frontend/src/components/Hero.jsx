import { useEffect, useState, useRef } from 'react'
import { FiArrowDown, FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi'

const TYPING_STRINGS = [
  'Full-Stack Developer',
  'React.js Enthusiast',
  'Android Developer',
  'UI/UX Craftsman',
  'Problem Solver',
]

const Hero = () => {
  const [typedText, setTypedText] = useState('')
  const [stringIndex, setStringIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const canvasRef = useRef(null)

  // Typing effect
  useEffect(() => {
    const current = TYPING_STRINGS[stringIndex]
    let timeout

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setTypedText(current.slice(0, charIndex))
        setCharIndex(c => c + 1)
      }, 70)
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setTypedText(current.slice(0, charIndex - 1))
        setCharIndex(c => c - 1)
      }, 35)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setStringIndex(i => (i + 1) % TYPING_STRINGS.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, stringIndex])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`
        ctx.fill()

        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-15 animate-float"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl opacity-10 animate-float"
        style={{ background: 'radial-gradient(circle, #00d4ff, transparent)', animationDelay: '3s' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-widest mb-8 animate-on-scroll"
          style={{
            background: 'rgba(0,212,255,0.06)',
            border: '1px solid rgba(0,212,255,0.2)',
            color: '#00d4ff',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: '#00ff88' }}
          />
          AVAILABLE FOR WORK · MATALE, SRI LANKA
        </div>

        {/* Name */}
        <h1
          className="font-display font-black tracking-tighter mb-4 leading-none"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          <span className="text-textPrimary">Maheesha</span>
          <br />
          <span className="gradient-text">Udalagama</span>
        </h1>

        {/* Typing */}
        <div className="h-10 flex items-center justify-center mb-6">
          <span
            className="font-mono text-lg md:text-2xl font-medium"
            style={{ color: '#00d4ff' }}
          >
            &lt; {typedText}
            <span className="animate-blink">|</span> /&gt;
          </span>
        </div>

        {/* Summary */}
        <p
          className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10 animate-on-scroll"
          style={{ color: '#8b949e', animationDelay: '0.2s' }}
        >
          A passionate Software Engineering undergraduate specializing in full-stack development.
          I bridge robust backend logic with visually striking frontend design — crafting
          user-focused applications that solve real-world problems with clean, efficient code.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-on-scroll" style={{ animationDelay: '0.3s' }}>
          <button
            className="btn-primary flex items-center gap-2"
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
            <span>→</span>
          </button>
          <button
            className="btn-outline"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Me
          </button>
          <a
            href="/Maheesha_Udalagama_CV.pdf"
            download
            className="flex items-center gap-2 text-sm font-display font-semibold text-textSecondary hover:text-accent transition-colors"
          >
            <FiDownload size={16} />
            Download CV
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 animate-on-scroll" style={{ animationDelay: '0.4s' }}>
          {[
            { icon: FiGithub, href: 'https://github.com/Maheesh218a', label: 'GitHub' },
            { icon: FiLinkedin, href: 'https://www.linkedin.com/in/maheesha-udalagama-11958b273', label: 'LinkedIn' },
            { icon: FiMail, href: 'mailto:maheeshaudalagama@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="p-2.5 rounded-lg text-textSecondary hover:text-accent transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
                e.currentTarget.style.background = 'rgba(0,212,255,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs font-mono tracking-widest text-textSecondary opacity-50">SCROLL</span>
        <FiArrowDown size={16} className="text-textSecondary opacity-50" />
      </div>
    </section>
  )
}

export default Hero
