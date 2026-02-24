import { icons } from "lucide-react";

interface LucideIconProps {
  name: string;
  size?: number;
  className?: string;
}

const LucideIcon = ({ name, size = 20, className = "" }: LucideIconProps) => {
  const IconComponent = icons[name as keyof typeof icons];
  if (!IconComponent) return <span className={className}>?</span>;
  return <IconComponent size={size} className={className} />;
};

export default LucideIcon;

