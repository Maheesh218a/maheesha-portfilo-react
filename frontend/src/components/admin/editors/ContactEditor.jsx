import React, { useState } from 'react';

const ContactEditor = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    onSave(formData);
    setTimeout(() => setSaving(false), 800);
  };

  const updateSocial = (index, key, value) => {
    const newSocial = [...formData.social];
    newSocial[index] = { ...newSocial[index], [key]: value };
    setFormData({ ...formData, social: newSocial });
  };

  const addSocial = () => {
    const newLink = { name: 'New Link', href: '#', color: '#00d4ff', icon: 'FiGlobe' };
    setFormData({ ...formData, social: [...formData.social, newLink] });
  };

  const deleteSocial = (index) => {
    const newSocial = [...formData.social];
    newSocial.splice(index, 1);
    setFormData({ ...formData, social: newSocial });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h2 className="text-2xl font-display font-bold text-[#00d4ff]">Contact & Socials</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 rounded-xl font-bold text-sm text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)]"
          style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Primary Contact */}
      <div className="glass-card p-6 rounded-2xl border border-white/5 max-w-md">
        <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00d4ff]" /> Primary Email
        </h3>
        <div>
          <label className="text-xs font-mono text-textSecondary uppercase mb-1 block">Email Address (Receives messages)</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-sm text-[#00d4ff] focus:border-[#00d4ff]/50 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="glass-card p-6 rounded-2xl border border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-display font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7c3aed]" /> Social Profiles
          </h3>
          <button onClick={addSocial} className="text-xs font-mono px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10">
            + Add Link
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {formData.social.map((link, idx) => (
            <div key={idx} className="bg-black/30 p-4 rounded-xl border border-white/5 relative group">
              <button 
                onClick={() => deleteSocial(idx)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
              >
                ✕
              </button>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={link.color}
                    onChange={(e) => updateSocial(idx, 'color', e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0 shrink-0"
                  />
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => updateSocial(idx, 'name', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none focus:border-[#00d4ff] font-bold"
                    style={{ color: link.color }}
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-textSecondary uppercase">URL</label>
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => updateSocial(idx, 'href', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none focus:border-[#00d4ff] text-[#00ff88]"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-textSecondary uppercase">Icon (FiName)</label>
                  <input
                    type="text"
                    value={link.icon}
                    onChange={(e) => updateSocial(idx, 'icon', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none focus:border-[#00d4ff]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactEditor;
