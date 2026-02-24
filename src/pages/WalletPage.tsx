import { motion } from "framer-motion";
import {
  Wallet,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  CreditCard,
  PiggyBank,
  ArrowLeftRight,
  BadgeDollarSign,
  Laptop,
  BookOpen
} from "lucide-react";
import GameCard from "@/components/GameCard";
import CoinBadge from "@/components/CoinBadge";
import LucideIcon from "@/components/LucideIcon";
import PageHeader from "@/components/PageHeader";
import BalanceSummary from "@/components/BalanceSummary";
import Calculator from "@/components/Calculator";
import { mockAccounts, mockTransactions } from "@/data/mockData";
import { defaultExpenseCategories, defaultIncomeCategories } from "@/data/categories";
import { useState, useMemo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, isWithinInterval, parseISO, startOfDay, endOfDay } from "date-fns";
import { ru } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

type TabType = "accounts" | "history" | "operations";
type OpType = "expense" | "transfer" | "convert" | "income_rub";

const ITEMS_PER_PAGE = 8;

const OP_TYPES: { value: OpType; label: string; Icon: typeof CreditCard; className: string }[] = [
  { value: "expense", label: "Расход (FIN)", Icon: CreditCard, className: "text-red-500" },
  { value: "income_rub", label: "Доход (₽)", Icon: PiggyBank, className: "text-emerald-500" },
  { value: "transfer", label: "Перевод между счетами", Icon: ArrowLeftRight, className: "text-blue-500" },
  { value: "convert", label: "Конвертация FIN → ₽", Icon: BadgeDollarSign, className: "text-indigo-500" },
];

const PIE_COLORS = [
  "hsl(var(--primary))", "#f97316", "#22c55e", "#eab308", "#ef4444",
  "#8b5cf6", "#06b6d4", "#ec4899", "#14b8a6", "#f59e0b",
  "#6366f1", "#84cc16", "#d946ef", "#0ea5e9", "#f43f5e",
];

const WalletPage = () => {
  const [tab, setTab] = useState<TabType>("accounts");

  const [opType, setOpType] = useState<OpType>("expense");
  const [opAmount, setOpAmount] = useState("");
  const [opAccount, setOpAccount] = useState("1");
  const [opCategory, setOpCategory] = useState("none");
  const [opComment, setOpComment] = useState("");
  const [fromAccount, setFromAccount] = useState("1");
  const [toAccount, setToAccount] = useState("3");

  const [historyFilter, setHistoryFilter] = useState<"all" | "income" | "expense">("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const currentOp = OP_TYPES.find(o => o.value === opType);

  const filteredTx = useMemo(() => {
    let txs = mockTransactions;
    if (historyFilter !== "all") {
      txs = txs.filter(tx => tx.type === historyFilter);
    }
    if (dateRange?.from) {
      txs = txs.filter(tx => {
        const txDate = parseISO(tx.date);
        const from = startOfDay(dateRange.from!);
        const to = dateRange.to ? endOfDay(dateRange.to) : endOfDay(dateRange.from!);
        return isWithinInterval(txDate, { start: from, end: to });
      });
    }
    return txs;
  }, [historyFilter, dateRange]);

  const totalPages = Math.max(1, Math.ceil(filteredTx.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedTx = filteredTx.slice((safeCurrentPage - 1) * ITEMS_PER_PAGE, safeCurrentPage * ITEMS_PER_PAGE);

  useMemo(() => { setCurrentPage(1); }, [historyFilter, dateRange]);

const buildPieData = (txs: typeof mockTransactions) => {
  const catMap: Record<string, number> = {};
  txs.forEach(tx => {
    catMap[tx.category] = (catMap[tx.category] || 0) + tx.amount;
  });
  const total = Object.values(catMap).reduce((a, b) => a + b, 0);
  return Object.entries(catMap)
    .map(([name, value]) => ({ name, value, percent: total > 0 ? Math.round((value / total) * 100) : 0 }))
    .sort((a, b) => b.value - a.value);
};

const pieIncomeData = useMemo(
  () => buildPieData(filteredTx.filter(tx => tx.type === "income")),
  [filteredTx]
);

const pieExpenseData = useMemo(
  () => buildPieData(filteredTx.filter(tx => tx.type === "expense")),
  [filteredTx]
);

  const opCategories = opType === "expense" ? defaultExpenseCategories :
    opType === "income_rub" ? defaultIncomeCategories : [];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 space-y-4">
      <PageHeader title="Кошелёк" icon={<Wallet size={24} className="text-white/70" />} subtitle="Управляй своими финансами">
        <BalanceSummary />
      </PageHeader>

      
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
        {([
          { key: "accounts", label: "Счета" },
          { key: "history", label: "История" },
          { key: "operations", label: "Операции" },
        ] as const).map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              tab === t.key ? "bg-primary text-primary-foreground" : "bg-white shadow-sm border border-gray-100 text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      
      {tab === "accounts" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
          {mockAccounts.map((account, i) => (
            <motion.div key={account.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
              <GameCard className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <LucideIcon name={account.icon} size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-900">{account.name}</h3>
                  <p className="text-[10px] text-muted-foreground">
                    {account.id === "5" && "1 FIN = 2 балла"}
                    {account.id === "3" && "Копим на цель!"}
                  </p>
                </div>
                <CoinBadge amount={account.balance} currency={account.currency} size="md" />
              </GameCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      
      {tab === "history" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-white shadow-sm border border-gray-100 rounded-2xl text-sm text-muted-foreground">
                <CalendarDays size={16} className="text-primary" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <span className="font-medium text-foreground">{format(dateRange.from, "d MMM", { locale: ru })} — {format(dateRange.to, "d MMM", { locale: ru })}</span>
                  ) : (
                    <span className="font-medium text-foreground">{format(dateRange.from, "d MMM yyyy", { locale: ru })}</span>
                  )
                ) : (
                  <span>Выберите период</span>
                )}
                {dateRange?.from && (
                  <button onClick={(e) => { e.stopPropagation(); setDateRange(undefined); }} className="ml-auto text-xs text-muted-foreground hover:text-foreground">Сбросить</button>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={1} locale={ru} className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>

          
          <div className="flex gap-1.5">
            {(["all", "income", "expense"] as const).map(f => (
              <button key={f} onClick={() => setHistoryFilter(f)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  historyFilter === f ? "bg-primary text-primary-foreground" : "bg-white shadow-sm border border-gray-100 text-muted-foreground"
                }`}
              >
                {f === "all" ? "Все" : f === "income" ? "Доходы" : "Расходы"}
              </button>
            ))}
          </div>

          
          {[
            { title: "Доходы за период", data: pieIncomeData, emptyText: "Нет доходов за выбранный период" },
            { title: "Расходы за период", data: pieExpenseData, emptyText: "Нет расходов за выбранный период" },
          ].map((block) => (
            <GameCard key={block.title} className="space-y-3">
              <h3 className="font-bold text-sm text-gray-900">{block.title}</h3>
              {block.data.length === 0 ? (
                <p className="text-xs text-muted-foreground">{block.emptyText}</p>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={block.data} dataKey="value" cx="50%" cy="50%" outerRadius={60} innerRadius={25} paddingAngle={2}>
                            {block.data.map((_, i) => (
                              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-1 space-y-1.5 overflow-hidden">
                      {block.data.slice(0, 5).map((d, i) => (
                        <div key={d.name} className="flex items-center gap-2 text-xs">
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                          <span className="truncate text-gray-800 font-medium">{d.name}</span>
                          <span className="ml-auto text-gray-700 shrink-0">{d.percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {block.data.length > 5 && (
                    <div className="space-y-1 pt-1 border-t border-gray-100">
                      {block.data.slice(5).map((d, i) => (
                        <div key={d.name} className="flex items-center gap-2 text-xs">
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[(i + 5) % PIE_COLORS.length] }} />
                          <span className="truncate text-gray-800 font-medium">{d.name}</span>
                          <span className="ml-auto text-gray-700 shrink-0">{d.percent}%</span>
                          <span className="text-gray-600 shrink-0">{d.value} ₽</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </GameCard>
          ))}

          
          {paginatedTx.map((tx, i) => (
            <motion.div key={tx.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="flex items-start gap-3 p-3.5 bg-white shadow-sm border border-gray-100 rounded-2xl"
            >
              {tx.type === "income" ? (
                <TrendingUp size={20} className="text-green-400 shrink-0" />
              ) : (
                <TrendingDown size={20} className="text-red-400 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{tx.description}</p>
                <p className="text-xs text-gray-600">
                  {tx.date} {tx.time && `· ${tx.time}`}
                  {tx.taskName && ` · ${tx.taskName}`}
                </p>
                {(tx.profession || tx.skill) && (
                  <p className="text-[10px] text-primary/70 mt-0.5 flex items-center gap-2">
                    {tx.profession && (
                      <span className="inline-flex items-center gap-1">
                        <Laptop size={12} />
                        {tx.profession}
                      </span>
                    )}
                    {tx.skill && (
                      <span className="inline-flex items-center gap-1">
                        <BookOpen size={12} />
                        {tx.skill}
                      </span>
                    )}
                  </p>
                )}
              </div>
              <span className={`text-sm font-bold shrink-0 ${tx.type === "income" ? "text-primary" : "text-destructive"}`}>
                {tx.type === "income" ? "+" : "−"}{tx.amount} {tx.currency === "FIN" ? "FIN" : "₽"}
              </span>
            </motion.div>
          ))}
          {filteredTx.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">Нет операций за выбранный период</p>
          )}

          
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 pt-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={safeCurrentPage <= 1}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground disabled:opacity-30 hover:bg-primary/10 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                    page === safeCurrentPage ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-primary/10"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={safeCurrentPage >= totalPages}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground disabled:opacity-30 hover:bg-primary/10 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </motion.div>
      )}

      
      {tab === "operations" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <GameCard className="space-y-3">
            
            <div>
              <p className="text-[10px] text-muted-foreground mb-1">Тип операции</p>
              <Select
                value={opType}
                onValueChange={(value) => { setOpType(value as OpType); setOpCategory(""); setOpComment(""); }}
              >
                <SelectTrigger className="w-full px-4 py-2.5 purple-input rounded-xl text-sm font-medium text-foreground focus:ring-2 focus:ring-primary/40">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-lg">
                  {OP_TYPES.map(({ value, label, Icon, className }) => (
                    <SelectItem key={value} value={value} className="text-foreground">
                      <span className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${className}`} />
                        {label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            
            {(opType === "expense" || opType === "income_rub") && (
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">
                  {opType === "expense" ? "Со счёта" : "На счёт"}
                </p>
                <Select value={opAccount} onValueChange={setOpAccount}>
                  <SelectTrigger className="w-full px-4 py-2.5 purple-input rounded-xl text-sm font-medium text-foreground focus:ring-2 focus:ring-primary/40">
                    <SelectValue placeholder="Выберите счёт" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl shadow-xl">
                    {mockAccounts
                      .filter(a => opType === "income_rub" ? a.currency === "RUB" : true)
                      .map(a => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.name} ({a.balance} {a.currency})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            
            {opType === "transfer" && (
              <>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">Со счёта</p>
                  <Select value={fromAccount} onValueChange={setFromAccount}>
                    <SelectTrigger className="w-full px-4 py-2.5 purple-input rounded-xl text-sm font-medium text-foreground focus:ring-2 focus:ring-primary/40">
                      <SelectValue placeholder="Со счёта" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl shadow-xl">
                      {mockAccounts.filter(a => a.currency === "FIN").map(a => (
                        <SelectItem key={a.id} value={a.id}>{a.name} ({a.balance} FIN)</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">На счёт</p>
                  <Select value={toAccount} onValueChange={setToAccount}>
                    <SelectTrigger className="w-full px-4 py-2.5 purple-input rounded-xl text-sm font-medium text-foreground focus:ring-2 focus:ring-primary/40">
                      <SelectValue placeholder="На счёт" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl shadow-xl">
                      {mockAccounts.filter(a => a.currency === "FIN" && a.id !== fromAccount).map(a => (
                        <SelectItem key={a.id} value={a.id}>{a.name} ({a.balance} FIN)</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            
            {(opType === "expense" || opType === "income_rub") && (
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Категория</p>
                <Select value={opCategory} onValueChange={setOpCategory}>
                  <SelectTrigger className="w-full px-4 py-2.5 purple-input rounded-xl text-sm font-medium text-foreground focus:ring-2 focus:ring-primary/40">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl shadow-xl">
                    <SelectItem value="none">Без категории</SelectItem>
                    {opCategories.map(c => (
                      <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            
            {(opType === "expense" || opType === "income_rub") && (
              <input type="text" value={opComment} onChange={e => setOpComment(e.target.value)}
                placeholder={opType === "expense" ? "На что потратил?" : "Откуда доход?"}
                className="w-full px-4 py-2.5 purple-input rounded-xl text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            )}

            
            {opType === "convert" && (
              <div className="flex items-center justify-between p-3 purple-input rounded-xl">
                <span className="text-xs text-muted-foreground">Курс: 1 FIN = 1 ₽</span>
                <span className="text-sm font-bold text-primary">{opAmount || 0} ₽</span>
              </div>
            )}

            
            <Calculator value={opAmount} onChange={setOpAmount} />

            
            <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-bold text-sm active:scale-95 transition-transform flex items-center justify-center gap-2">
              {opType === "expense" && <CreditCard className="h-4 w-4" />}
              {opType === "income_rub" && <PiggyBank className="h-4 w-4" />}
              {opType === "transfer" && <ArrowLeftRight className="h-4 w-4" />}
              {opType === "convert" && <BadgeDollarSign className="h-4 w-4" />}
              {opType === "expense" && "Оплатить"}
              {opType === "income_rub" && "Записать доход"}
              {opType === "transfer" && "Перевести"}
              {opType === "convert" && "Отправить запрос"}
            </button>
          </GameCard>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WalletPage;

