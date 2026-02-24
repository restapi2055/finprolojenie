import { useLocation, useNavigate } from "react-router-dom";
import { Home, ClipboardList, Wallet, Star, Settings } from "lucide-react";
import { useUserRole } from "@/contexts/UserRoleContext";

const childNavItems = [
  { path: "/home", Icon: Home, label: "Главная" },
  { path: "/tasks", Icon: ClipboardList, label: "Задания" },
  { path: "/wallet", Icon: Wallet, label: "Кошелёк" },
  { path: "/dream", Icon: Star, label: "Цель" },
];

const parentNavItems = [
  { path: "/home", Icon: Home, label: "Главная" },
  { path: "/tasks", Icon: ClipboardList, label: "Задания" },
  { path: "/wallet", Icon: Wallet, label: "Кошелёк" },
  { path: "/dream", Icon: Star, label: "Цель" },
  { path: "/settings", Icon: Settings, label: "Настройки" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useUserRole();

  if (location.pathname === "/") return null;

  const navItems = role === "parent" ? parentNavItems : childNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[hsl(30,30%,95%)]">
      <div className="flex items-center justify-around px-4 py-3 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-white/80 border border-gray-200 text-gray-400"
              }`}
            >
              <item.Icon size={22} />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

