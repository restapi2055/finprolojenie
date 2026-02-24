import { TrendingUp, TrendingDown, CircleDollarSign } from "lucide-react";
import { mockTransactions } from "@/data/mockData";

const BalanceSummary = () => {
  const totalIncome = mockTransactions.filter(tx => tx.type === "income").reduce((s, tx) => s + tx.amount, 0);
  const totalExpense = mockTransactions.filter(tx => tx.type === "expense").reduce((s, tx) => s + tx.amount, 0);
  const netBalance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      <div className="bg-white/10 rounded-2xl p-3 text-center">
        <TrendingUp size={16} className="text-green-400 mx-auto mb-1" />
        <p className="text-[10px] text-white/50">Доходы</p>
        <p className="text-sm font-bold text-green-400">+{totalIncome}</p>
      </div>
      <div className="bg-white/10 rounded-2xl p-3 text-center">
        <TrendingDown size={16} className="text-red-400 mx-auto mb-1" />
        <p className="text-[10px] text-white/50">Расходы</p>
        <p className="text-sm font-bold text-red-400">−{totalExpense}</p>
      </div>
      <div className="bg-white/10 rounded-2xl p-3 text-center">
        <CircleDollarSign size={16} className="text-coin mx-auto mb-1" />
        <p className="text-[10px] text-white/50">Баланс</p>
        <p className={`text-sm font-bold ${netBalance >= 0 ? "text-green-400" : "text-red-400"}`}>
          {netBalance >= 0 ? "+" : ""}{netBalance}
        </p>
      </div>
    </div>
  );
};

export default BalanceSummary;

