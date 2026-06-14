import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiSearch, FiFilter } from 'react-icons/fi';
import { PortfolioContext } from '../context/PortfolioContext';
import ProjectCard from '../components/ProjectCard';

const FILTERS = ['All', 'Web', 'Mobile', 'Desktop'];

const AllProjects = () => {
  const { data } = useContext(PortfolioContext);
  const PROJECTS = data?.projects || [];

  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'az'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter projects by category and search query
  let processedProjects = PROJECTS.filter(p => {
    const matchesCategory = filter === 'All' || p?.category?.toLowerCase() === filter.toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      p?.title?.toLowerCase().includes(searchLower) ||
      p?.description?.toLowerCase().includes(searchLower) ||
      p?.tech?.some(t => t.toLowerCase().includes(searchLower));
    
    return matchesCategory && matchesSearch;
  });

  // Sort projects
  if (sortBy === 'az') {
    processedProjects.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // 'date' -> Assuming original array is Newest First
    // We don't explicitly sort because filter() preserves original array order.
    // However, if the array was sorted A-Z, we'd lose the original order.
    // Since we re-filter from the original PROJECTS array every render, 
    // the original order is naturally preserved.
  }

  return (
    <div className="min-h-screen bg-[#080c10] pt-24 pb-24 px-6 relative">
      <div className="noise-overlay" />
      
      {/* Background Glow */}
      <div 
        className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 animate-on-scroll visible">
          <Link to="/" className="inline-flex items-center gap-2 text-textSecondary hover:text-accent font-mono text-sm mb-6 transition-colors">
            <FiArrowLeft /> Back to Home
          </Link>
          <h1 className="section-heading text-4xl md:text-5xl text-textPrimary mb-4">
            All <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-textSecondary font-mono text-sm max-w-2xl">
            Browse through my complete portfolio of {PROJECTS.length} projects, ranging from full-stack web applications to mobile apps and custom management systems.
          </p>
        </div>

        {/* Toolbar: Search, Filter, Sort */}
        <div className="glass-card p-4 rounded-2xl mb-12 flex flex-col md:flex-row gap-4 justify-between items-center animate-on-scroll visible">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary" />
            <input 
              type="text"
              placeholder="Search by name or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm font-mono text-white placeholder:text-textSecondary focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl text-xs font-display font-semibold transition-all duration-200"
                style={
                  filter === f
                    ? { background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', color: 'white' }
                    : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8b949e' }
                }
              >
                {f}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full md:w-auto flex items-center gap-3">
            <FiFilter className="text-textSecondary" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-[#00d4ff]/50 transition-colors appearance-none pr-10"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%238b949e\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
            >
              <option value="date" className="bg-[#080c10]">Date (Newest)</option>
              <option value="az" className="bg-[#080c10]">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-xs font-mono text-textSecondary uppercase tracking-wider">
            Showing {processedProjects.length} results
          </span>
        </div>

        {/* Grid */}
        {processedProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {processedProjects.map((project, i) => (
              <ProjectCard key={`${filter}-${sortBy}-${searchQuery}-${project.title}-${i}`} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glass-card rounded-2xl">
            <p className="text-textSecondary font-mono">No projects found matching your criteria.</p>
            <button 
              onClick={() => { setFilter('All'); setSearchQuery(''); }}
              className="mt-4 text-[#00d4ff] hover:underline font-mono text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
