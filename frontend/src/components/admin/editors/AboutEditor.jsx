import React, { useState } from 'react';
import AlertMessage from '../AlertMessage';
import ConfirmDialog from '../ConfirmDialog';

const AboutEditor = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });
  const [confirmDelete, setConfirmDelete] = useState({ show: false, index: null });

  const validate = () => {
    if (!formData.educationDescription?.trim()) {
      setAlert({ show: true, message: 'Description is required.', type: 'error' });
      return false;
    }
    for (let i = 0; i < formData.info.length; i++) {
      if (!formData.info[i].label?.trim() || !formData.info[i].icon?.trim()) {
        setAlert({ show: true, message: `Basic Info item ${i + 1} is missing Label or Icon.`, type: 'error' });
        return false;
      }
    }
    for (let i = 0; i < formData.education.length; i++) {
      const e = formData.education[i];
      if (!e.degree?.trim() || !e.school?.trim() || !e.year?.trim()) {
        setAlert({ show: true, message: `Education item ${i + 1} is missing required fields (Degree, Institution, Year).`, type: 'error' });
        return false;
      }
    }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    setSaving(true);
    onSave(formData);
    setAlert({ show: true, message: 'About details saved successfully!', type: 'success' });
    setTimeout(() => setSaving(false), 800);
  };

  const updateInfo = (index, key, value) => {
    const newInfo = [...formData.info];
    newInfo[index] = { ...newInfo[index], [key]: value };
    setFormData({ ...formData, info: newInfo });
  };

  const updateEducation = (index, key, value) => {
    const newEdu = [...formData.education];
    newEdu[index] = { ...newEdu[index], [key]: value };
    setFormData({ ...formData, education: newEdu });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: '', school: '', year: '', note: '' }]
    });
  };

  const deleteEducation = (index) => {
    const newEdu = [...formData.education];
    newEdu.splice(index, 1);
    const newData = { ...formData, education: newEdu };
    setFormData(newData);
    onSave(newData);
    setAlert({ show: true, message: 'Education deleted successfully!', type: 'success' });
  };

  return (
    <div className="space-y-8 pb-10">
      <AlertMessage 
        message={alert.show ? alert.message : ''} 
        type={alert.type} 
        onClose={() => setAlert({ ...alert, show: false })} 
      />
      <ConfirmDialog 
        isOpen={confirmDelete.show}
        title="Delete Education?"
        message="Are you sure you want to delete this education entry?"
        onConfirm={() => {
          if (confirmDelete.index !== null) deleteEducation(confirmDelete.index);
          setConfirmDelete({ show: false, index: null });
        }}
        onCancel={() => setConfirmDelete({ show: false, index: null })}
      />
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h2 className="text-2xl font-display font-bold text-[#00d4ff]">About Me</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 rounded-xl font-bold text-sm text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)]"
          style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Description */}
      <div className="glass-card p-6 rounded-2xl border border-white/5">
        <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00d4ff]" /> Description
        </h3>
        <textarea
          value={formData.educationDescription}
          onChange={(e) => setFormData({ ...formData, educationDescription: e.target.value })}
          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 font-body text-sm text-textPrimary focus:border-[#00d4ff]/50 outline-none transition-colors"
          rows={6}
        />
      </div>

      {/* Basic Info */}
      <div className="glass-card p-6 rounded-2xl border border-white/5">
        <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#7c3aed]" /> Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.info.map((item, idx) => (
            <div key={idx} className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-3">
              <div>
                <label className="text-xs font-mono text-textSecondary uppercase">Label</label>
                <input
                  type="text"
                  placeholder="E.g. +94 77 123 4567"
                  value={item.label}
                  onChange={(e) => updateInfo(idx, 'label', e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none focus:border-[#00d4ff] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-textSecondary uppercase">Icon (FiName)</label>
                <input
                  type="text"
                  value={item.icon}
                  onChange={(e) => updateInfo(idx, 'icon', e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none focus:border-[#00d4ff] transition-colors"
                />
              </div>
              {item.href !== undefined && (
                <div>
                  <label className="text-xs font-mono text-textSecondary uppercase">URL</label>
                  <input
                    type="text"
                    value={item.href || ''}
                    onChange={(e) => updateInfo(idx, 'href', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none focus:border-[#00d4ff] transition-colors text-[#00ff88]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="glass-card p-6 rounded-2xl border border-white/5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-display font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff88]" /> Education History
          </h3>
          <button onClick={addEducation} className="text-xs font-mono px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10">
            + Add Education
          </button>
        </div>
        
        <div className="space-y-4">
          {formData.education.map((edu, idx) => (
            <div key={idx} className="bg-black/30 p-4 rounded-xl border border-white/5 relative group">
              <button 
                onClick={() => setConfirmDelete({ show: true, index: idx })}
                className="absolute top-4 right-4 text-xs font-mono text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
              >
                Delete
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="text-xs font-mono text-textSecondary uppercase">Degree/Title</label>
                  <input
                    type="text"
                    placeholder="BSc Computer Science"
                    value={edu.degree}
                    onChange={(e) => updateEducation(idx, 'degree', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none focus:border-[#00d4ff] font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-textSecondary uppercase">Institution</label>
                  <input
                    type="text"
                    placeholder="University of Colombo"
                    value={edu.school}
                    onChange={(e) => updateEducation(idx, 'school', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none focus:border-[#00d4ff]"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-textSecondary uppercase">Year</label>
                  <input
                    type="text"
                    placeholder="2020 - 2024"
                    value={edu.year}
                    onChange={(e) => updateEducation(idx, 'year', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none focus:border-[#00d4ff] text-[#00d4ff]"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-textSecondary uppercase">Badge Note (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. First Class"
                    value={edu.note || ''}
                    onChange={(e) => updateEducation(idx, 'note', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-1 text-sm outline-none focus:border-[#00d4ff] text-[#00ff88]"
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

export default AboutEditor;
