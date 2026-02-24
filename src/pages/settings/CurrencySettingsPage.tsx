import { motion } from "framer-motion";
import { ArrowLeftRight, ArrowLeft } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import GameCard from "@/components/GameCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const CurrencySettingsPage = () => {
  const navigate = useNavigate();
  const [rate, setRate] = useState(3);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 space-y-4">
      <PageHeader title="Курс валют" icon={<ArrowLeftRight size={24} className="text-white/70" />} hideNavIcons
        leftContent={<button onClick={() => navigate("/settings")} className="p-1.5 rounded-lg text-white/60 hover:text-white"><ArrowLeft size={22} /></button>}
      />

      <motion.div variants={item}>
        <GameCard className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Текущий курс</p>
            <p className="text-3xl font-black text-gray-900">1 ₽ = {rate} FIN</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500">FIN за 1 рубль</label>
            <input
              type="range" min={1} max={10} value={rate}
              onChange={e => setRate(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>1 FIN</span><span>10 FIN</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">Пример: <span className="font-bold text-gray-900">100 ₽ = {100 * rate} FIN</span></p>
          </div>
        </GameCard>
      </motion.div>
    </motion.div>
  );
};

export default CurrencySettingsPage;

