import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortfolioContext } from '../../context/PortfolioContext';
import AboutEditor from './editors/AboutEditor';
import SkillsEditor from './editors/SkillsEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import ExperienceEditor from './editors/ExperienceEditor';
import ContactEditor from './editors/ContactEditor';

const AdminPanel = () => {
  const { data, updateData } = useContext(PortfolioContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('About');

  if (!data) return null;

  const tabs = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'About': return <AboutEditor data={data.about} onSave={(newData) => updateData('about', newData)} />;
      case 'Skills': return <SkillsEditor data={data.skills} onSave={(newData) => updateData('skills', newData)} />;
      case 'Projects': return <ProjectsEditor data={data.projects} onSave={(newData) => updateData('projects', newData)} />;
      case 'Experience': return <ExperienceEditor data={data.experience} onSave={(newData) => updateData('experience', newData)} />;
      case 'Contact': return <ContactEditor data={data.contact} onSave={(newData) => updateData('contact', newData)} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex overflow-hidden" style={{ cursor: 'auto' }}>
      <div className="noise-overlay" />
      
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 border-r border-white/10 flex flex-col relative z-20 backdrop-blur-md hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-display font-black">
            Admin <span className="gradient-text">Panel</span>
          </h1>
          <p className="text-xs text-textSecondary font-mono mt-1">Creative Mode</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl font-display font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(0,212,255,0.2)] border border-white/20'
                  : 'text-textSecondary hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => navigate('/')}
            className="w-full px-4 py-3 rounded-xl font-mono text-sm border border-white/20 hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
          >
            Exit to Portfolio
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 h-screen overflow-y-auto custom-scrollbar">
        {/* Glow effect behind content */}
        <div 
          className="fixed top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 60%)' }}
        />
        
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-xl font-display font-black">
            Admin <span className="gradient-text">Panel</span>
          </h1>
          <button onClick={() => navigate('/')} className="text-xs font-mono border border-white/20 px-3 py-1.5 rounded-lg">
            Exit
          </button>
        </div>
        
        {/* Mobile Tabs */}
        <div className="md:hidden flex overflow-x-auto p-4 gap-2 border-b border-white/5 no-scrollbar bg-[#0a0a0a] sticky top-[65px] z-20">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab ? 'bg-white/10 text-white border border-white/20' : 'text-textSecondary bg-black/50 border border-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-12 flex-1 max-w-5xl mx-auto w-full">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
