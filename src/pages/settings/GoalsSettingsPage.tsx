import { motion } from "framer-motion";
import { Target, Plus, ArrowLeft, Trash2 } from "lucide-react";
import IconPicker from "@/components/IconPicker";
import BottomSheet from "@/components/BottomSheet";
import LucideIcon from "@/components/LucideIcon";
import PageHeader from "@/components/PageHeader";
import GameCard from "@/components/GameCard";
import CoinBadge from "@/components/CoinBadge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

type Difficulty = "easy" | "medium" | "hard";
const diffColors: Record<Difficulty, string> = { easy: "bg-green-100 text-green-700", medium: "bg-blue-100 text-blue-700", hard: "bg-red-100 text-red-700" };
const diffLabels: Record<Difficulty, string> = { easy: "Лёгкая", medium: "Средняя", hard: "Тяжёлая" };

interface Goal { id: string; name: string; amount: number; difficulty: Difficulty; icon: string; }

const GoalsSettingsPage = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", name: "Проектор для кино", amount: 3000, difficulty: "hard", icon: "Clapperboard" },
    { id: "2", name: "Новые наушники", amount: 800, difficulty: "medium", icon: "Headphones" },
    { id: "3", name: "Книга", amount: 200, difficulty: "easy", icon: "BookOpen" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("1000");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [icon, setIcon] = useState("Target");

  const handleAdd = () => {
    if (!name) return;
    setGoals([...goals, { id: Date.now().toString(), name, amount: parseInt(amount) || 1000, difficulty, icon }]);
    setName(""); setAmount("1000"); setIcon("Target"); setShowForm(false);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 space-y-4">
      <PageHeader title="Набор целей" icon={<Target size={24} className="text-white/70" />} hideNavIcons
        leftContent={<button onClick={() => navigate("/settings")} className="p-1.5 rounded-lg text-white/60 hover:text-white"><ArrowLeft size={22} /></button>}
      />

      <motion.div variants={item} className="space-y-2">
        {goals.map((goal) => (
          <GameCard key={goal.id} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <LucideIcon name={goal.icon} size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-gray-900">{goal.name}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${diffColors[goal.difficulty]}`}>{diffLabels[goal.difficulty]}</span>
              </div>
            </div>
            <CoinBadge amount={goal.amount} size="sm" />
            <button onClick={() => setGoals(goals.filter(g => g.id !== goal.id))} className="p-1.5 text-gray-300 hover:text-destructive"><Trash2 size={16} /></button>
          </GameCard>
        ))}
      </motion.div>

      <motion.div variants={item}>
        <button onClick={() => setShowForm(true)} className="w-full h-12 rounded-2xl border-2 border-dashed border-gray-300 text-gray-400 font-semibold text-sm flex items-center justify-center gap-2">
          <Plus size={18} /> Добавить цель
        </button>
      </motion.div>

      <BottomSheet open={showForm} onClose={() => setShowForm(false)} title="Новая цель">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Название цели" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
        <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Сумма FIN" type="number" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
        <IconPicker value={icon} onChange={setIcon} label="Иконка цели" />
        <div className="flex gap-2">
          {(["easy", "medium", "hard"] as Difficulty[]).map(d => (
            <button key={d} onClick={() => setDifficulty(d)} className={`flex-1 h-10 rounded-xl text-xs font-semibold ${difficulty === d ? diffColors[d] + " ring-2 ring-offset-1" : "border border-gray-200 text-gray-500"}`}>
              {diffLabels[d]}
            </button>
          ))}
        </div>
        <button onClick={handleAdd} className="w-full h-11 rounded-xl bg-primary text-white font-bold text-sm">Добавить цель</button>
      </BottomSheet>
    </motion.div>
  );
};

export default GoalsSettingsPage;

