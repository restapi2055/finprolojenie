import { motion } from "framer-motion";
import { PawPrint, Cookie, Gamepad2, Droplets, Sparkles, Zap, Sprout, Car } from "lucide-react";
import GameCard from "@/components/GameCard";
import CoinBadge from "@/components/CoinBadge";
import LucideIcon from "@/components/LucideIcon";
import PageHeader from "@/components/PageHeader";
import BalanceSummary from "@/components/BalanceSummary";
import { mockPet, mockPlant, mockVehicle } from "@/data/mockData";
import { useState } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

type TabType = "pet" | "plant" | "vehicle";

const PetPage = () => {
  const [tab, setTab] = useState<TabType>("pet");
  const [pet, setPet] = useState(mockPet);
  const [plant, setPlant] = useState(mockPlant);
  const [vehicle, setVehicle] = useState(mockVehicle);

  const feedPet = () => {
    setPet(p => ({ ...p, hunger: Math.min(100, p.hunger + 20), happiness: Math.min(100, p.happiness + 5), totalSpent: p.totalSpent + 10 }));
  };
  const playWithPet = () => {
    setPet(p => ({ ...p, happiness: Math.min(100, p.happiness + 15), hunger: Math.max(0, p.hunger - 10) }));
  };
  const waterPlant = () => {
    setPlant(p => ({ ...p, growth: Math.min(100, p.growth + 10), totalSpent: p.totalSpent + 5 }));
  };
  const upgradePlant = () => {
    setPlant(p => ({ ...p, level: p.level + 1, totalSpent: p.totalSpent + 30 }));
  };
  const upgradeVehicle = () => {
    setVehicle(v => ({ ...v, level: v.level + 1, speed: v.speed + 15, totalSpent: v.totalSpent + 50 }));
  };

  const StatBar = ({ label, value, color, Icon }: { label: string; value: number; color: string; Icon: React.ComponentType<any> }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px]">
        <span className="text-gray-500 inline-flex items-center gap-0.5"><Icon size={10} /> {label}</span>
        <span className="font-bold text-gray-700">{value}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 space-y-4">
      <PageHeader
        title="Мои друзья"
        icon={<PawPrint size={24} className="text-white/70" />}
        subtitle="Заботься о питомцах и растениях"
      >
        <BalanceSummary />
      </PageHeader>

      
      <div className="flex bg-gray-100 rounded-xl p-0.5">
        {([
          { key: "pet" as const, label: "Питомец", Icon: PawPrint },
          { key: "plant" as const, label: "Растение", Icon: Sprout },
          { key: "vehicle" as const, label: "Транспорт", Icon: Car },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2 rounded-[10px] text-xs font-semibold transition-all inline-flex items-center justify-center gap-1 ${
              tab === t.key ? "bg-primary text-primary-foreground" : "text-gray-500"
            }`}
          >
            <t.Icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      
      {tab === "pet" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <GameCard gradient="bg-gradient-fun" className="text-center">
            <motion.div className="w-24 h-24 mx-auto rounded-3xl bg-white/10 flex items-center justify-center mb-2" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <LucideIcon name={pet.icon} size={48} className="text-primary" />
            </motion.div>
            <h2 className="text-lg font-bold text-white">{pet.name}</h2>
            <p className="text-xs text-white/50">Уровень {pet.level}</p>
          </GameCard>
          <GameCard>
            <div className="space-y-3">
              <StatBar label="Сытость" value={pet.hunger} color="bg-primary" Icon={Cookie} />
              <StatBar label="Счастье" value={pet.happiness} color="bg-primary" Icon={Gamepad2} />
            </div>
          </GameCard>
          <div className="grid grid-cols-2 gap-2">
            <GameCard onClick={feedPet} className="text-center py-4 cursor-pointer">
              <Cookie size={28} className="mx-auto mb-1 text-primary" />
              <p className="text-xs font-bold text-gray-900">Покормить</p>
              <CoinBadge amount={10} size="sm" />
            </GameCard>
            <GameCard onClick={playWithPet} className="text-center py-4 cursor-pointer">
              <Gamepad2 size={28} className="mx-auto mb-1 text-primary" />
              <p className="text-xs font-bold text-gray-900">Поиграть</p>
              <p className="text-[10px] text-primary">Бесплатно</p>
            </GameCard>
          </div>
          <GameCard className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Всего потрачено на питомца</span>
            <CoinBadge amount={pet.totalSpent} size="sm" />
          </GameCard>
        </motion.div>
      )}

      
      {tab === "plant" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <GameCard gradient="bg-gradient-success" className="text-center">
            <motion.div className="w-24 h-24 mx-auto rounded-3xl bg-white/10 flex items-center justify-center mb-2" animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
              <LucideIcon name={plant.icon} size={48} className="text-white" />
            </motion.div>
            <h2 className="text-lg font-bold text-white">{plant.name}</h2>
            <p className="text-xs text-white/50">Уровень {plant.level}</p>
          </GameCard>
          <GameCard>
            <StatBar label="Рост" value={plant.growth} color="bg-primary" Icon={Sprout} />
          </GameCard>
          <div className="grid grid-cols-2 gap-2">
            <GameCard onClick={waterPlant} className="text-center py-4 cursor-pointer">
              <Droplets size={28} className="mx-auto mb-1 text-primary" />
              <p className="text-xs font-bold text-gray-900">Полить</p>
              <CoinBadge amount={5} size="sm" />
            </GameCard>
            <GameCard onClick={upgradePlant} className="text-center py-4 cursor-pointer">
              <Sparkles size={28} className="mx-auto mb-1 text-primary" />
              <p className="text-xs font-bold text-gray-900">Улучшить</p>
              <CoinBadge amount={30} size="sm" />
            </GameCard>
          </div>
          <GameCard className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Всего потрачено на растение</span>
            <CoinBadge amount={plant.totalSpent} size="sm" />
          </GameCard>
        </motion.div>
      )}

      
      {tab === "vehicle" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <GameCard gradient="bg-gradient-warm" className="text-center">
            <motion.div className="w-24 h-24 mx-auto rounded-3xl bg-white/10 flex items-center justify-center mb-2" animate={{ x: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <LucideIcon name={vehicle.icon} size={48} className="text-white" />
            </motion.div>
            <h2 className="text-lg font-bold text-white">{vehicle.name}</h2>
            <p className="text-xs text-white/50">Уровень {vehicle.level}</p>
          </GameCard>
          <GameCard>
            <StatBar label="Скорость" value={vehicle.speed} color="bg-primary" Icon={Zap} />
          </GameCard>
          <GameCard onClick={upgradeVehicle} className="text-center py-4 cursor-pointer">
            <Zap size={28} className="mx-auto mb-1 text-primary" />
            <p className="text-xs font-bold text-gray-900">Улучшить скорость</p>
            <CoinBadge amount={50} size="sm" />
          </GameCard>
          <GameCard className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Всего потрачено на транспорт</span>
            <CoinBadge amount={vehicle.totalSpent} size="sm" />
          </GameCard>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PetPage;

