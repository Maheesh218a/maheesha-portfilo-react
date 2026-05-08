import { useEffect, useRef, useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'
const SkillBar = ({ name, level, color }) => {
  const barRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && barRef.current) {
          barRef.current.style.width = `${level}%`
        }
      },
      { threshold: 0.3 }
    )
    if (barRef.current) observer.observe(barRef.current.parentElement)
    return () => observer.disconnect()
  }, [level])

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-textSecondary group-hover:text-textPrimary transition-colors font-body">
          {name}
        </span>
        <span className="text-xs font-mono" style={{ color }}>
          {level}%
        </span>
      </div>
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: '0%',
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  )
}

const Skills = () => {
  const { data } = useContext(PortfolioContext);
  const { skillCategories, otherTech } = data.skills;

  return (
    <section id="skills" className="py-24 relative">
      {/* Divider gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 animate-on-scroll">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-accent opacity-60" />
            <span className="text-xs font-mono tracking-widest text-accent uppercase">Technical Skills</span>
          </div>
          <h2 className="section-heading text-4xl md:text-5xl text-textPrimary">
            My <span className="gradient-text">Toolkit</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              className="glass-card p-6 rounded-2xl animate-on-scroll"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span style={{ color: cat.color }}>{cat.icon}</span>
                <h3 className="font-display font-bold text-textPrimary">{cat.title}</h3>
                <div
                  className="ml-auto h-px flex-1 max-w-16 opacity-30"
                  style={{ background: cat.color }}
                />
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} color={cat.color} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech badge cloud */}
        <div className="mt-12 animate-on-scroll">
          <p className="text-xs font-mono tracking-widest text-textSecondary text-center mb-6 uppercase">
            — Also familiar with —
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {otherTech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-mono rounded-full text-textSecondary transition-all duration-200 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
                  e.currentTarget.style.color = '#00d4ff'
                  e.currentTarget.style.background = 'rgba(0,212,255,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.color = ''
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
