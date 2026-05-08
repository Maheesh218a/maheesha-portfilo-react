import { useContext } from 'react'
import { FiBriefcase, FiCalendar } from 'react-icons/fi'
import { PortfolioContext } from '../context/PortfolioContext'

const Experience = () => {
  const { data } = useContext(PortfolioContext);
  const { experiences, certifications } = data.experience;

  return (
    <section id="experience" className="py-24 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.2), transparent)' }}
      />
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 animate-on-scroll">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-accent opacity-60" />
            <span className="text-xs font-mono tracking-widest text-accent uppercase">Experience</span>
          </div>
          <h2 className="section-heading text-4xl md:text-5xl text-textPrimary">
            Work <span className="gradient-text">History</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work experience */}
          <div className="animate-on-scroll">
            <h3 className="font-display font-bold text-textPrimary mb-8 flex items-center gap-2">
              <FiBriefcase className="text-accent" size={18} />
              Professional Experience
            </h3>

            <div className="relative">
              <div
                className="absolute left-3 top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(to bottom, #00d4ff, transparent)' }}
              />

              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-10 pb-8">
                  {/* Dot */}
                  <div
                    className="absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(0,212,255,0.1)',
                      border: '1px solid rgba(0,212,255,0.4)',
                    }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: '#00d4ff' }} />
                  </div>

                  <div className="glass-card p-5 rounded-2xl">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h4 className="font-display font-bold text-textPrimary">{exp.role}</h4>
                        <p style={{ color: exp.color }} className="text-sm font-mono">{exp.company}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className="text-xs font-mono px-2 py-0.5 rounded-full"
                          style={{
                            background: `${exp.color}15`,
                            color: exp.color,
                            border: `1px solid ${exp.color}30`,
                          }}
                        >
                          {exp.type}
                        </span>
                        <span className="text-xs text-textSecondary flex items-center gap-1 font-mono">
                          <FiCalendar size={10} /> {exp.period}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-textSecondary">
                          <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* Currently studying badge */}
              <div className="relative pl-10">
                <div
                  className="absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center animate-pulse"
                  style={{
                    background: 'rgba(0,255,136,0.1)',
                    border: '1px solid rgba(0,255,136,0.5)',
                  }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: '#00ff88' }} />
                </div>
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    background: 'rgba(0,255,136,0.04)',
                    border: '1px dashed rgba(0,255,136,0.2)',
                  }}
                >
                  <p className="text-sm font-mono" style={{ color: '#00ff88' }}>
                    ◉ Currently pursuing BEng in Software Engineering
                  </p>
                  <p className="text-xs text-textSecondary mt-1">
                    Java Institute for Advanced Technology · 2023–2027
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-display font-bold text-textPrimary mb-8 flex items-center gap-2">
              <span style={{ color: '#7c3aed' }}>◈</span>
              Certifications
            </h3>

            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="group glass-card p-4 rounded-xl flex items-start gap-4"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-black text-sm"
                    style={{
                      background: `${cert.color}12`,
                      border: `1px solid ${cert.color}30`,
                      color: cert.color,
                    }}
                  >
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-body font-medium text-textPrimary group-hover:text-accent transition-colors">
                      {cert.title}
                    </p>
                    <p className="text-xs font-mono text-textSecondary mt-0.5">{cert.issuer}</p>
                  </div>
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: cert.color }}
                  />
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { label: 'Projects', value: '7+' },
                { label: 'Certifications', value: '4' },
                { label: 'Year', value: '4th' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 rounded-xl text-center"
                >
                  <div
                    className="text-2xl font-display font-black mb-1"
                    style={{ color: '#00d4ff', textShadow: '0 0 15px rgba(0,212,255,0.4)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono text-textSecondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
