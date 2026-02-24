import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Plus, Copy, Check, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "@/contexts/UserRoleContext";
import avatarBoy1 from "@/assets/avatar-boy1.jpg";
import avatarBoy2 from "@/assets/avatar-boy2.jpg";
import avatarGirl1 from "@/assets/avatar-girl1.jpg";
import avatarGirl2 from "@/assets/avatar-girl2.jpg";
import avatarChild from "@/assets/avatar-child.jpg";

const avatarOptions = [
  { id: "avatar-boy1", src: avatarBoy1 },
  { id: "avatar-boy2", src: avatarBoy2 },
  { id: "avatar-girl1", src: avatarGirl1 },
  { id: "avatar-girl2", src: avatarGirl2 },
  { id: "avatar-child", src: avatarChild },
];

const taskPreferences = [
  { id: "home", label: "🏠 Домашние дела", desc: "Уборка, готовка, порядок" },
  { id: "study", label: "📚 Учёба", desc: "Уроки, чтение, задачи" },
  { id: "sport", label: "⚽ Спорт", desc: "Зарядка, тренировки" },
  { id: "skills", label: "🎨 Навыки", desc: "Творчество, музыка, языки" },
  { id: "social", label: "🤝 Социальные", desc: "Помощь, волонтёрство" },
  { id: "finance", label: "💰 Финансы", desc: "Планирование, экономия" },
];

interface ChildProfile {
  name: string;
  gender: "male" | "female";
  age: string;
  avatar: string;
  preferences: string[];
}

type Step = "child-setup" | "preferences" | "add-more" | "family-code";

const getAgeMode = (age: number) => age >= 13 ? "подросток" : "ребёнок";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { setRole, setChildren } = useUserRole();
  const [step, setStep] = useState<Step>("child-setup");
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [current, setCurrent] = useState<ChildProfile>({
    name: "", gender: "male", age: "", avatar: "avatar-boy1", preferences: [],
  });
  const [codeCopied, setCodeCopied] = useState(false);

  const familyCode = "FQ-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleSaveChild = () => {
    if (!current.name || !current.age) return;
    setStep("preferences");
  };

  const handleSavePreferences = () => {
    setProfiles(prev => [...prev, current]);
    setStep("add-more");
  };

  const handleAddAnother = () => {
    setCurrent({ name: "", gender: "male", age: "", avatar: "avatar-boy1", preferences: [] });
    setStep("child-setup");
  };

  const handleFinish = () => {
    setStep("family-code");
  };

  const handleComplete = () => {
    const allChildren = profiles.map((p, i) => ({
      id: (i + 1).toString(),
      name: p.name,
      age: parseInt(p.age),
      gender: p.gender,
      avatar: p.avatar,
    }));
    setChildren(allChildren);
    setRole("parent");
    navigate("/home");
  };

  const togglePreference = (id: string) => {
    setCurrent(prev => ({
      ...prev,
      preferences: prev.preferences.includes(id)
        ? prev.preferences.filter(p => p !== id)
        : [...prev.preferences, id],
    }));
  };

  const copyCode = () => {
    navigator.clipboard.writeText(familyCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const ageNum = parseInt(current.age);
  const ageMode = ageNum ? getAgeMode(ageNum) : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[hsl(30,30%,95%)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-5"
      >
        
        <div className="flex justify-center gap-2">
          {["child-setup", "preferences", "add-more", "family-code"].map((s, i) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-colors ${
                step === s ? "bg-primary" : i < ["child-setup", "preferences", "add-more", "family-code"].indexOf(step) ? "bg-primary/50" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          
          {step === "child-setup" && (
            <motion.div
              key="child"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-4"
            >
              <div className="text-center">
                <h2 className="text-lg font-black text-gray-900">
                  {profiles.length > 0 ? "Добавить ребёнка" : "Настройка профиля ребёнка"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {profiles.length > 0 ? `Уже добавлено: ${profiles.map(p => p.name).join(", ")}` : "Расскажите о вашем ребёнке"}
                </p>
              </div>

              
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Аватар</label>
                <div className="flex gap-2 justify-center">
                  {avatarOptions.map(a => (
                    <button
                      key={a.id}
                      onClick={() => setCurrent(prev => ({ ...prev, avatar: a.id }))}
                      className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all ${
                        current.avatar === a.id ? "border-primary scale-110" : "border-transparent opacity-60"
                      }`}
                    >
                      <img src={a.src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <input
                placeholder="Имя ребёнка"
                value={current.name}
                onChange={e => setCurrent(prev => ({ ...prev, name: e.target.value }))}
                className="w-full h-12 px-4 rounded-2xl bg-white border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring text-gray-900"
              />

              
              <div className="flex bg-white rounded-2xl p-1 border border-border">
                <button
                  onClick={() => setCurrent(prev => ({ ...prev, gender: "male" }))}
                  className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all ${
                    current.gender === "male" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  👦 Мальчик
                </button>
                <button
                  onClick={() => setCurrent(prev => ({ ...prev, gender: "female" }))}
                  className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all ${
                    current.gender === "female" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  👧 Девочка
                </button>
              </div>

              <div className="space-y-1">
                <input
                  type="number"
                  placeholder="Возраст"
                  value={current.age}
                  onChange={e => setCurrent(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full h-12 px-4 rounded-2xl bg-white border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring text-gray-900"
                  min={4}
                  max={18}
                />
                {ageMode && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-xs font-semibold px-3 py-1 rounded-full inline-block ${
                      ageMode === "подросток" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                    }`}
                  >
                    Режим: {ageMode}
                  </motion.p>
                )}
              </div>

              <button
                onClick={handleSaveChild}
                disabled={!current.name || !current.age}
                className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-button disabled:opacity-50"
              >
                Далее <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          
          {step === "preferences" && (
            <motion.div
              key="prefs"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-4"
            >
              <div className="text-center">
                <h2 className="text-lg font-black text-gray-900">Предпочтения {current.name}</h2>
                <p className="text-xs text-muted-foreground mt-1">Какие задания интересны?</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {taskPreferences.map(pref => (
                  <button
                    key={pref.id}
                    onClick={() => togglePreference(pref.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      current.preferences.includes(pref.id)
                        ? "border-primary bg-primary/10"
                        : "border-transparent bg-white"
                    }`}
                  >
                    <p className="text-sm font-semibold text-gray-900">{pref.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{pref.desc}</p>
                  </button>
                ))}
              </div>

              <button
                onClick={handleSavePreferences}
                className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-button"
              >
                Сохранить <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setStep("child-setup")}
                className="w-full text-center text-sm text-muted-foreground flex items-center justify-center gap-1"
              >
                <ArrowLeft size={14} /> Назад
              </button>
            </motion.div>
          )}

          
          {step === "add-more" && (
            <motion.div
              key="add-more"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-4"
            >
              <div className="text-center">
                <h2 className="text-lg font-black text-gray-900">Дети добавлены</h2>
              </div>

              <div className="space-y-2">
                {profiles.map((p, i) => {
                  const av = avatarOptions.find(a => a.id === p.avatar);
                  return (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-2xl p-3">
                      <img src={av?.src || avatarChild} alt="" className="w-10 h-10 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {p.gender === "male" ? "Мальчик" : "Девочка"} · {p.age} лет · {getAgeMode(parseInt(p.age))}
                        </p>
                      </div>
                      <Check size={16} className="text-green-500" />
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleAddAnother}
                className="w-full h-11 rounded-2xl border-2 border-dashed border-primary/30 text-primary font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
              >
                <UserPlus size={16} /> Добавить ещё ребёнка
              </button>

              <button
                onClick={handleFinish}
                className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-button"
              >
                Продолжить <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          
          {step === "family-code" && (
            <motion.div
              key="code"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-5"
            >
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-green-100 flex items-center justify-center mx-auto">
                  <span className="text-3xl">👨‍👩‍👧‍👦</span>
                </div>
                <h2 className="text-lg font-black text-gray-900">Семейный код</h2>
                <p className="text-xs text-muted-foreground">
                  Этот код — общий логин для всей семьи. Родитель и ребёнок входят по нему.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 text-center border border-border">
                <p className="text-3xl font-black tracking-widest text-primary">{familyCode}</p>
              </div>

              <button
                onClick={copyCode}
                className="w-full h-11 rounded-2xl border border-border bg-white text-gray-900 font-medium text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
              >
                {codeCopied ? <><Check size={16} className="text-green-500" /> Скопировано!</> : <><Copy size={16} /> Скопировать код</>}
              </button>

              <button
                onClick={handleComplete}
                className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-button"
              >
                Начать! 🚀
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;

