import { motion } from "framer-motion";
import { Tag, ArrowLeft, Plus, Trash2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import GameCard from "@/components/GameCard";
import LucideIcon from "@/components/LucideIcon";
import IconPicker from "@/components/IconPicker";
import BottomSheet from "@/components/BottomSheet";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { defaultExpenseCategories, defaultIncomeCategories, TransactionCategory } from "@/data/categories";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const CategoriesSettingsPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"expense" | "income">("expense");
  const [expenses, setExpenses] = useState<TransactionCategory[]>(defaultExpenseCategories);
  const [incomes, setIncomes] = useState<TransactionCategory[]>(defaultIncomeCategories);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("Tag");

  const categories = tab === "expense" ? expenses : incomes;
  const setCategories = tab === "expense" ? setExpenses : setIncomes;

  const handleAdd = () => {
    if (!newName.trim()) return;
    const newCat: TransactionCategory = {
      id: `${tab[0]}${Date.now()}`,
      name: newName.trim(),
      icon: newIcon,
      type: tab,
    };
    setCategories(prev => [...prev, newCat]);
    setNewName("");
    setNewIcon("Tag");
    setShowAdd(false);
  };

  const handleDelete = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 space-y-4">
      <PageHeader title="Категории" icon={<Tag size={24} className="text-white/70" />} hideNavIcons
        leftContent={<button onClick={() => navigate("/settings")} className="p-1.5 rounded-lg text-white/60 hover:text-white"><ArrowLeft size={22} /></button>}
      />

      
      <div className="flex gap-1.5">
        {(["expense", "income"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all ${
              tab === t ? "bg-primary text-primary-foreground" : "bg-white shadow-sm border border-gray-100 text-gray-500"
            }`}
          >
            {t === "expense" ? "Расходы" : "Доходы"}
          </button>
        ))}
      </div>

      <motion.div variants={item} className="space-y-2">
        {categories.map(cat => (
          <GameCard key={cat.id} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <LucideIcon name={cat.icon} size={18} className="text-primary" />
            </div>
            <span className="flex-1 text-sm font-semibold text-gray-900">{cat.name}</span>
            <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-gray-300 hover:text-destructive transition-colors">
              <Trash2 size={16} />
            </button>
          </GameCard>
        ))}
      </motion.div>

      
      <button onClick={() => setShowAdd(true)}
        className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-lg flex items-center justify-center active:scale-95 transition-transform"
      >
        <Plus size={28} />
      </button>

      <BottomSheet open={showAdd} onClose={() => setShowAdd(false)} title={tab === "expense" ? "Новая категория расходов" : "Новая категория доходов"}>
        <IconPicker value={newIcon} onChange={setNewIcon} />
        <input
          type="text" value={newName} onChange={e => setNewName(e.target.value)}
          placeholder="Название категории"
          className="w-full px-4 py-2.5 purple-input rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button onClick={handleAdd}
          className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-bold text-sm active:scale-95 transition-transform"
        >
          Добавить
        </button>
      </BottomSheet>
    </motion.div>
  );
};

export default CategoriesSettingsPage;

