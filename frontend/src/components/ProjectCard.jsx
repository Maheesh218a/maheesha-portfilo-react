import React from 'react';
import { FiGithub, FiExternalLink, FiSmartphone, FiGlobe, FiMonitor, FiLayout } from 'react-icons/fi';

const iconMap = {
  FiSmartphone,
  FiLayout,
  FiGlobe,
  FiMonitor
};

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
  );
};

export default ProjectCard;
