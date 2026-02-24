import { motion, AnimatePresence } from "framer-motion";
import avatarImg from "@/assets/avatar-child.jpg";
import avatarBoy1 from "@/assets/avatar-boy1.jpg";
import avatarBoy2 from "@/assets/avatar-boy2.jpg";
import avatarGirl1 from "@/assets/avatar-girl1.jpg";
import avatarGirl2 from "@/assets/avatar-girl2.jpg";
import { Hand, Flame, BarChart3, Gift, Users, ChevronDown, X, Check } from "lucide-react";

const avatarMap: Record<string, string> = {
  "avatar-child": avatarImg,
  "avatar-boy1": avatarBoy1,
  "avatar-boy2": avatarBoy2,
  "avatar-girl1": avatarGirl1,
  "avatar-girl2": avatarGirl2,
};
import GameCard from "@/components/GameCard";
import CoinBadge from "@/components/CoinBadge";
import DreamProgress from "@/components/DreamProgress";
import TaskCard from "@/components/TaskCard";
import SkillBar from "@/components/SkillBar";
import ProgressRing from "@/components/ProgressRing";
import LucideIcon from "@/components/LucideIcon";
import PageHeader from "@/components/PageHeader";
import BalanceSummary from "@/components/BalanceSummary";
import { mockUser, mockAccounts, mockDream, mockTasks, mockSkills, dailyMission } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserRole } from "@/contexts/UserRoleContext";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(mockTasks);
  const { role, children, selectedChildId, setSelectedChildId } = useUserRole();
  const [showChildPicker, setShowChildPicker] = useState(false);
  const selectedChild = children.find(c => c.id === selectedChildId);

  const todayTasks = tasks.slice(0, 3);
  const completedToday = todayTasks.filter((t) => t.completed).length;
  const totalBalance = mockAccounts.filter(a => a.currency === "FIN").reduce((s, a) => s + a.balance, 0);

  const handleComplete = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="pb-24 space-y-4"
    >
      
      <PageHeader title={role === "parent" ? "Кабинет родителя" : `Привет, ${mockUser.name}!`} icon={<Hand size={20} className="text-coin" />}>
        {role === "parent" && (
          <div className="mt-3">
            <button
              onClick={() => setShowChildPicker(true)}
              className="bg-white/15 px-4 py-2 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2"
            >
              {selectedChild?.name || "Выберите ребёнка"} <ChevronDown size={16} />
            </button>
          </div>
        )}
        <div className="flex items-center gap-3 mt-3">
          <img src={avatarImg} alt="Аватар" className="w-12 h-12 rounded-2xl object-cover" />
          <div className="flex-1">
            <p className="text-xs text-white/60">{mockUser.profession} · Ранг: {mockUser.rank}</p>
          </div>
          <span className="bg-white/15 px-3 py-1.5 rounded-full text-xs font-bold text-coin inline-flex items-center gap-1">
            <Flame size={14} /> {mockUser.streak} дн.
          </span>
        </div>

        <BalanceSummary />
      </PageHeader>

      
      <motion.div variants={item}>
        <GameCard>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <LucideIcon name={dailyMission.icon} size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-gray-900">{dailyMission.title}</h3>
              <p className="text-xs text-gray-500">{dailyMission.description}</p>
            </div>
            <CoinBadge amount={dailyMission.reward} size="sm" />
          </div>
        </GameCard>
      </motion.div>

      
      <motion.div variants={item}>
        <GameCard onClick={() => navigate("/dream")}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-sm text-gray-900">Моя цель</h2>
            <span className="text-xs text-primary font-semibold">Подробнее →</span>
          </div>
          <DreamProgress dream={mockDream} compact />
        </GameCard>
      </motion.div>

      
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-gray-900">Задания на сегодня</h2>
          <button onClick={() => navigate("/tasks")} className="text-xs text-primary font-semibold">
            Все задания →
          </button>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <ProgressRing progress={(completedToday / todayTasks.length) * 100} size={44} strokeWidth={3.5}>
            <span className="text-[10px] font-bold text-gray-500">{completedToday}/{todayTasks.length}</span>
          </ProgressRing>
          <p className="text-xs text-gray-500">
            {completedToday === todayTasks.length ? "Все выполнено!" : "Ещё немного!"}
          </p>
        </div>
        <div className="space-y-2">
          {todayTasks.map((task) => (
            <TaskCard key={task.id} task={task} onComplete={handleComplete} />
          ))}
        </div>
      </motion.div>

      
      <motion.div variants={item}>
        <GameCard>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm text-gray-900 inline-flex items-center gap-1.5">
              Лучшие навыки <LucideIcon name="Brain" size={16} className="text-primary" />
            </h2>
            <button onClick={() => navigate("/profile#skills")} className="text-xs text-primary font-semibold">Все навыки</button>
          </div>
          <div className="space-y-3">
            {mockSkills.slice(0, 3).map((skill) => (
              <SkillBar key={skill.id} skill={skill} />
            ))}
          </div>
        </GameCard>
      </motion.div>

      
      <motion.div variants={item}>
        <div className="grid grid-cols-3 gap-2">
          {[
            { Icon: BarChart3, label: "Отчёт", path: "/wallet" },
            { Icon: Gift, label: "Подарок дня", path: "/friends" },
            { Icon: Users, label: "Друзья", path: "/friends" },
          ].map((action) => (
            <GameCard
              key={action.label}
              onClick={() => navigate(action.path)}
              className="flex items-center justify-center py-5"
            >
              <action.Icon size={32} className="text-primary" />
            </GameCard>
          ))}
        </div>
      </motion.div>

      
      <AnimatePresence>
        {showChildPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
            onClick={() => setShowChildPicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm bg-white rounded-3xl p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-gray-900">Выберите ребёнка</h3>
                <button onClick={() => setShowChildPicker(false)} className="p-1 text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <div className="space-y-2">
                {children.map(child => (
                  <button
                    key={child.id}
                    onClick={() => { setSelectedChildId(child.id); setShowChildPicker(false); }}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                      child.id === selectedChildId
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <img
                      src={child.avatar ? avatarMap[child.avatar] || avatarImg : avatarImg}
                      alt={child.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-sm text-gray-900">{child.name}</h4>
                      <p className="text-[10px] text-gray-400">{child.gender === "male" ? "Мальчик" : "Девочка"} · {child.age} лет</p>
                    </div>
                    {child.id === selectedChildId && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;

