import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { ClipboardList, PartyPopper, ChevronDown, Plus, Camera, X } from "lucide-react";
import IconPicker from "@/components/IconPicker";
import TaskCard from "@/components/TaskCard";
import PageHeader from "@/components/PageHeader";
import BalanceSummary from "@/components/BalanceSummary";
import GameCard from "@/components/GameCard";
import { mockTasks, mockProfessions, mockSkills } from "@/data/mockData";
import { differenceInDays, parseISO } from "date-fns";
import taskPhotoBed from "@/assets/task-photo-bed.jpg";
import taskPhotoDinner from "@/assets/task-photo-dinner.jpg";
import { useUserRole } from "@/contexts/UserRoleContext";

const categories = ["Дом", "Учёба", "Навыки", "Спорт", "Другое"];
const tabs = ["Все", "Дом", "Учёба", "Навыки", "Спорт"];
const HISTORY_PAGE_SIZE = 5;

const TasksPage = () => {
  const [tasks, setTasks] = useState(() =>
    mockTasks.map(t => t.id === "3" ? { ...t, completionPhoto: taskPhotoDinner } : t)
  );
  const [activeTab, setActiveTab] = useState("Все");
  const [showHistory, setShowHistory] = useState(false);
  const [historyPage, setHistoryPage] = useState(1);
  const { role, children, selectedChildId } = useUserRole();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newReward, setNewReward] = useState("10");
  const [newCategory, setNewCategory] = useState("Дом");
  const [newDeadline, setNewDeadline] = useState("");
  const [newProfession, setNewProfession] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newRepeat, setNewRepeat] = useState("");
  const [newNeedPhoto, setNewNeedPhoto] = useState(false);
  const [newIcon, setNewIcon] = useState("ClipboardList");
  const selectedChild = children.find(c => c.id === selectedChildId);

  const now = new Date();

  const activeTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (!t.completed) return true;
      if (t.completedAt) {
        const days = differenceInDays(now, parseISO(t.completedAt));
        return days < 1;
      }
      return true;
    });
  }, [tasks]);

  const historyTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (!t.completed || !t.completedAt) return false;
      const days = differenceInDays(now, parseISO(t.completedAt));
      return days >= 1;
    });
  }, [tasks]);

  const filtered = activeTab === "Все" ? activeTasks : activeTasks.filter((t) => t.category === activeTab);
  const historyFiltered = activeTab === "Все" ? historyTasks : historyTasks.filter((t) => t.category === activeTab);
  const historyPageCount = Math.ceil(historyFiltered.length / HISTORY_PAGE_SIZE);
  const historyVisible = historyFiltered.slice(0, historyPage * HISTORY_PAGE_SIZE);

  const handleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : undefined,
              completionPhoto: !t.completed ? taskPhotoBed : undefined,
            }
          : t
      )
    );
  };

  const handleAddTask = () => {
    if (!newTitle) return;
    setTasks(prev => [...prev, {
      id: Date.now().toString(), title: newTitle, description: newDesc,
      reward: parseInt(newReward) || 10, category: newCategory, icon: newIcon,
      completed: false,
      deadline: newDeadline || undefined,
      profession: newProfession || undefined,
      skill: newSkill || undefined,
    }]);
    setNewTitle(""); setNewDesc(""); setNewReward("10"); setNewDeadline("");
    setNewProfession(""); setNewSkill(""); setNewRepeat(""); setNewNeedPhoto(false); setNewIcon("ClipboardList");
    setShowAddForm(false);
  };

  return (
    <div className="pb-24 space-y-4">
      <PageHeader
        title="Задания"
        icon={<ClipboardList size={24} className="text-white/70" />}
        subtitle="Выполняй задания — зарабатывай монеты"
      >
        <BalanceSummary />
      </PageHeader>

      
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "bg-white shadow-sm border border-gray-100 text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      
      <motion.div layout className="space-y-2">
        {filtered.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <TaskCard task={task} onComplete={handleComplete} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <PartyPopper size={40} className="mx-auto mb-2 text-primary" />
          <p className="font-semibold text-gray-700">Нет заданий в этой категории</p>
        </div>
      )}

      
      {historyFiltered.length > 0 && (
        <div className="pt-2">
          <button
            onClick={() => { setShowHistory(!showHistory); setHistoryPage(1); }}
            className="text-sm text-gray-400 hover:text-gray-500 transition-colors flex items-center gap-1 mx-auto"
          >
            <ChevronDown size={14} className={`transition-transform ${showHistory ? "rotate-180" : ""}`} />
            Показать выполненные задачи ({historyFiltered.length})
          </button>

          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2 mt-3"
            >
              {historyVisible.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <TaskCard task={task} muted />
                </motion.div>
              ))}
              {historyPage < historyPageCount && (
                <button
                  onClick={() => setHistoryPage((p) => p + 1)}
                  className="text-xs text-gray-400 hover:text-gray-500 transition-colors mx-auto block pt-2"
                >
                  Показать ещё...
                </button>
              )}
            </motion.div>
          )}
        </div>
      )}

      
      {role === "parent" && (
        <>
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="fixed inset-0 z-50 flex items-end justify-center bg-black/30"
                onClick={() => setShowAddForm(false)}
              >
                <motion.div
                  onClick={e => e.stopPropagation()}
                  className="w-full max-w-lg bg-white rounded-t-3xl p-5 pb-10 space-y-3 max-h-[85vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-base text-gray-900">Новое задание для {selectedChild?.name}</h3>
                    <button onClick={() => setShowAddForm(false)} className="p-1 text-gray-400 hover:text-gray-600"><X size={20} /></button>
                  </div>
                  <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Название задания" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
                  <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Описание" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
                  <div className="flex gap-2">
                    <input value={newReward} onChange={e => setNewReward(e.target.value)} placeholder="Награда FIN" type="number" className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
                    <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900">
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <input value={newDeadline} onChange={e => setNewDeadline(e.target.value)} type="date" placeholder="Срок" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
                  <div className="flex gap-2">
                    <select value={newProfession} onChange={e => setNewProfession(e.target.value)} className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900">
                      <option value="" className="text-gray-400">Профессия</option>
                      {mockProfessions.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                    </select>
                    <select value={newSkill} onChange={e => setNewSkill(e.target.value)} className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900">
                      <option value="" className="text-gray-400">Навык</option>
                      {mockSkills.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <IconPicker value={newIcon} onChange={setNewIcon} label="Иконка задания" />
                  <input value={newRepeat} onChange={e => setNewRepeat(e.target.value)} type="number" placeholder="Повтор каждые N дней (необязательно)" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" checked={newNeedPhoto} onChange={e => setNewNeedPhoto(e.target.checked)} className="rounded" />
                    <Camera size={14} /> Обязательно фото
                  </label>
                  <button onClick={handleAddTask} className="w-full h-11 rounded-xl bg-primary text-white font-bold text-sm">Создать задание</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showAddForm && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setShowAddForm(true)}
              className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center active:scale-90 transition-transform"
            >
              <Plus size={28} />
            </motion.button>
          )}
        </>
      )}
    </div>
  );
};

export default TasksPage;
