import { motion } from "framer-motion";
import { ClipboardList, Plus, ArrowLeft, Camera } from "lucide-react";
import taskPhotoDinner from "@/assets/task-photo-dinner.jpg";
import IconPicker from "@/components/IconPicker";
import BottomSheet from "@/components/BottomSheet";
import PageHeader from "@/components/PageHeader";
import GameCard from "@/components/GameCard";
import TaskCard from "@/components/TaskCard";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "@/contexts/UserRoleContext";
import { useState } from "react";
import { mockTasks, mockProfessions, mockSkills } from "@/data/mockData";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const categories = ["Дом", "Учёба", "Навыки", "Спорт", "Другое"];

const TasksSettingsPage = () => {
  const navigate = useNavigate();
  const { children } = useUserRole();
  const [tab, setTab] = useState<"active" | "history">("active");
  const [tasks, setTasks] = useState(mockTasks.map(t => t.id === "3" ? { ...t, completionPhoto: taskPhotoDinner } : { ...t }));
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [reward, setReward] = useState("10");
  const [category, setCategory] = useState("Дом");
  const [childId, setChildId] = useState(children[0]?.id || "");
  const [deadline, setDeadline] = useState("");
  const [profession, setProfession] = useState("");
  const [skill, setSkill] = useState("");
  const [repeat, setRepeat] = useState("");
  const [needPhoto, setNeedPhoto] = useState(false);
  const [icon, setIcon] = useState("ClipboardList");

  const activeTasks = tasks.filter(t => !t.completed);
  const historyTasks = tasks.filter(t => t.completed);

  const handleAdd = () => {
    if (!title) return;
    setTasks([...tasks, {
      id: Date.now().toString(), title, description: desc,
      reward: parseInt(reward) || 10, category, icon: icon,
      completed: false,
      deadline: deadline || undefined,
      profession: profession || undefined,
      skill: skill || undefined,
    }]);
    setTitle(""); setDesc(""); setReward("10"); setShowForm(false); setIcon("ClipboardList");
  };

  const displayTasks = tab === "active" ? activeTasks : historyTasks;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 space-y-4">
      <PageHeader title="Задания" icon={<ClipboardList size={24} className="text-white/70" />} hideNavIcons
        leftContent={<button onClick={() => navigate("/settings")} className="p-1.5 rounded-lg text-white/60 hover:text-white"><ArrowLeft size={22} /></button>}
      />

      <div className="flex gap-2">
        <button onClick={() => setTab("active")} className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-colors ${tab === "active" ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-500"}`}>Активные</button>
        <button onClick={() => setTab("history")} className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-colors ${tab === "history" ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-500"}`}>История</button>
      </div>

      <motion.div variants={item} className="space-y-2">
        {displayTasks.map((task) => (
          <TaskCard key={task.id} task={task} muted={tab === "history"} />
        ))}
        {displayTasks.length === 0 && <p className="text-center text-sm text-gray-400 py-6">Нет заданий</p>}
      </motion.div>

      {tab === "active" && (
        <motion.div variants={item}>
          <button onClick={() => setShowForm(true)} className="w-full h-12 rounded-2xl border-2 border-dashed border-gray-300 text-gray-400 font-semibold text-sm flex items-center justify-center gap-2">
            <Plus size={18} /> Новое задание
          </button>
        </motion.div>
      )}

      <BottomSheet open={showForm} onClose={() => setShowForm(false)} title="Новое задание">
        <select value={childId} onChange={e => setChildId(e.target.value)} className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900">
          {children.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Название задания" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Описание" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
        <div className="flex gap-2">
          <input value={reward} onChange={e => setReward(e.target.value)} placeholder="Награда FIN" type="number" className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
          <select value={category} onChange={e => setCategory(e.target.value)} className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <input value={deadline} onChange={e => setDeadline(e.target.value)} type="date" placeholder="Срок" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
        <div className="flex gap-2">
          <select value={profession} onChange={e => setProfession(e.target.value)} className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900">
            <option value="" className="text-gray-400">Профессия</option>
            {mockProfessions.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
          <select value={skill} onChange={e => setSkill(e.target.value)} className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900">
            <option value="" className="text-gray-400">Навык</option>
            {mockSkills.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
        </div>
        <IconPicker value={icon} onChange={setIcon} label="Иконка задания" />
        <input value={repeat} onChange={e => setRepeat(e.target.value)} type="number" placeholder="Повтор каждые N дней (необязательно)" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" checked={needPhoto} onChange={e => setNeedPhoto(e.target.checked)} className="rounded" />
          <Camera size={14} /> Обязательно фото при выполнении
        </label>
        <button onClick={handleAdd} className="w-full h-11 rounded-xl bg-primary text-white font-bold text-sm">Создать задание</button>
      </BottomSheet>
    </motion.div>
  );
};

export default TasksSettingsPage;

