import { motion } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import GameCard from "@/components/GameCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const CharitySettingsPage = () => {
  const navigate = useNavigate();
  const [percent, setPercent] = useState(5);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 space-y-4">
      <PageHeader title="Благотворительность" icon={<Heart size={24} className="text-white/70" />} hideNavIcons
        leftContent={<button onClick={() => navigate("/settings")} className="p-1.5 rounded-lg text-white/60 hover:text-white"><ArrowLeft size={22} /></button>}
      />

      <motion.div variants={item}>
        <GameCard className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Процент от каждого дохода</p>
            <p className="text-4xl font-black text-gray-900">{percent}%</p>
          </div>
          <div className="space-y-2">
            <input
              type="range" min={0} max={20} value={percent}
              onChange={e => setPercent(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>0%</span><span>20%</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">При доходе <span className="font-bold">100 FIN</span> на благотворительность уйдёт <span className="font-bold text-primary">{percent} FIN</span></p>
          </div>
        </GameCard>
      </motion.div>
    </motion.div>
  );
};

export default CharitySettingsPage;

