import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = links.map(l => l.href.slice(1))
      for (const sec of sections.reverse()) {
        const el = document.getElementById(sec)
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(sec)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'glass py-3 shadow-lg' : 'py-5'
      }`}
      style={scrolled ? { borderBottom: '1px solid rgba(0,212,255,0.08)' } : {}}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display font-black text-xl tracking-tighter"
          style={{ color: '#00d4ff', textShadow: '0 0 15px rgba(0,212,255,0.4)' }}
        >
          MU<span className="text-textSecondary">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNav(l.href)}
              className={`text-sm font-body font-medium tracking-wide transition-all duration-200 hover:text-accent ${
                active === l.href.slice(1) ? 'text-accent' : 'text-textSecondary'
              }`}
              style={active === l.href.slice(1) ? { textShadow: '0 0 10px rgba(0,212,255,0.5)' } : {}}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/Maheesha_Udalagama_CV.pdf"
            download
            className="flex items-center gap-2 text-sm font-display font-semibold px-4 py-2 rounded-md transition-all duration-200"
            style={{
              border: '1px solid rgba(0,212,255,0.3)',
              color: '#00d4ff',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.08)'
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.7)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
            }}
          >
            <FiDownload size={14} />
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-textSecondary hover:text-accent transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNav(l.href)}
              className="text-left text-sm font-medium text-textSecondary hover:text-accent transition-colors py-1"
            >
              {l.label}
            </button>
          ))}
          <a
            href="/Maheesha_Udalagama_CV.pdf"
            download
            className="flex items-center gap-2 text-sm font-semibold text-accent mt-2"
          >
            <FiDownload size={14} />
            Download Resume
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
