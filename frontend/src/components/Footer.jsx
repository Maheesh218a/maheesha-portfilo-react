import { FiGithub, FiLinkedin, FiMail, FiGlobe, FiHeart } from 'react-icons/fi'

const socials = [
  { icon: FiGithub, href: 'https://github.com/Maheesh218a', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/maheesha-udalagama-11958b273', label: 'LinkedIn' },
  { icon: FiMail, href: 'mailto:maheeshaudalagama@gmail.com', label: 'Email' },
  { icon: FiGlobe, href: 'https://maheeshaudalagama.online', label: 'Website' },
]

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const Footer = () => {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative pt-16 pb-8">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div
              className="font-display font-black text-2xl tracking-tighter mb-3"
              style={{ color: '#00d4ff', textShadow: '0 0 15px rgba(0,212,255,0.3)' }}
            >
              MU<span className="text-textSecondary">.</span>
            </div>
            <p className="text-sm text-textSecondary leading-relaxed max-w-xs">
              Software Engineering undergraduate & Full-Stack Developer crafting digital experiences
              with clean code and creative design.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg text-textSecondary transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#00d4ff'
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)'
                    e.currentTarget.style.background = 'rgba(0,212,255,0.05)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = ''
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold text-sm text-textPrimary mb-4 tracking-wide">Navigation</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-textSecondary hover:text-accent transition-colors font-body"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <h4 className="font-display font-bold text-sm text-textPrimary mb-4 tracking-wide">Built With</h4>
            <div className="flex flex-wrap gap-2">
              {['React.js', 'Tailwind CSS', 'Vite', 'React Icons'].map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded-md text-textSecondary"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-xs font-mono text-textSecondary mb-2">Status</p>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
                style={{
                  background: 'rgba(0,255,136,0.06)',
                  border: '1px solid rgba(0,255,136,0.2)',
                  color: '#00ff88',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Available for opportunities
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono text-textSecondary">
          <p>
            © {new Date().getFullYear()} Maheesha Udalagama. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Crafted with <FiHeart size={11} style={{ color: '#ec4899' }} /> in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
