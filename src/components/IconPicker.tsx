import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import LucideIcon from "./LucideIcon";

const ICON_OPTIONS = [
  "ClipboardList", "BedDouble", "BookOpen", "ChefHat", "Presentation",
  "Dumbbell", "Sparkles", "Flower2", "Smartphone", "Code",
  "Palette", "Briefcase", "Microscope", "Music", "Camera",
  "Heart", "Star", "Trophy", "Target", "Lightbulb",
  "Pencil", "Calculator", "Globe", "Wrench", "Hammer",
  "ShoppingCart", "Car", "Plane", "Dog", "Cat",
  "TreePine", "Sun", "Moon", "Coffee", "Pizza",
];

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
  label?: string;
}

const IconPicker = ({ value, onChange, label = "Иконка" }: IconPickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-700 hover:border-primary/40 transition-colors w-full"
      >
        <span className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <LucideIcon name={value || "ClipboardList"} size={14} className="text-primary" />
        </span>
        <span className="truncate">{label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/30"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              exit={{ y: 80 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white rounded-t-3xl p-5 pb-8 max-h-[60vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-gray-900">Выберите иконку</h3>
                <button onClick={() => setOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {ICON_OPTIONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => { onChange(icon); setOpen(false); }}
                    className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all ${
                      value === icon
                        ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                        : "bg-gray-50 text-gray-600 hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <LucideIcon name={icon} size={20} />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IconPicker;

