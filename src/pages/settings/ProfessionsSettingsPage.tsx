import { motion } from "framer-motion";
import { Briefcase, Plus, ArrowLeft } from "lucide-react";
import IconPicker from "@/components/IconPicker";
import BottomSheet from "@/components/BottomSheet";
import PageHeader from "@/components/PageHeader";
import GameCard from "@/components/GameCard";
import LucideIcon from "@/components/LucideIcon";
import CoinBadge from "@/components/CoinBadge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockProfessions } from "@/data/mockData";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const ProfessionsSettingsPage = () => {
  const navigate = useNavigate();
  const [professions, setProfessions] = useState(mockProfessions.map(p => ({ ...p })));
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newGoal, setNewGoal] = useState("500");
  const [newDesc, setNewDesc] = useState("");
  const [newIcon, setNewIcon] = useState("Briefcase");

  const handleAdd = () => {
    if (!newName) return;
    setProfessions([...professions, { id: Date.now().toString(), name: newName, icon: newIcon, goal: parseInt(newGoal) || 500, earned: 0, description: newDesc, mastered: false }]);
    setNewName(""); setNewGoal("500"); setNewDesc(""); setNewIcon("Briefcase"); setShowForm(false);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 space-y-4">
      <PageHeader title="Профессии" icon={<Briefcase size={24} className="text-white/70" />} hideNavIcons
        leftContent={<button onClick={() => navigate("/settings")} className="p-1.5 rounded-lg text-white/60 hover:text-white"><ArrowLeft size={22} /></button>}
      />

      <motion.div variants={item} className="space-y-2">
        {professions.map((prof) => (
          <GameCard key={prof.id} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <LucideIcon name={prof.icon} size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-900">{prof.name}</h3>
              <p className="text-[10px] text-gray-400">{prof.description}</p>
            </div>
            <CoinBadge amount={prof.goal} size="sm" />
          </GameCard>
        ))}
      </motion.div>

      <motion.div variants={item}>
        <button onClick={() => setShowForm(true)} className="w-full h-12 rounded-2xl border-2 border-dashed border-gray-300 text-gray-400 font-semibold text-sm flex items-center justify-center gap-2">
          <Plus size={18} /> Добавить профессию
        </button>
      </motion.div>

      <BottomSheet open={showForm} onClose={() => setShowForm(false)} title="Новая профессия">
        <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Название профессии" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
        <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Описание" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
        <input value={newGoal} onChange={e => setNewGoal(e.target.value)} placeholder="Порог FIN" type="number" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
        <IconPicker value={newIcon} onChange={setNewIcon} label="Иконка профессии" />
        <button onClick={handleAdd} className="w-full h-11 rounded-xl bg-primary text-white font-bold text-sm">Добавить</button>
      </BottomSheet>
    </motion.div>
  );
};

export default ProfessionsSettingsPage;

