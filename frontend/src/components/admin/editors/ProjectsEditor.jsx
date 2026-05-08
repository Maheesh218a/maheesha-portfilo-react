import React, { useState } from 'react';

const ProjectsEditor = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);
  const [saving, setSaving] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = () => {
    setSaving(true);
    onSave(formData);
    setTimeout(() => setSaving(false), 800);
  };

  const addProject = () => {
    const newProject = {
      title: 'New Project',
      subtitle: 'Subtitle',
      description: 'Describe the project...',
      tech: ['React', 'Node'],
      github: '#',
      live: null,
      category: 'Web',
      icon: 'FiGlobe',
      color: '#00d4ff',
      features: ['Feature 1', 'Feature 2']
    };
    setFormData([newProject, ...formData]);
    setEditingIndex(0);
  };

  const deleteProject = (index) => {
    const newData = [...formData];
    newData.splice(index, 1);
    setFormData(newData);
    if (editingIndex === index) setEditingIndex(null);
  };

  const updateProject = (index, key, value) => {
    const newData = [...formData];
    newData[index] = { ...newData[index], [key]: value };
    setFormData(newData);
  };

  const updateArrayField = (index, key, value) => {
    const arr = value.split(',').map(s => s.trim()).filter(Boolean);
    updateProject(index, key, arr);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h2 className="text-2xl font-display font-bold text-[#00d4ff]">Featured Projects</h2>
        <div className="flex gap-3">
          <button
            onClick={addProject}
            className="px-4 py-2 rounded-xl font-mono text-sm border border-white/20 hover:bg-white/10 transition-colors"
          >
            + Add Project
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 rounded-xl font-bold text-sm text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)]"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project List */}
        <div className="lg:col-span-1 space-y-3">
          {formData.map((project, idx) => (
            <div 
              key={idx}
              onClick={() => setEditingIndex(idx)}
              className={`p-4 rounded-xl cursor-pointer border transition-all ${editingIndex === idx ? 'bg-white/10 border-white/30' : 'bg-black/30 border-white/5 hover:border-white/15'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                <div>
                  <h4 className="font-display font-bold text-sm text-textPrimary truncate">{project.title}</h4>
                  <p className="text-xs font-mono text-textSecondary">{project.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Editor */}
        <div className="lg:col-span-2">
          {editingIndex !== null && formData[editingIndex] ? (
            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-5 relative">
              <button 
                onClick={() => deleteProject(editingIndex)}
                className="absolute top-6 right-6 text-xs font-mono text-red-400 hover:underline px-3 py-1 rounded bg-red-500/10 border border-red-500/20"
              >
                Delete Project
              </button>
              
              <h3 className="text-xl font-display font-bold text-[#00d4ff] mb-6 border-b border-white/10 pb-2">Edit Project</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-mono text-textSecondary uppercase">Title</label>
                  <input
                    type="text"
                    value={formData[editingIndex].title}
                    onChange={(e) => updateProject(editingIndex, 'title', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 mt-1 text-sm outline-none focus:border-[#00d4ff]"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-mono text-textSecondary uppercase">Subtitle</label>
                  <input
                    type="text"
                    value={formData[editingIndex].subtitle}
                    onChange={(e) => updateProject(editingIndex, 'subtitle', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 mt-1 text-sm outline-none focus:border-[#00d4ff]"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="text-xs font-mono text-textSecondary uppercase">Description</label>
                  <textarea
                    value={formData[editingIndex].description}
                    onChange={(e) => updateProject(editingIndex, 'description', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 mt-1 text-sm outline-none focus:border-[#00d4ff]"
                    rows={3}
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-mono text-textSecondary uppercase">Category</label>
                  <select
                    value={formData[editingIndex].category}
                    onChange={(e) => updateProject(editingIndex, 'category', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 mt-1 text-sm outline-none focus:border-[#00d4ff] text-white"
                  >
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Desktop">Desktop</option>
                  </select>
                </div>
                
                <div className="col-span-2 sm:col-span-1 flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-mono text-textSecondary uppercase">Icon (FiName)</label>
                    <input
                      type="text"
                      value={formData[editingIndex].icon}
                      onChange={(e) => updateProject(editingIndex, 'icon', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 mt-1 text-sm outline-none focus:border-[#00d4ff]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-textSecondary uppercase">Color</label>
                    <input
                      type="color"
                      value={formData[editingIndex].color}
                      onChange={(e) => updateProject(editingIndex, 'color', e.target.value)}
                      className="w-full h-9 bg-black/40 border border-white/10 rounded-lg mt-1 p-0.5 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-mono text-textSecondary uppercase">GitHub Link</label>
                  <input
                    type="text"
                    value={formData[editingIndex].github || ''}
                    onChange={(e) => updateProject(editingIndex, 'github', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 mt-1 text-sm outline-none focus:border-[#00d4ff] text-[#00d4ff]"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-mono text-textSecondary uppercase">Live URL (optional)</label>
                  <input
                    type="text"
                    value={formData[editingIndex].live || ''}
                    onChange={(e) => updateProject(editingIndex, 'live', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 mt-1 text-sm outline-none focus:border-[#00d4ff] text-[#00ff88]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-mono text-textSecondary uppercase">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={formData[editingIndex].tech.join(', ')}
                    onChange={(e) => updateArrayField(editingIndex, 'tech', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 mt-1 text-sm outline-none focus:border-[#00d4ff]"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="text-xs font-mono text-textSecondary uppercase">Key Features (comma separated)</label>
                  <input
                    type="text"
                    value={formData[editingIndex].features.join(', ')}
                    onChange={(e) => updateArrayField(editingIndex, 'features', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 mt-1 text-sm outline-none focus:border-[#00d4ff]"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-textSecondary font-mono text-sm">
              Select a project to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsEditor;
