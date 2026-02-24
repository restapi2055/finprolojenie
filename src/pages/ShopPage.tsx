import { motion } from "framer-motion";
import { ShoppingBag, ShoppingCart, Shirt, User, PawPrint, Sprout, Car, Cookie, Palette, Check } from "lucide-react";
import GameCard from "@/components/GameCard";
import CoinBadge from "@/components/CoinBadge";
import LucideIcon from "@/components/LucideIcon";
import PageHeader from "@/components/PageHeader";
import BalanceSummary from "@/components/BalanceSummary";
import { mockShopItems } from "@/data/mockData";
import { useState } from "react";
import type { LucideIcon as LucideIconType } from "lucide-react";

const categories: { key: string; label: string; Icon: LucideIconType }[] = [
  { key: "all", label: "Все", Icon: ShoppingBag },
  { key: "accessory", label: "Аксессуары", Icon: Shirt },
  { key: "avatar", label: "Аватар", Icon: User },
  { key: "pet", label: "Питомцы", Icon: PawPrint },
  { key: "plant", label: "Растения", Icon: Sprout },
  { key: "vehicle", label: "Транспорт", Icon: Car },
  { key: "food", label: "Еда", Icon: Cookie },
  { key: "background", label: "Фоны", Icon: Palette },
];

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [items, setItems] = useState(mockShopItems);

  const filtered = activeCategory === "all" ? items : items.filter((i) => i.category === activeCategory);

  const handleBuy = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, owned: true } : i)));
  };

  return (
    <div className="pb-24 space-y-4">
      <PageHeader
        title="Магазин"
        icon={<ShoppingCart size={24} className="text-white/70" />}
        subtitle="Трать FIN с умом!"
      >
        <BalanceSummary />
      </PageHeader>

      
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
              activeCategory === cat.key
                ? "bg-primary text-primary-foreground"
                : "bg-white shadow-sm border border-gray-100 text-gray-500 hover:text-gray-700"
            }`}
          >
            <cat.Icon size={12} /> {cat.label}
          </button>
        ))}
      </div>

      
      <div className="grid grid-cols-2 gap-2.5">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
          >
            <GameCard className="text-center space-y-2 relative overflow-hidden">
              {item.owned && (
                <div className="absolute top-2 right-2 bg-primary/20 text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                  Куплено <Check size={10} />
                </div>
              )}
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center">
                <LucideIcon name={item.icon} size={28} className="text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-gray-900">{item.name}</h3>
              <div>
                {item.owned ? (
                  <span className="text-xs text-primary font-medium">В коллекции</span>
                ) : (
                  <button
                    onClick={() => handleBuy(item.id)}
                    className="bg-gradient-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold transition-transform hover:scale-105 active:scale-95"
                  >
                    <CoinBadge amount={item.price} size="sm" />
                  </button>
                )}
              </div>
            </GameCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;

