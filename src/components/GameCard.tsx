import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GameCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  gradient?: string;
}

const GameCard = ({ children, className = "", onClick, gradient }: GameCardProps) => {
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`rounded-3xl p-4 transition-all ${
        gradient ? gradient : "bg-white shadow-sm border border-gray-100"
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GameCard;

