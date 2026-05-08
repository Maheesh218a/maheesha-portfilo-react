import { useContext } from 'react'
import { FiMapPin, FiPhone, FiMail, FiGlobe } from 'react-icons/fi'
import { PortfolioContext } from '../context/PortfolioContext'

const iconMap = {
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe
}

const About = () => {
  const { data } = useContext(PortfolioContext);
  const { educationDescription, education, info } = data.about;
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="mb-16 animate-on-scroll">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-accent opacity-60" />
            <span className="text-xs font-mono tracking-widest text-accent uppercase">About Me</span>
          </div>
          <h2 className="section-heading text-4xl md:text-5xl text-textPrimary">
            Who I <span className="gradient-text">Am</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Summary + Info */}
          <div className="animate-on-scroll">
            {/* Avatar placeholder - stylized */}
            <div
              className="w-24 h-24 rounded-2xl mb-8 flex items-center justify-center font-display font-black text-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
                border: '1px solid rgba(0,212,255,0.2)',
                color: '#00d4ff',
                textShadow: '0 0 20px rgba(0,212,255,0.5)',
              }}
            >
              MU
            </div>

            <p className="text-textSecondary leading-relaxed mb-4 whitespace-pre-wrap">
              {educationDescription}
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {info.map(({ icon, label, href }) => {
                const Icon = iconMap[icon] || FiMapPin;
                return (
                  <div key={label} className="flex items-center gap-3">
                    <Icon size={15} className="text-accent flex-shrink-0" />
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-textSecondary hover:text-accent transition-colors font-mono"
                      >
                        {label}
                      </a>
                    ) : (
                      <span className="text-sm text-textSecondary font-mono">{label}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Education */}
          <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-display font-bold text-lg text-textPrimary mb-6 flex items-center gap-2">
              <span style={{ color: '#00d4ff' }}>◈</span> Education
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-3 top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(to bottom, #00d4ff, #7c3aed, transparent)' }}
              />

              <div className="space-y-8">
                {education.map((edu, i) => (
                  <div key={i} className="relative pl-10">
                    {/* Dot */}
                    <div
                      className="absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(0,212,255,0.1)',
                        border: '1px solid rgba(0,212,255,0.4)',
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: '#00d4ff' }}
                      />
                    </div>

                    <div
                      className="glass-card p-4 rounded-xl"
                    >
                      <div
                        className="text-xs font-mono mb-1"
                        style={{ color: '#00d4ff' }}
                      >
                        {edu.year}
                      </div>
                      <div className="font-display font-semibold text-textPrimary text-sm mb-1">
                        {edu.degree}
                      </div>
                      <div className="text-xs text-textSecondary">{edu.school}</div>
                      {edu.note && (
                        <div
                          className="text-xs mt-2 px-2 py-0.5 rounded-full inline-block font-mono"
                          style={{
                            background: 'rgba(0,255,136,0.08)',
                            color: '#00ff88',
                            border: '1px solid rgba(0,255,136,0.2)',
                          }}
                        >
                          {edu.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
