import React, { useState } from 'react';
import AlertMessage from '../AlertMessage';
import ConfirmDialog from '../ConfirmDialog';

const SkillsEditor = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });
  const [confirmDelete, setConfirmDelete] = useState({ show: false, catIdx: null, skillIdx: null });

  const validate = () => {
    for (let c = 0; c < formData.skillCategories.length; c++) {
      const cat = formData.skillCategories[c];
      if (!cat.title?.trim()) {
        setAlert({ show: true, message: `Skill category ${c + 1} is missing a title.`, type: 'error' });
        return false;
      }
      for (let s = 0; s < cat.skills.length; s++) {
        if (!cat.skills[s].name?.trim()) {
          setAlert({ show: true, message: `Skill ${s + 1} in category "${cat.title}" is missing a name.`, type: 'error' });
          return false;
        }
      }
    }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    setSaving(true);
    onSave(formData);
    setAlert({ show: true, message: 'Skills saved successfully!', type: 'success' });
    setTimeout(() => setSaving(false), 800);
  };

  const updateCategoryTitle = (catIdx, value) => {
    const newCats = [...formData.skillCategories];
    newCats[catIdx].title = value;
    setFormData({ ...formData, skillCategories: newCats });
  };

  const updateSkill = (catIdx, skillIdx, key, value) => {
    const newCats = [...formData.skillCategories];
    const parsedValue = key === 'level' ? parseInt(value) || 0 : value;
    newCats[catIdx].skills[skillIdx] = { ...newCats[catIdx].skills[skillIdx], [key]: parsedValue };
    setFormData({ ...formData, skillCategories: newCats });
  };

  const addSkill = (catIdx) => {
    const newCats = [...formData.skillCategories];
    newCats[catIdx].skills.push({ name: '', level: 50 });
    setFormData({ ...formData, skillCategories: newCats });
  };

  const deleteSkill = (catIdx, skillIdx) => {
    const newCats = [...formData.skillCategories];
    newCats[catIdx].skills.splice(skillIdx, 1);
    const newData = { ...formData, skillCategories: newCats };
    setFormData(newData);
    onSave(newData);
    setAlert({ show: true, message: 'Skill deleted successfully!', type: 'success' });
  };

  const updateOtherTech = (value) => {
    // Convert comma separated string to array
    const newTech = value.split(',').map(s => s.trim()).filter(Boolean);
    setFormData({ ...formData, otherTech: newTech });
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
        title="Delete Skill?"
        message="Are you sure you want to delete this skill?"
        onConfirm={() => {
          if (confirmDelete.catIdx !== null && confirmDelete.skillIdx !== null) {
            deleteSkill(confirmDelete.catIdx, confirmDelete.skillIdx);
          }
          setConfirmDelete({ show: false, catIdx: null, skillIdx: null });
        }}
        onCancel={() => setConfirmDelete({ show: false, catIdx: null, skillIdx: null })}
      />
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h2 className="text-2xl font-display font-bold text-[#00d4ff]">Technical Skills</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 rounded-xl font-bold text-sm text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)]"
          style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formData.skillCategories.map((cat, catIdx) => (
          <div key={catIdx} className="glass-card p-6 rounded-2xl border border-white/5 relative">
            <div className="flex items-center gap-3 mb-6">
              <input
                type="color"
                value={cat.color}
                onChange={(e) => {
                  const newCats = [...formData.skillCategories];
                  newCats[catIdx].color = e.target.value;
                  setFormData({ ...formData, skillCategories: newCats });
                }}
                className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
              />
              <input
                type="text"
                placeholder="Category Title"
                value={cat.title}
                onChange={(e) => updateCategoryTitle(catIdx, e.target.value)}
                className="bg-transparent text-lg font-display font-bold outline-none border-b border-dashed border-white/20 focus:border-[#00d4ff] pb-1 w-full"
                style={{ color: cat.color }}
              />
            </div>

            <div className="space-y-4">
              {cat.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="bg-black/40 p-3 rounded-lg border border-white/5 relative group">
                  <button 
                    onClick={() => setConfirmDelete({ show: true, catIdx, skillIdx })}
                    className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                  <div className="flex justify-between items-center mb-2">
                    <input
                      type="text"
                      placeholder="Skill name"
                      value={skill.name}
                      onChange={(e) => updateSkill(catIdx, skillIdx, 'name', e.target.value)}
                      className="bg-transparent outline-none text-sm font-body w-2/3 focus:border-b border-white/20"
                    />
                    <span className="text-xs font-mono" style={{ color: cat.color }}>{skill.level}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) => updateSkill(catIdx, skillIdx, 'level', e.target.value)}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00d4ff]"
                    style={{ accentColor: cat.color }}
                  />
                </div>
              ))}
              <button 
                onClick={() => addSkill(catIdx)}
                className="w-full py-2 text-xs font-mono border border-dashed border-white/20 rounded-lg hover:bg-white/5 transition-colors"
                style={{ color: cat.color }}
              >
                + Add Skill
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 rounded-2xl border border-white/5">
        <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b]" /> Other Technologies (Tag Cloud)
        </h3>
        <p className="text-xs text-textSecondary font-mono mb-2">Separate tags with commas</p>
        <textarea
          value={formData.otherTech.join(', ')}
          onChange={(e) => updateOtherTech(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 font-mono text-sm text-[#00ff88] focus:border-[#00d4ff]/50 outline-none transition-colors"
          rows={3}
        />
        <div className="flex flex-wrap gap-2 mt-4">
          {formData.otherTech.map(tech => (
             <span key={tech} className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-textSecondary">
               {tech}
             </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsEditor;
