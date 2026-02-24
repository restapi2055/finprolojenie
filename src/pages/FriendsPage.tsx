import { motion } from "framer-motion";
import { Users, Trophy, MessageCircle, Gift, Medal, Flame, PartyPopper } from "lucide-react";
import GameCard from "@/components/GameCard";
import CoinBadge from "@/components/CoinBadge";
import LucideIcon from "@/components/LucideIcon";
import PageHeader from "@/components/PageHeader";
import BalanceSummary from "@/components/BalanceSummary";
import { mockFriends, mockUser, dailyCaseRewards } from "@/data/mockData";
import { useState } from "react";
import friendMasha from "@/assets/friend-masha.jpg";
import friendDima from "@/assets/friend-dima.jpg";
import friendAnya from "@/assets/friend-anya.jpg";
import friendKirill from "@/assets/friend-kirill.jpg";
import friendLena from "@/assets/friend-lena.jpg";
import avatarImg from "@/assets/avatar-child.jpg";

const friendAvatars: Record<string, string> = {
  "friend-masha": friendMasha,
  "friend-dima": friendDima,
  "friend-anya": friendAnya,
  "friend-kirill": friendKirill,
  "friend-lena": friendLena,
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

type TabType = "leaderboard" | "friends" | "case";

const FriendsPage = () => {
  const [tab, setTab] = useState<TabType>("leaderboard");
  const [caseOpened, setCaseOpened] = useState(false);
  const [caseReward, setCaseReward] = useState<typeof dailyCaseRewards[0] | null>(null);

  const leaderboard = [...mockFriends, {
    id: "me",
    name: mockUser.name,
    avatar: mockUser.avatar,
    rank: mockUser.rank,
    totalSaved: mockUser.totalEarned,
    streak: mockUser.streak,
    online: true,
  }].sort((a, b) => b.totalSaved - a.totalSaved);

  const openCase = () => {
    const rand = Math.random();
    let reward;
    if (rand < 0.4) reward = dailyCaseRewards[0];
    else if (rand < 0.7) reward = dailyCaseRewards[1];
    else if (rand < 0.9) reward = dailyCaseRewards[2];
    else if (rand < 0.97) reward = dailyCaseRewards[3];
    else reward = dailyCaseRewards[4];
    setCaseReward(reward);
    setCaseOpened(true);
  };

  const rarityColors: Record<string, string> = {
    common: "text-gray-400",
    uncommon: "text-primary",
    rare: "text-primary",
    legendary: "text-primary",
  };

  const medalColors = ["text-coin", "text-gray-400", "text-gray-500"];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 space-y-4">
      <PageHeader
        title="Друзья"
        icon={<Users size={24} className="text-white/70" />}
        subtitle="Соревнуйся и делись успехами"
      >
        <BalanceSummary />
      </PageHeader>

      
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
        {([
          { key: "leaderboard" as const, label: "Рейтинг", Icon: Trophy },
          { key: "friends" as const, label: "Друзья", Icon: Users },
          { key: "case" as const, label: "Подарок дня", Icon: Gift },
          
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all inline-flex items-center gap-1 ${
              tab === t.key ? "bg-primary text-primary-foreground" : "bg-white shadow-sm border border-gray-100 text-gray-500"
            }`}
          >
            <t.Icon size={12} /> {t.label}
          </button>
        ))}
      </div>

      
      {tab === "leaderboard" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
          {leaderboard.map((user, i) => (
            <motion.div key={user.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <GameCard className={`flex items-center gap-3 ${user.id === "me" ? "border-2 !border-primary" : ""}`}>
                <span className="w-6 text-center">
                  {i < 3 ? <Medal size={18} className={medalColors[i]} /> : <span className="text-sm font-bold text-gray-300">{i + 1}</span>}
                </span>
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-gray-100">
                  {user.id === "me" ? (
                    <img src={avatarImg} alt={user.name} className="w-full h-full object-cover" />
                  ) : friendAvatars[user.avatar] ? (
                    <img src={friendAvatars[user.avatar]} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <LucideIcon name={user.avatar} size={18} className="text-primary" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-900">
                    {user.name} {user.id === "me" && <span className="text-primary text-[10px]">(ты)</span>}
                  </h4>
                  <p className="text-[10px] text-gray-400 inline-flex items-center gap-0.5">
                    {user.rank} · <Flame size={10} /> {user.streak} дн.
                  </p>
                </div>
                <CoinBadge amount={user.totalSaved} size="sm" />
              </GameCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      
      {tab === "friends" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
          <button className="w-full bg-primary text-primary-foreground py-3 rounded-2xl font-bold text-sm inline-flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <Users size={16} /> Пригласить друга
          </button>
          {mockFriends.map((friend, i) => (
            <motion.div key={friend.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GameCard className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl overflow-hidden bg-gray-100">
                    {friendAvatars[friend.avatar] ? (
                      <img src={friendAvatars[friend.avatar]} alt={friend.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <LucideIcon name={friend.avatar} size={18} className="text-primary" />
                      </div>
                    )}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                    friend.online ? "bg-accent" : "bg-gray-300"
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-900">{friend.name}</h4>
                  <p className="text-[10px] text-gray-400">{friend.rank}</p>
                </div>
                <button className="bg-accent/20 text-accent px-2 py-1 rounded-lg text-[10px] font-bold inline-flex items-center gap-0.5">
                  <MessageCircle size={10} /> Чат
                </button>
              </GameCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      
      {tab === "case" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <GameCard gradient="bg-gradient-warm" className="text-center py-8">
            {!caseOpened ? (
              <>
                <motion.div
                  className="w-24 h-24 mx-auto rounded-3xl bg-white/10 flex items-center justify-center mb-3"
                  animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Gift size={48} className="text-white" />
                </motion.div>
                <h2 className="text-lg font-bold text-white mb-2">Подарок дня</h2>
                <p className="text-xs text-white/50 mb-4">Открывай каждый день и получай награды!</p>
                <button
                  onClick={openCase}
                  className="bg-gradient-primary text-white px-8 py-3 rounded-2xl font-bold transition-transform active:scale-95"
                >
                  Открыть кейс!
                </button>
              </>
            ) : (
              <>
                <motion.div
                  className="w-20 h-20 mx-auto rounded-3xl bg-white/10 flex items-center justify-center mb-3"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <LucideIcon name={caseReward?.icon || "Gift"} size={40} className="text-white" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h2 className="text-lg font-bold text-white mb-1 inline-flex items-center gap-1.5">
                    Поздравляем! <PartyPopper size={18} />
                  </h2>
                  <p className={`text-sm font-bold ${rarityColors[caseReward?.rarity || "common"]}`}>
                    {caseReward?.name}
                  </p>
                  {caseReward?.amount ? <CoinBadge amount={caseReward.amount} size="lg" /> : null}
                </motion.div>
                <button
                  onClick={() => { setCaseOpened(false); setCaseReward(null); }}
                  className="mt-4 bg-white/10 text-white/80 px-6 py-2 rounded-xl text-xs font-semibold"
                >
                  Закрыть
                </button>
              </>
            )}
          </GameCard>

          <h3 className="font-bold text-sm text-gray-900">Возможные награды</h3>
          <div className="grid grid-cols-2 gap-2">
            {dailyCaseRewards.map(r => (
              <GameCard key={r.id} className="text-center py-3">
                <div className="w-10 h-10 mx-auto rounded-xl bg-gray-100 flex items-center justify-center mb-1">
                  <LucideIcon name={r.icon} size={20} className={rarityColors[r.rarity]} />
                </div>
                <p className={`text-xs font-bold ${rarityColors[r.rarity]}`}>{r.name}</p>
                <p className="text-[10px] text-gray-300 capitalize">{r.rarity}</p>
              </GameCard>
            ))}
          </div>
        </motion.div>
      )}

    </motion.div>
  );
};

export default FriendsPage;

