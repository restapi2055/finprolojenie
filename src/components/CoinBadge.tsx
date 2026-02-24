import { motion } from "framer-motion";
import { CircleDollarSign } from "lucide-react";

interface CoinBadgeProps {
  amount: number;
  currency?: "FIN" | "RUB";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

const CoinBadge = ({ amount, currency = "FIN", size = "md", animate = false }: CoinBadgeProps) => {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-lg px-4 py-1.5 gap-2 font-bold",
  };

  const iconSize = { sm: 12, md: 14, lg: 20 };

  return (
    <motion.span
      className={`inline-flex items-center rounded-full font-bold ${sizeClasses[size]} ${
        currency === "FIN"
          ? "bg-coin/15 text-coin"
          : "bg-primary/15 text-primary"
      }`}
      animate={animate ? { scale: [1, 1.08, 1] } : undefined}
      transition={{ duration: 0.3 }}
    >
      {currency === "FIN" ? <CircleDollarSign size={iconSize[size]} /> : <span>₽</span>}
      {amount.toLocaleString()}
    </motion.span>
  );
};

export default CoinBadge;

