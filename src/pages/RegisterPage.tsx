import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, ArrowRight, ArrowLeft, ShieldCheck, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type Step = "method" | "otp" | "password";

const RegisterPage = () => {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSendCode = () => {
    if (!contact) return;
    setStep("otp");
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) return;
    setStep("password");
  };

  const handleSetPassword = () => {
    if (!password || password !== confirmPassword) return;
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[hsl(30,30%,95%)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-6"
      >
        
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎮</span>
          </div>
          <h1 className="text-2xl font-black text-foreground">FinQuest Kids</h1>
          <p className="text-sm text-muted-foreground">Регистрация</p>
        </div>

        <AnimatePresence mode="wait">
          
          {step === "method" && (
            <motion.div
              key="method"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-4"
            >
              
              <div className="flex bg-white rounded-2xl p-1 border border-border">
                <button
                  onClick={() => setMethod("email")}
                  className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    method === "email"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  <Mail size={14} /> Email
                </button>
                <button
                  onClick={() => setMethod("phone")}
                  className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    method === "phone"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  <Phone size={14} /> Телефон
                </button>
              </div>

              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  {method === "email" ? "Email адрес" : "Номер телефона"}
                </label>
                <input
                  type={method === "email" ? "email" : "tel"}
                  placeholder={method === "email" ? "example@mail.ru" : "+7 (999) 123-45-67"}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-white border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring text-gray-900"
                />
              </div>

              <button
                onClick={handleSendCode}
                disabled={!contact}
                className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-button disabled:opacity-50"
              >
                Получить код <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Уже есть аккаунт? Войти
              </button>
            </motion.div>
          )}

          
          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-5"
            >
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck size={24} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Введите код</p>
                <p className="text-xs text-muted-foreground">
                  Код отправлен на {contact}
                </p>
              </div>

              <div className="flex justify-center">
                <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-14 h-14 text-xl font-bold rounded-xl border-border bg-white text-gray-900" />
                    <InputOTPSlot index={1} className="w-14 h-14 text-xl font-bold rounded-xl border-border bg-white text-gray-900" />
                    <InputOTPSlot index={2} className="w-14 h-14 text-xl font-bold rounded-xl border-border bg-white text-gray-900" />
                    <InputOTPSlot index={3} className="w-14 h-14 text-xl font-bold rounded-xl border-border bg-white text-gray-900" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={otp.length < 4}
                className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-button disabled:opacity-50"
              >
                Подтвердить <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setStep("method")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1"
              >
                <ArrowLeft size={14} /> Назад
              </button>
            </motion.div>
          )}

          
          {step === "password" && (
            <motion.div
              key="password"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-4"
            >
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <KeyRound size={24} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Задайте пароль</p>
                <p className="text-xs text-muted-foreground">Этот пароль будет использоваться для входа</p>
              </div>

              <div className="space-y-3">
                <input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-white border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring text-gray-900"
                />
                <input
                  type="password"
                  placeholder="Повторите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-white border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring text-gray-900"
                />
                {password && confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-destructive">Пароли не совпадают</p>
                )}
              </div>

              <button
                onClick={handleSetPassword}
                disabled={!password || password !== confirmPassword}
                className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-button disabled:opacity-50"
              >
                Продолжить <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

