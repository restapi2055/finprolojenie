export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: "FIN" | "RUB";
  icon: string;
  color: string;
}

export interface Dream {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  level: number;
  image: string;
  currency: "FIN" | "RUB";
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  category: string;
  icon: string;
  completed: boolean;
  deadline?: string;
  profession?: string;
  skill?: string;
  completedAt?: string;
  completionPhoto?: string;
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  category: "avatar" | "pet" | "vehicle" | "background" | "accessory" | "plant" | "food";
  icon: string;
  owned: boolean;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  currency: "FIN" | "RUB";
  category: string;
  date: string;
  time?: string;
  profession?: string;
  skill?: string;
  taskName?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  icon: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

export interface Pet {
  id: string;
  name: string;
  type: "cat" | "dog" | "hamster" | "fish" | "bird";
  icon: string;
  level: number;
  happiness: number;
  hunger: number;
  totalSpent: number;
}

export interface Plant {
  id: string;
  name: string;
  type: "tree" | "cactus" | "rose";
  icon: string;
  level: number;
  growth: number;
  totalSpent: number;
}

export interface Vehicle {
  id: string;
  name: string;
  type: "car" | "motorcycle" | "bike" | "skateboard";
  icon: string;
  level: number;
  speed: number;
  totalSpent: number;
}

export interface Profession {
  id: string;
  name: string;
  icon: string;
  goal: number;
  earned: number;
  description: string;
  mastered: boolean;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  rank: string;
  totalSaved: number;
  streak: number;
  online: boolean;
}

export const mockUser = {
  name: "Саша",
  avatar: "User",
  gender: "male" as const,
  age: 10,
  profession: "Блогер",
  professionIcon: "Smartphone",
  rank: "Финансовый Ученик",
  rankLevel: 3,
  streak: 7,
  totalEarned: 1540,
  totalSpent: 680,
  daysInApp: 14,
  nextSalary: 3,
  joinDate: "2025-01-15",
};

export const mockAccounts: Account[] = [
  { id: "1", name: "Основной FIN", balance: 340, currency: "FIN", icon: "Coins", color: "primary" },
  { id: "2", name: "Рублёвый", balance: 1200, currency: "RUB", icon: "Landmark", color: "success" },
  { id: "3", name: "Цель", balance: 540, currency: "FIN", icon: "Target", color: "secondary" },
  { id: "5", name: "Благотворительность", balance: 50, currency: "FIN", icon: "HeartHandshake", color: "warning" },
];

export const mockDream: Dream = {
  id: "1",
  name: "Проектор для кино",
  targetAmount: 3000,
  currentAmount: 540,
  level: 1,
  image: "Clapperboard",
  currency: "FIN",
};

export const mockTasks: Task[] = [
  { id: "1", title: "Заправить постель", description: "Аккуратно застелить кровать утром", reward: 10, category: "Дом", icon: "BedDouble", completed: false, deadline: "2026-02-25" },
  { id: "2", title: "Прочитать 20 страниц", description: "Любая книга по выбору", reward: 15, category: "Учёба", icon: "BookOpen", completed: false, deadline: "2026-03-01", skill: "Чтение" },
  { id: "3", title: "Помочь с ужином", description: "Помочь маме на кухне", reward: 20, category: "Дом", icon: "ChefHat", completed: true, completedAt: "2026-02-24T14:30:00" },
  { id: "4", title: "Пройти урок по презентациям", description: "Мини-курс: как делать крутые слайды", reward: 25, category: "Навыки", icon: "Presentation", completed: false, deadline: "2026-02-28", profession: "Блогер", skill: "Презентации" },
  { id: "5", title: "30 минут спорта", description: "Зарядка, бег или велосипед", reward: 15, category: "Спорт", icon: "Dumbbell", completed: false, deadline: "2026-02-24", skill: "Спорт" },
  { id: "6", title: "Убраться в комнате", description: "Навести порядок на столе и полках", reward: 30, category: "Дом", icon: "Sparkles", completed: false, deadline: "2026-02-24" },
  { id: "7", title: "Сделать домашку по математике", description: "Решить 10 задач из учебника", reward: 20, category: "Учёба", icon: "BookOpen", completed: true, completedAt: "2026-02-20T10:30:00", profession: "Программист", skill: "Финансы" },
  { id: "8", title: "Полить цветы", description: "Полить все растения дома", reward: 5, category: "Дом", icon: "Flower2", completed: true, completedAt: "2026-02-19T09:00:00" },
  { id: "9", title: "Записать видео", description: "Снять короткий ролик для блога", reward: 30, category: "Навыки", icon: "Smartphone", completed: true, completedAt: "2026-02-18T16:45:00", profession: "Блогер", skill: "Презентации" },
];

export const mockShopItems: ShopItem[] = [
  { id: "1", name: "Кепка хакера", price: 50, category: "accessory", icon: "Crown", owned: false },
  { id: "2", name: "Крутые очки", price: 40, category: "accessory", icon: "Glasses", owned: true },
  { id: "3", name: "Котик", price: 150, category: "pet", icon: "Cat", owned: false },
  { id: "4", name: "Щенок", price: 150, category: "pet", icon: "Dog", owned: false },
  { id: "5", name: "Скейтборд", price: 200, category: "vehicle", icon: "Bike", owned: false },
  { id: "6", name: "Велосипед", price: 300, category: "vehicle", icon: "Bike", owned: false },
  { id: "7", name: "Космический фон", price: 80, category: "background", icon: "Moon", owned: false },
  { id: "8", name: "Куртка-бомбер", price: 70, category: "avatar", icon: "Shirt", owned: false },
  { id: "9", name: "Хомяк", price: 100, category: "pet", icon: "Squirrel", owned: false },
  { id: "10", name: "Кроссовки", price: 60, category: "avatar", icon: "Footprints", owned: false },
  { id: "11", name: "Корм для питомца", price: 10, category: "food", icon: "Cookie", owned: false },
  { id: "12", name: "Лакомство", price: 15, category: "food", icon: "Bone", owned: false },
  { id: "13", name: "Дерево", price: 80, category: "plant", icon: "TreePine", owned: false },
  { id: "14", name: "Кактус", price: 50, category: "plant", icon: "Flower2", owned: false },
  { id: "15", name: "Роза", price: 60, category: "plant", icon: "Flower", owned: false },
];

export const mockTransactions: Transaction[] = [
  { id: "1", description: "Домашка по математике", amount: 15, type: "income", currency: "FIN", category: "Задания", date: "2025-02-23", time: "10:30", taskName: "Домашка по математике", profession: "Программист", skill: "Финансы" },
  { id: "2", description: "Помощь брату", amount: 5, type: "income", currency: "FIN", category: "Бонус", date: "2025-02-23", time: "14:15", taskName: "Помощь брату" },
  { id: "3", description: "Скин для аватара", amount: 40, type: "expense", currency: "FIN", category: "Магазин", date: "2025-02-22", time: "16:00" },
  { id: "4", description: "Курс презентации", amount: 10, type: "income", currency: "FIN", category: "Навыки", date: "2025-02-22", time: "11:45", taskName: "Пройти урок по презентациям", profession: "Блогер", skill: "Презентации" },
  { id: "5", description: "На цель", amount: 20, type: "expense", currency: "FIN", category: "Накопления", date: "2025-02-21", time: "09:00" },
  { id: "6", description: "Карманные от бабушки", amount: 500, type: "income", currency: "RUB", category: "Подарок", date: "2025-02-20", time: "12:00" },
  { id: "7", description: "Заработок блогера", amount: 300, type: "income", currency: "FIN", category: "Профессия", date: "2025-02-20", time: "18:30", profession: "Блогер", skill: "Презентации" },
  { id: "8", description: "Еда для питомца", amount: 15, type: "expense", currency: "FIN", category: "Магазин", date: "2025-02-19", time: "15:20" },
  { id: "9", description: "Оплата: мороженое", amount: 50, type: "expense", currency: "FIN", category: "Покупки", date: "2025-02-18", time: "13:10" },
  { id: "10", description: "Благотворительность", amount: 10, type: "expense", currency: "FIN", category: "Благотворительность", date: "2025-02-17", time: "10:00" },
];

export const mockSkills: Skill[] = [
  { id: "1", name: "Презентации", level: 3, maxLevel: 10, icon: "Presentation" },
  { id: "2", name: "Финансы", level: 5, maxLevel: 10, icon: "TrendingUp" },
  { id: "3", name: "Кодинг", level: 1, maxLevel: 10, icon: "Code" },
  { id: "4", name: "Спорт", level: 4, maxLevel: 10, icon: "Dumbbell" },
  { id: "5", name: "Чтение", level: 6, maxLevel: 10, icon: "BookOpen" },
  { id: "6", name: "Творчество", level: 2, maxLevel: 10, icon: "Palette" },
];

export const mockAchievements: Achievement[] = [
  { id: "1", name: "Первый доход", description: "Заработай свои первые FIN", icon: "Coins", unlocked: true, date: "2025-01-15" },
  { id: "2", name: "Я веду деньги", description: "Создай первый недельный отчёт", icon: "BarChart3", unlocked: true, date: "2025-01-22" },
  { id: "3", name: "Планирую прибыль", description: "Составь план заработка на неделю", icon: "FileText", unlocked: true, date: "2025-02-01" },
  { id: "4", name: "7 дней подряд", description: "Заходи в приложение 7 дней подряд", icon: "Flame", unlocked: true, date: "2025-02-10" },
  { id: "5", name: "Мастер накоплений", description: "Накопи 500 FIN на цель", icon: "Star", unlocked: true, date: "2025-02-15" },
  { id: "6", name: "Я заработал сам", description: "Получи первую прибыль от мини-бизнеса", icon: "Trophy", unlocked: false },
  { id: "7", name: "Покупка цели", description: "Купи свою первую цель", icon: "Gift", unlocked: false },
  { id: "8", name: "Инвестор", description: "Открой инвестиционный счёт", icon: "TrendingUp", unlocked: true, date: "2025-02-05" },
  { id: "9", name: "Добрая душа", description: "Перечисли на благотворительность", icon: "HeartHandshake", unlocked: true, date: "2025-02-12" },
  { id: "10", name: "30 дней подряд", description: "Заходи в приложение 30 дней подряд", icon: "Crown", unlocked: false },
];

export const mockPet: Pet = {
  id: "1",
  name: "Мурка",
  type: "cat",
  icon: "Cat",
  level: 3,
  happiness: 75,
  hunger: 60,
  totalSpent: 120,
};

export const mockPlant: Plant = {
  id: "1",
  name: "Дубок",
  type: "tree",
  icon: "TreePine",
  level: 2,
  growth: 45,
  totalSpent: 80,
};

export const mockVehicle: Vehicle = {
  id: "1",
  name: "Скейт",
  type: "skateboard",
  icon: "Bike",
  level: 1,
  speed: 30,
  totalSpent: 200,
};

export const mockProfessions: Profession[] = [
  { id: "1", name: "Блогер", icon: "Smartphone", goal: 500, earned: 500, description: "Создавай контент и веди свой блог", mastered: true },
  { id: "2", name: "Программист", icon: "Code", goal: 600, earned: 180, description: "Пиши код и создавай программы", mastered: false },
  { id: "3", name: "Художник", icon: "Palette", goal: 400, earned: 50, description: "Рисуй и создавай арт", mastered: false },
  { id: "4", name: "Спортсмен", icon: "Dumbbell", goal: 500, earned: 0, description: "Тренируйся и побеждай", mastered: false },
  { id: "5", name: "Учёный", icon: "Microscope", goal: 700, earned: 0, description: "Исследуй мир и делай открытия", mastered: false },
  { id: "6", name: "Предприниматель", icon: "Briefcase", goal: 1000, earned: 0, description: "Создавай свой бизнес и зарабатывай", mastered: false },
];

export const mockFriends: Friend[] = [
  { id: "1", name: "Маша", avatar: "friend-masha", rank: "Финансовый Мастер", totalSaved: 2100, streak: 14, online: true },
  { id: "2", name: "Дима", avatar: "friend-dima", rank: "Финансовый Ученик", totalSaved: 980, streak: 5, online: false },
  { id: "3", name: "Аня", avatar: "friend-anya", rank: "Финансовый Стажёр", totalSaved: 540, streak: 3, online: true },
  { id: "4", name: "Кирилл", avatar: "friend-kirill", rank: "Финансовый Гуру", totalSaved: 4500, streak: 30, online: false },
  { id: "5", name: "Лена", avatar: "friend-lena", rank: "Финансовый Мастер", totalSaved: 1800, streak: 10, online: true },
];

export const dailyMission = {
  title: "Челлендж дня",
  description: "Не потрать ни одного FIN сегодня!",
  reward: 20,
  icon: "Flame",
};

export const dailyCaseRewards = [
  { id: "1", name: "10 FIN", icon: "CircleDollarSign", amount: 10, rarity: "common" },
  { id: "2", name: "25 FIN", icon: "Coins", amount: 25, rarity: "uncommon" },
  { id: "3", name: "50 FIN", icon: "Gem", amount: 50, rarity: "rare" },
  { id: "4", name: "Скин", icon: "Palette", amount: 0, rarity: "rare" },
  { id: "5", name: "100 FIN", icon: "Crown", amount: 100, rarity: "legendary" },
];

