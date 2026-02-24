import { motion } from "framer-motion";
import LucideIcon from "./LucideIcon";
import type { Dream } from "@/data/mockData";

interface DreamProgressProps {
  dream: Dream;
  compact?: boolean;
}

const DreamProgress = ({ dream, compact = false }: DreamProgressProps) => {
  const progress = (dream.currentAmount / dream.targetAmount) * 100;

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900 inline-flex items-center gap-1.5">
            <LucideIcon name={dream.image} size={16} className="text-primary" />
            {dream.name}
          </span>
          <span className="text-xs text-primary font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{dream.currentAmount} FIN</span>
          <span>{dream.targetAmount} FIN</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-white/30 flex items-center justify-center mb-2">
          <LucideIcon name={dream.image} size={40} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">{dream.name}</h3>
        <p className="text-sm text-white/70">Уровень {dream.level} — до {dream.targetAmount.toLocaleString()} ₽</p>
      </div>

      <div className="relative">
        <div className="h-6 bg-white/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full flex items-center justify-end pr-2"
            initial={{ width: 0 }}
            animate={{ width: progress > 0 ? `${Math.max(progress, 8)}%` : "0%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-sm font-black text-green-700">{Math.round(progress)}%</span>
          </motion.div>
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs font-medium text-white/70">{dream.currentAmount} FIN</span>
          <span className="text-xs font-medium text-white/70">{dream.targetAmount} FIN</span>
        </div>
      </div>

      <p className="text-center text-sm text-white/70 font-medium">
        Осталось накопить: <span className="font-bold text-white">{dream.targetAmount - dream.currentAmount} FIN</span>
      </p>
    </div>
  );
};

export default DreamProgress;

