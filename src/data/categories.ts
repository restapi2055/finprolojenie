export interface TransactionCategory {
  id: string;
  name: string;
  icon: string;
  type: "income" | "expense";
}

export const defaultExpenseCategories: TransactionCategory[] = [
  { id: "e1", name: "Еда", icon: "UtensilsCrossed", type: "expense" },
  { id: "e2", name: "Транспорт", icon: "Bus", type: "expense" },
  { id: "e3", name: "Одежда", icon: "Shirt", type: "expense" },
  { id: "e4", name: "Развлечения", icon: "Gamepad2", type: "expense" },
  { id: "e5", name: "Подарки", icon: "Gift", type: "expense" },
  { id: "e6", name: "Спорт", icon: "Dumbbell", type: "expense" },
  { id: "e7", name: "Красота", icon: "Sparkles", type: "expense" },
  { id: "e8", name: "Канцелярия", icon: "Pencil", type: "expense" },
  { id: "e9", name: "Игрушки", icon: "ToyBrick", type: "expense" },
  { id: "e10", name: "Сладости", icon: "Cookie", type: "expense" },
];

export const defaultIncomeCategories: TransactionCategory[] = [
  { id: "i1", name: "Задания", icon: "ClipboardCheck", type: "income" },
  { id: "i2", name: "Подарок", icon: "Gift", type: "income" },
  { id: "i3", name: "Карманные", icon: "Wallet", type: "income" },
  { id: "i4", name: "Помощь по дому", icon: "Home", type: "income" },
  { id: "i5", name: "Учёба", icon: "GraduationCap", type: "income" },
  { id: "i6", name: "Продажа", icon: "ShoppingBag", type: "income" },
  { id: "i7", name: "Бонус", icon: "Star", type: "income" },
  { id: "i8", name: "Находка", icon: "Search", type: "income" },
  { id: "i9", name: "Приз", icon: "Trophy", type: "income" },
  { id: "i10", name: "Возврат", icon: "RotateCcw", type: "income" },
];

