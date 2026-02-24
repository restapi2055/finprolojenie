import { motion } from "framer-motion";
import { Flame, Coins, ShoppingCart, Calendar, Brain, Check, User, LogOut } from "lucide-react";
import GameCard from "@/components/GameCard";
import CoinBadge from "@/components/CoinBadge";
import SkillBar from "@/components/SkillBar";
import LucideIcon from "@/components/LucideIcon";
import PageHeader from "@/components/PageHeader";
import BalanceSummary from "@/components/BalanceSummary";
import { mockUser, mockSkills, mockProfessions } from "@/data/mockData";
import avatarImg from "@/assets/avatar-child.jpg";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProfession, setSelectedProfession] = useState(mockProfessions[0].id);
  const [showProfessions, setShowProfessions] = useState(false);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  }, [location.hash]);

  const currentProfession = mockProfessions.find(p => p.id === selectedProfession)!;
  const remaining = Math.max(0, currentProfession.goal - currentProfession.earned);

  const statItems = [
    { label: "Заработано", value: `${mockUser.totalEarned}`, Icon: Coins },
    { label: "Потрачено", value: `${mockUser.totalSpent}`, Icon: ShoppingCart },
    { label: "Дней в игре", value: `${mockUser.daysInApp}`, Icon: Calendar },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 space-y-4">
      <PageHeader title="Профиль" icon={<User size={24} className="text-white/70" />}>
        <div className="flex items-center gap-3 mt-4">
          <img src={avatarImg} alt="Аватар" className="w-16 h-16 rounded-2xl object-cover" />
          <div>
            <h2 className="text-lg font-extrabold text-white">{mockUser.name}</h2>
            <p className="text-xs text-white/60">{mockUser.gender === "male" ? "Мальчик" : "Девочка"} · {mockUser.age} лет</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-white/15 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{mockUser.rank}</span>
              <span className="bg-white/15 text-coin text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                <Flame size={10} /> {mockUser.streak} дн.
              </span>
            </div>
          </div>
        </div>
        <BalanceSummary />
      </PageHeader>

      
      <motion.div variants={item} className="grid grid-cols-3 gap-2">
        {statItems.map(s => (
          <GameCard key={s.label} className="text-center py-3">
            <s.Icon size={20} className="mx-auto text-primary mb-1" />
            <p className="text-lg font-bold text-gray-900">{s.value}</p>
            <p className="text-[10px] text-gray-400">{s.label}</p>
          </GameCard>
        ))}
      </motion.div>

      
      <motion.div variants={item}>
        <GameCard gradient="bg-gradient-fun">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
              <LucideIcon name={currentProfession.icon} size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white">{currentProfession.name}</h3>
              <p className="text-xs text-white/50">{currentProfession.description}</p>
              <div className="mt-2 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-coin rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (currentProfession.earned / currentProfession.goal) * 100)}%` }} />
              </div>
              <p className="text-[10px] text-white/60 mt-1">
                Заработано <span className="font-bold text-white">{currentProfession.earned}</span> / {currentProfession.goal} FIN
                {remaining > 0 && <span> · Осталось <span className="font-bold text-coin">{remaining}</span></span>}
                {remaining === 0 && <span className="text-coin font-bold"> · Освоена!</span>}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowProfessions(!showProfessions)}
            className="mt-3 w-full py-2 bg-white/10 rounded-xl text-xs font-semibold text-white/80 hover:bg-white/20 transition-colors"
          >
            {showProfessions ? "Скрыть профессии" : "Сменить профессию"}
          </button>
        </GameCard>
      </motion.div>

      
      {showProfessions && (
        <motion.div variants={item} className="space-y-2">
          <h3 className="font-bold text-sm text-gray-900">Выбери профессию</h3>
          {mockProfessions.map(prof => (
            <GameCard
              key={prof.id}
              onClick={() => setSelectedProfession(prof.id)}
              className={`flex items-center gap-3 ${selectedProfession === prof.id ? "border-2 !border-primary" : ""}`}
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <LucideIcon name={prof.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-gray-900">{prof.name}</h4>
                  {prof.mastered && (
                    <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5">
                      <Check size={8} /> Освоена
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-gray-400">{prof.description}</p>
                
              </div>
              <CoinBadge amount={prof.goal} size="sm" />
            </GameCard>
          ))}
        </motion.div>
      )}

      
      <motion.div variants={item} id="skills">
        <GameCard>
          <h2 className="font-bold text-sm text-gray-900 mb-3 inline-flex items-center gap-1.5">
            Навыки <Brain size={16} className="text-primary" />
          </h2>
          <div className="space-y-3">
            {mockSkills.map(skill => (
              <SkillBar key={skill.id} skill={skill} maxSkillLevel={Math.max(...mockSkills.map(s => s.level))} />
            ))}
          </div>
        </GameCard>
      </motion.div>

      
      <motion.div variants={item}>
        <button
          onClick={() => navigate("/")}
          className="w-full h-12 rounded-2xl border-2 border-destructive text-destructive font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform bg-white"
        >
          <LogOut size={18} /> Выйти
        </button>
      </motion.div>

    </motion.div>
  );
};

export default ProfilePage;

