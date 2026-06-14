import { useState, useContext } from 'react'
import { FiGithub, FiExternalLink, FiSmartphone, FiGlobe, FiMonitor, FiLayout } from 'react-icons/fi'
import { PortfolioContext } from '../context/PortfolioContext'

const iconMap = {
  FiSmartphone,
  FiLayout,
  FiGlobe,
  FiMonitor
}

const FILTERS = ['All', 'Web', 'Mobile', 'Desktop']

const ProjectCard = ({ project, index }) => {
  const Icon = iconMap[project.icon] || FiGlobe;

  return (
    <div
      className="glass-card rounded-2xl overflow-hidden group"
      style={{ 
        opacity: 0,
        animation: `slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
        animationDelay: `${index * 0.1}s` 
      }}
    >
      {/* Card header */}
      <div
        className="p-5 flex items-start justify-between"
        style={{
          background: `linear-gradient(135deg, ${project.color}10, transparent)`,
          borderBottom: `1px solid ${project.color}15`,
        }}
      >
        <div
          className="p-2.5 rounded-xl"
          style={{
            background: `${project.color}15`,
            border: `1px solid ${project.color}30`,
          }}
        >
          <Icon size={20} style={{ color: project.color }} />
        </div>
        <div className="flex items-center gap-2">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-textSecondary hover:text-accent transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <FiExternalLink size={14} />
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg text-textSecondary hover:text-accent transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <FiGithub size={14} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-1">
          <h3 className="font-display font-bold text-textPrimary text-lg leading-tight">
            {project.title}
          </h3>
          <p
            className="text-xs font-mono mt-0.5"
            style={{ color: project.color }}
          >
            {project.subtitle}
          </p>
        </div>
        <p className="text-sm text-textSecondary leading-relaxed my-3 line-clamp-3">
          {project.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.features.map((f) => (
            <span
              key={f}
              className="text-xs px-2 py-0.5 rounded-md font-mono"
              style={{
                background: `${project.color}10`,
                color: project.color,
                border: `1px solid ${project.color}25`,
              }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Tech stack */}
        <div
          className="pt-3 flex flex-wrap gap-1.5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded font-mono text-textSecondary"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const [filter, setFilter] = useState('All')
  const { data } = useContext(PortfolioContext);
  const PROJECTS = data.projects;

  const filtered = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter)

  return (
    <section id="projects" className="py-24 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)' }}
      />
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 animate-on-scroll">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-accent opacity-60" />
            <span className="text-xs font-mono tracking-widest text-accent uppercase">Portfolio</span>
          </div>
          <h2 className="section-heading text-4xl md:text-5xl text-textPrimary">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10 animate-on-scroll">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-sm font-display font-semibold transition-all duration-200"
              style={
                filter === f
                  ? {
                      background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                      color: 'white',
                    }
                  : {
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#8b949e',
                    }
              }
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono text-textSecondary self-center">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={`${filter}-${project.title}-${i}`} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-12 text-center animate-on-scroll">
          <a
            href="https://github.com/Maheesh218a"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-display font-semibold text-textSecondary hover:text-accent transition-colors"
          >
            <FiGithub size={16} />
            View more on GitHub →
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
