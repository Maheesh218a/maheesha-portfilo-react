import { useState, useRef, useContext } from 'react'
import { FiMail, FiMapPin, FiSend, FiCheck, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { PortfolioContext } from '../context/PortfolioContext'

const iconMap = {
  FiGithub,
  FiLinkedin,
  FiTwitter,
}

const Contact = () => {
  const { data } = useContext(PortfolioContext)
  const { email, social } = data.contact

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const CONTACT_INFO = [
    {
      icon: FiMail,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      color: '#00d4ff',
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Matale, Sri Lanka',
      href: null,
      color: '#00ff88',
    },
  ]

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    }, 1800)
  }

  const inputClass = (field) =>
    `w-full bg-transparent px-4 py-3 rounded-xl text-sm text-textPrimary font-body outline-none transition-all duration-200 placeholder:text-textSecondary/40 ${
      errors[field]
        ? 'border border-red-500/50'
        : 'border border-white/08 focus:border-accent/50'
    }`

  return (
    <section id="contact" className="py-24 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)' }}
      />

      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 blur-3xl opacity-10"
        style={{ background: 'radial-gradient(ellipse, #7c3aed, transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 animate-on-scroll">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-accent opacity-60" />
            <span className="text-xs font-mono tracking-widest text-accent uppercase">Get In Touch</span>
          </div>
          <h2 className="section-heading text-4xl md:text-5xl text-textPrimary">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-4 text-textSecondary max-w-xl">
            I'm open to freelance opportunities, collaborations, and interesting projects.
            If you have an idea or just want to say hi, my inbox is always open.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div className="animate-on-scroll">
            <div className="space-y-4 mb-10">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href, color }) => (
                <div
                  key={label}
                  className="group glass-card p-4 rounded-xl flex items-center gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}12`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-textSecondary">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="text-sm text-textPrimary group-hover:text-accent transition-colors font-body"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-textPrimary font-body">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-xl font-display font-bold text-textPrimary mb-6">Connect with me</h3>
              <div className="flex gap-4">
                {social.map((link) => {
                  const Icon = iconMap[link.icon] || FiGithub
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = `${link.color}50`
                        e.currentTarget.style.background = `${link.color}10`
                        e.currentTarget.querySelector('svg').style.color = link.color
                        e.currentTarget.style.transform = 'translateY(-4px)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                        e.currentTarget.querySelector('svg').style.color = '#8b949e'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <Icon size={20} className="text-textSecondary transition-colors duration-300" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <form
              onSubmit={handleSubmit}
              className="glass-card p-6 rounded-2xl space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={inputClass('name')}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: errors.name ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.08)',
                    }}
                    onFocus={e => {
                      if (!errors.name) e.target.style.borderColor = 'rgba(0,212,255,0.4)'
                    }}
                    onBlur={e => {
                      if (!errors.name) e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                    }}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1 font-mono">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={inputClass('email')}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: errors.email ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.08)',
                    }}
                    onFocus={e => {
                      if (!errors.email) e.target.style.borderColor = 'rgba(0,212,255,0.4)'
                    }}
                    onBlur={e => {
                      if (!errors.email) e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                    }}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1 font-mono">{errors.email}</p>}
                </div>
              </div>

              <input
                type="text"
                placeholder="Subject (optional)"
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-sm text-textPrimary font-body outline-none transition-all duration-200 placeholder:text-textSecondary/40"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(0,212,255,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />

              <div>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm text-textPrimary font-body outline-none transition-all duration-200 placeholder:text-textSecondary/40 resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: errors.message ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={e => {
                    if (!errors.message) e.target.style.borderColor = 'rgba(0,212,255,0.4)'
                  }}
                  onBlur={e => {
                    if (!errors.message) e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                  }}
                />
                {errors.message && <p className="text-xs text-red-400 mt-1 font-mono">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={sending || sent}
                className="w-full py-3 rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300"
                style={
                  sent
                    ? { background: 'rgba(0,255,136,0.15)', border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88' }
                    : { background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', color: 'white', boxShadow: sending ? 'none' : '0 4px 20px rgba(0,212,255,0.25)' }
                }
              >
                {sent ? (
                  <><FiCheck size={16} /> Message Sent!</>
                ) : sending ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                ) : (
                  <><FiSend size={16} /> Send Message</>
                )}
              </button>

              <p className="text-center text-xs font-mono text-textSecondary">
                Or email me directly at{' '}
                <a href="mailto:maheeshaudalagama@gmail.com" className="text-accent hover:underline">
                  maheeshaudalagama@gmail.com
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
