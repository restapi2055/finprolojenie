import { motion } from "framer-motion";
import { Baby, Plus, ArrowLeft, Check } from "lucide-react";
import BottomSheet from "@/components/BottomSheet";
import PageHeader from "@/components/PageHeader";
import GameCard from "@/components/GameCard";
import { useUserRole } from "@/contexts/UserRoleContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import avatarChildImg from "@/assets/avatar-child.jpg";
import avatarBoy1 from "@/assets/avatar-boy1.jpg";
import avatarBoy2 from "@/assets/avatar-boy2.jpg";
import avatarGirl1 from "@/assets/avatar-girl1.jpg";
import avatarGirl2 from "@/assets/avatar-girl2.jpg";

const avatarOptions = [
  { id: "avatar-child", src: avatarChildImg },
  { id: "avatar-boy1", src: avatarBoy1 },
  { id: "avatar-boy2", src: avatarBoy2 },
  { id: "avatar-girl1", src: avatarGirl1 },
  { id: "avatar-girl2", src: avatarGirl2 },
];

const avatarMap: Record<string, string> = {
  "avatar-child": avatarChildImg,
  "avatar-boy1": avatarBoy1,
  "avatar-boy2": avatarBoy2,
  "avatar-girl1": avatarGirl1,
  "avatar-girl2": avatarGirl2,
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const ChildrenSettingsPage = () => {
  const navigate = useNavigate();
  const { children, setChildren } = useUserRole();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [selectedAvatar, setSelectedAvatar] = useState("avatar-child");

  const handleAdd = () => {
    if (!name || !age) return;
    setChildren([...children, { id: Date.now().toString(), name, age: parseInt(age), gender, avatar: selectedAvatar }]);
    setName(""); setAge(""); setSelectedAvatar("avatar-child"); setShowForm(false);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 space-y-4">
      <PageHeader title="Дети" icon={<Baby size={24} className="text-white/70" />} hideNavIcons
        leftContent={<button onClick={() => navigate("/settings")} className="p-1.5 rounded-lg text-white/60 hover:text-white"><ArrowLeft size={22} /></button>}
      />

      <motion.div variants={item} className="space-y-2">
        {children.map((child) => (
          <GameCard key={child.id} className="flex items-center gap-3">
            <img
              src={child.avatar ? avatarMap[child.avatar] || avatarChildImg : avatarChildImg}
              alt={child.name}
              className="w-12 h-12 rounded-xl object-cover bg-gray-100"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-900">{child.name}</h3>
              <p className="text-[10px] text-gray-400">{child.gender === "male" ? "Мальчик" : "Девочка"} · {child.age} лет</p>
            </div>
          </GameCard>
        ))}
      </motion.div>

      <motion.div variants={item}>
        <button onClick={() => setShowForm(true)} className="w-full h-12 rounded-2xl border-2 border-dashed border-gray-300 text-gray-400 font-semibold text-sm flex items-center justify-center gap-2">
          <Plus size={18} /> Добавить ребёнка
        </button>
      </motion.div>

      <BottomSheet open={showForm} onClose={() => setShowForm(false)} title="Новый ребёнок">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Выберите аватар</p>
          <div className="flex gap-2 flex-wrap">
            {avatarOptions.map((av) => (
              <button
                key={av.id}
                onClick={() => setSelectedAvatar(av.id)}
                className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedAvatar === av.id ? "border-primary ring-2 ring-primary/30" : "border-gray-200"
                }`}
              >
                <img src={av.src} alt="Аватар" className="w-full h-full object-cover" />
                {selectedAvatar === av.id && (
                  <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                    <Check size={18} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Имя" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
        <input value={age} onChange={e => setAge(e.target.value)} placeholder="Возраст" type="number" className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400" />
        <div className="flex gap-2">
          <button onClick={() => setGender("male")} className={`flex-1 h-10 rounded-xl text-sm font-medium ${gender === "male" ? "bg-primary text-white" : "border border-gray-200"}`}>Мальчик</button>
          <button onClick={() => setGender("female")} className={`flex-1 h-10 rounded-xl text-sm font-medium ${gender === "female" ? "bg-primary text-white" : "border border-gray-200"}`}>Девочка</button>
        </div>
        <button onClick={handleAdd} className="w-full h-11 rounded-xl bg-primary text-white font-bold text-sm">Добавить</button>
      </BottomSheet>
    </motion.div>
  );
};

export default ChildrenSettingsPage;

