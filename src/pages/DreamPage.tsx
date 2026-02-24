import { motion } from "framer-motion";
import { Star, Sparkles, Stars, Check } from "lucide-react";
import GameCard from "@/components/GameCard";
import DreamProgress from "@/components/DreamProgress";
import CoinBadge from "@/components/CoinBadge";
import LucideIcon from "@/components/LucideIcon";
import PageHeader from "@/components/PageHeader";
import BalanceSummary from "@/components/BalanceSummary";
import { mockDream, type Dream } from "@/data/mockData";
import { useState } from "react";

const initialCatalog: (Omit<Dream, "currency"> & { saved: number })[] = [
  { id: "1", name: "Проектор для кино", image: "Clapperboard", targetAmount: 3000, currentAmount: 540, saved: 540, level: 1 },
  { id: "2", name: "Беспроводные наушники", image: "Headphones", targetAmount: 2500, currentAmount: 0, saved: 0, level: 1 },
  { id: "3", name: "Набор LEGO", image: "Blocks", targetAmount: 2000, currentAmount: 0, saved: 0, level: 1 },
  { id: "4", name: "Гироскутер", image: "Bike", targetAmount: 5000, currentAmount: 0, saved: 0, level: 2 },
  { id: "5", name: "Планшет", image: "Tablet", targetAmount: 7000, currentAmount: 0, saved: 0, level: 3 },
  { id: "6", name: "Игровая консоль", image: "Gamepad2", targetAmount: 10000, currentAmount: 0, saved: 0, level: 3 },
];

const levelConfig: Record<number, { label: string; bg: string; text: string; border: string }> = {
  1: { label: "Лёгкий", bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
  2: { label: "Средний", bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  3: { label: "Сложный", bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
};

const DreamPage = () => {
  const [addAmount, setAddAmount] = useState("");
  const [currentGoalId, setCurrentGoalId] = useState(mockDream.id);
  const [catalog, setCatalog] = useState(initialCatalog);

  const currentGoal = catalog.find(g => g.id === currentGoalId) || catalog[0];
  const currentDream: Dream = {
    ...currentGoal,
    currency: "FIN",
  };

  const handleDeposit = () => {
    const amount = parseInt(addAmount, 10);
    if (!amount || amount <= 0) return;
    setCatalog(prev =>
      prev.map(g =>
        g.id === currentGoalId
          ? { ...g, currentAmount: Math.min(g.currentAmount + amount, g.targetAmount), saved: g.saved + amount }
          : g
      )
    );
    setAddAmount("");
  };

  return (
    <div className="pb-24 space-y-4">
      <PageHeader
        title="Цель"
        icon={<Star size={24} className="text-white/70" />}
        subtitle="Копи на мечту шаг за шагом"
      >
        <BalanceSummary />
      </PageHeader>

      <GameCard gradient="bg-[hsl(160,45%,45%)]">
        <DreamProgress dream={currentDream} />
      </GameCard>

      <GameCard className="space-y-3">
        <h3 className="font-bold text-sm text-gray-900">Пополнить цель</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={addAmount}
            onChange={(e) => setAddAmount(e.target.value)}
            placeholder="Сколько FIN?"
            className="flex-1 px-4 py-2.5 purple-input rounded-xl text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
          <button onClick={handleDeposit} className="bg-gradient-primary text-white px-5 py-2.5 rounded-2xl font-semibold text-sm transition-transform active:scale-95 inline-flex items-center gap-1.5">
            <Sparkles size={16} /> Отложить
          </button>
        </div>
        <div className="flex gap-2">
          {[10, 25, 50, 100].map((amt) => (
            <button
              key={amt}
              onClick={() => setAddAmount(String(amt))}
              className="flex-1 py-1.5 bg-gray-100 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
            >
              +{amt}
            </button>
          ))}
        </div>
      </GameCard>

      <div>
        <h2 className="font-bold mb-3 text-gray-900 inline-flex items-center gap-1.5">
          Витрина целей <Stars size={18} className="text-primary" />
        </h2>
        <div className="space-y-2.5">
          {catalog.map((goal, i) => {
            const progress = goal.targetAmount > 0 ? Math.round((goal.currentAmount / goal.targetAmount) * 100) : 0;
            const lvl = levelConfig[goal.level] || levelConfig[3];
            const isCurrent = goal.id === currentGoalId;

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GameCard className={`space-y-2.5 ${isCurrent ? "ring-2 ring-primary/40" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${lvl.bg}`}>
                      <LucideIcon name={goal.image} size={22} className={lvl.text} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 truncate">{goal.name}</h3>
                      <span className={`text-[10px] ${lvl.bg} ${lvl.text} px-2 py-0.5 rounded-full font-medium`}>
                        {lvl.label}
                      </span>
                    </div>
                    <CoinBadge amount={goal.targetAmount} size="sm" />
                  </div>

                  
                  <div>
                    <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                      <span>Накоплено: {goal.currentAmount} FIN</span>
                      <span className="font-bold text-gray-600">{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: progress > 0 ? `${progress}%` : "0%" }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                      />
                    </div>
                  </div>

                  
                  {isCurrent ? (
                    <div className="flex items-center justify-center gap-1 text-[11px] text-primary font-semibold">
                      <Check size={14} /> Текущая цель
                    </div>
                  ) : (
                    <button
                      onClick={() => setCurrentGoalId(goal.id)}
                      className="w-full py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all"
                    >
                      Сделать текущей
                    </button>
                  )}
                </GameCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DreamPage;

