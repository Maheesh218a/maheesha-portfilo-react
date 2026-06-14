import { useState, useContext } from 'react'
import { FiGithub } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { PortfolioContext } from '../context/PortfolioContext'
import ProjectCard from './ProjectCard'

const FILTERS = ['All', 'Web', 'Mobile', 'Desktop']

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
          {filtered.slice(0, 6).map((project, i) => (
            <ProjectCard key={`${filter}-${project.title}-${i}`} project={project} index={i} />
          ))}
        </div>

        {filtered.length > 6 && (
          <div className="mt-12 flex justify-center animate-on-scroll">
            <Link
              to="/projects"
              className="btn-outline flex items-center gap-2"
            >
              View all {filtered.length} projects →
            </Link>
          </div>
        )}

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
