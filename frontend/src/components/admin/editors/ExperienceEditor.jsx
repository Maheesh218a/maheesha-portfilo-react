import React, { useState } from 'react';

const ExperienceEditor = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    onSave(formData);
    setTimeout(() => setSaving(false), 800);
  };

  const updateExp = (index, key, value) => {
    const newExps = [...formData.experiences];
    newExps[index] = { ...newExps[index], [key]: value };
    setFormData({ ...formData, experiences: newExps });
  };

  const updateExpHighlights = (index, value) => {
    const arr = value.split('\n').filter(Boolean);
    updateExp(index, 'highlights', arr);
  };

  const addExp = () => {
    const newExp = {
      role: 'New Role', company: 'Company Name', period: 'Date - Date', type: 'Full-time', color: '#00d4ff', highlights: ['Responsibility 1']
    };
    setFormData({ ...formData, experiences: [newExp, ...formData.experiences] });
  };

  const deleteExp = (index) => {
    const newExps = [...formData.experiences];
    newExps.splice(index, 1);
    setFormData({ ...formData, experiences: newExps });
  };

  const updateCert = (index, key, value) => {
    const newCerts = [...formData.certifications];
    newCerts[index] = { ...newCerts[index], [key]: value };
    setFormData({ ...formData, certifications: newCerts });
  };

  const addCert = () => {
    const newCert = { title: 'New Certification', issuer: 'Issuer Name', color: '#7c3aed' };
    setFormData({ ...formData, certifications: [...formData.certifications, newCert] });
  };

  const deleteCert = (index) => {
    const newCerts = [...formData.certifications];
    newCerts.splice(index, 1);
    setFormData({ ...formData, certifications: newCerts });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h2 className="text-2xl font-display font-bold text-[#00d4ff]">Work & Certifications</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 rounded-xl font-bold text-sm text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)]"
          style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Work Experience */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-display font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00d4ff]" /> Work History
            </h3>
            <button onClick={addExp} className="text-xs font-mono px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10">
              + Add Work
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.experiences.map((exp, idx) => (
              <div key={idx} className="glass-card p-5 rounded-2xl border border-white/5 relative group">
                <button 
                  onClick={() => deleteExp(idx)}
                  className="absolute top-4 right-4 text-xs font-mono text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                >
                  Delete
                </button>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-mono text-textSecondary uppercase">Role</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExp(idx, 'role', e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none focus:border-[#00d4ff] font-bold"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-mono text-textSecondary uppercase">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExp(idx, 'company', e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none focus:border-[#00d4ff]"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-mono text-textSecondary uppercase">Period</label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => updateExp(idx, 'period', e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none focus:border-[#00d4ff]"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-1 flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs font-mono text-textSecondary uppercase">Type</label>
                      <input
                        type="text"
                        value={exp.type}
                        onChange={(e) => updateExp(idx, 'type', e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none focus:border-[#00d4ff]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-textSecondary uppercase">Color</label>
                      <input
                        type="color"
                        value={exp.color}
                        onChange={(e) => updateExp(idx, 'color', e.target.value)}
                        className="w-full h-8 bg-transparent border-b border-white/10 py-1 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-mono text-textSecondary uppercase">Highlights (1 per line)</label>
                    <textarea
                      value={exp.highlights.join('\n')}
                      onChange={(e) => updateExpHighlights(idx, e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 mt-1 text-sm outline-none focus:border-[#00d4ff]"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-display font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7c3aed]" /> Certifications
            </h3>
            <button onClick={addCert} className="text-xs font-mono px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10">
              + Add Cert
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.certifications.map((cert, idx) => (
              <div key={idx} className="glass-card p-4 rounded-xl border border-white/5 relative group flex gap-3 items-center">
                <input
                  type="color"
                  value={cert.color}
                  onChange={(e) => updateCert(idx, 'color', e.target.value)}
                  className="w-8 h-8 rounded shrink-0 cursor-pointer bg-transparent border-0 p-0"
                />
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={cert.title}
                    onChange={(e) => updateCert(idx, 'title', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 pb-1 text-sm outline-none focus:border-[#00d4ff] font-bold"
                    placeholder="Certificate Title"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCert(idx, 'issuer', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 pb-1 text-xs font-mono outline-none focus:border-[#00d4ff] text-textSecondary"
                    placeholder="Issuer"
                  />
                </div>
                <button 
                  onClick={() => deleteCert(idx)}
                  className="w-8 h-8 rounded-full bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shrink-0"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceEditor;
