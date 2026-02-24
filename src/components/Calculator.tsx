import { Delete } from "lucide-react";

interface CalculatorProps {
  value: string;
  onChange: (value: string) => void;
}

const Calculator = ({ value, onChange }: CalculatorProps) => {
  const handleDigit = (d: string) => {
    if (d === "." && value.includes(".")) return;
    onChange(value === "0" ? d : value + d);
  };

  const handleDelete = () => {
    if (value.length <= 1) { onChange(""); return; }
    onChange(value.slice(0, -1));
  };

  const numKeys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [".", "0", "del"],
  ];

  return (
    <div className="space-y-1">
      
      <div className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-right text-2xl font-bold text-gray-900 min-h-[52px]">
        {value || <span className="text-gray-300">0</span>}
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        {numKeys.flat().map(key => (
          <button
            key={key}
            onClick={() => key === "del" ? handleDelete() : handleDigit(key)}
            className={`h-12 rounded-xl text-lg font-semibold transition-all active:scale-95 ${
              key === "del"
                ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                : "bg-primary/5 text-gray-800 hover:bg-primary/15"
            }`}
          >
            {key === "del" ? <Delete size={20} className="mx-auto" /> : key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;

