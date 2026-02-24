import { motion } from "framer-motion";
import { Settings, Baby, Brain, Briefcase, ClipboardList, ArrowLeftRight, Heart, Target, Tag, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import GameCard from "@/components/GameCard";
import { useNavigate } from "react-router-dom";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const settingsItems = [
  { path: "/settings/children", icon: Baby, label: "Дети", desc: "Добавить и управлять профилями детей" },
  { path: "/settings/skills", icon: Brain, label: "Навыки", desc: "Настроить навыки и пороги достижений" },
  { path: "/settings/professions", icon: Briefcase, label: "Профессии", desc: "Управлять профессиями и порогами" },
  { path: "/settings/tasks", icon: ClipboardList, label: "Задания", desc: "Создавать и управлять заданиями" },
  { path: "/settings/currency", icon: ArrowLeftRight, label: "Курс валют", desc: "Настроить курс FIN к рублю" },
  { path: "/settings/charity", icon: Heart, label: "Благотворительность", desc: "Настроить процент отчислений" },
  { path: "/settings/goals", icon: Target, label: "Набор целей", desc: "Управлять целями и уровнями сложности" },
  { path: "/settings/categories", icon: Tag, label: "Категории", desc: "Категории доходов и расходов ребёнка" },
];

const ParentSettingsPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 space-y-4">
      <PageHeader title="Настройки" icon={<Settings size={24} className="text-white/70" />} hideNavIcons />

      <motion.div variants={item} className="space-y-2">
        {settingsItems.map((s) => (
          <GameCard key={s.path} onClick={() => navigate(s.path)} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <s.icon size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-gray-900">{s.label}</h3>
              <p className="text-[10px] text-gray-400">{s.desc}</p>
            </div>
            <ChevronRight size={18} className="text-gray-300 shrink-0" />
          </GameCard>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ParentSettingsPage;

