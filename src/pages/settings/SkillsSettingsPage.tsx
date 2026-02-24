import { motion } from "framer-motion";
import { Brain, Plus, ArrowLeft, Trash2 } from "lucide-react";
import IconPicker from "@/components/IconPicker";
import BottomSheet from "@/components/BottomSheet";
import PageHeader from "@/components/PageHeader";
import GameCard from "@/components/GameCard";
import LucideIcon from "@/components/LucideIcon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockSkills } from "@/data/mockData";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const SkillsSettingsPage = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(mockSkills.map(s => ({ ...s })));
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newMax, setNewMax] = useState("10");
  const [newIcon, setNewIcon] = useState("Zap");

  const handleAdd = () => {
    if (!newName) return;
    setSkills([...skills, { id: Date.now().toString(), name: newName, level: 0, maxLevel: parseInt(newMax) || 10, icon: newIcon }]);
    setNewName(""); setNewMax("10"); setNewIcon("Zap"); setShowForm(false);
  };

  const handleRemove = (id: string) => setSkills(skills.filter(s => s.id !== id));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 space-y-4">
      <PageHeader title="Навыки" icon={<Brain size={24} className="text-white/70" />} hideNavIcons
        leftContent={<button onClick={() => navigate("/settings")} className="p-1.5 rounded-lg text-white/60 hover:text-white"><ArrowLeft size={22} /></button>}
      />

      <motion.div variants={item} className="space-y-2">
        {skills.map((skill) => (
          <GameCard key={skill.id} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <LucideIcon name={skill.icon} size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-900">{skill.name}</h3>
              <p className="text-[10px] text-gray-400">Макс. уровень: {skill.maxLevel}</p>
            </div>
            <button onClick={() => handleRemove(skill.id)} className="p-1.5 text-gray-300 hover:text-destructive"><Trash2 size={16} /></button>
          </GameCard>
        ))}
      </motion.div>

      <motion.div variants={item}>
        <button onClick={() => setShowForm(true)} className="w-full h-12 rounded-2xl border-2 border-dashed border-gray-300 text-gray-400 font-semibold text-sm flex items-center justify-center gap-2">
          <Plus size={18} /> Добавить навык
        </button>
      </motion.div>

      <BottomSheet open={showForm} onClose={() => setShowForm(false)} title="Новый навык">
        <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Название навыка" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
        <input value={newMax} onChange={e => setNewMax(e.target.value)} placeholder="Макс. уровень" type="number" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
        <IconPicker value={newIcon} onChange={setNewIcon} label="Иконка навыка" />
        <button onClick={handleAdd} className="w-full h-11 rounded-xl bg-primary text-white font-bold text-sm">Добавить</button>
      </BottomSheet>
    </motion.div>
  );
};

export default SkillsSettingsPage;

