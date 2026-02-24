import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import BottomNav from "./components/BottomNav";
import AuthPage from "./pages/AuthPage";
import RegisterPage from "./pages/RegisterPage";
import OnboardingPage from "./pages/OnboardingPage";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import WalletPage from "./pages/WalletPage";
import ShopPage from "./pages/ShopPage";
import DreamPage from "./pages/DreamPage";
import ProfilePage from "./pages/ProfilePage";
import PetPage from "./pages/PetPage";
import FriendsPage from "./pages/FriendsPage";
import ParentSettingsPage from "./pages/ParentSettingsPage";
import ChildrenSettingsPage from "./pages/settings/ChildrenSettingsPage";
import SkillsSettingsPage from "./pages/settings/SkillsSettingsPage";
import ProfessionsSettingsPage from "./pages/settings/ProfessionsSettingsPage";
import TasksSettingsPage from "./pages/settings/TasksSettingsPage";
import CurrencySettingsPage from "./pages/settings/CurrencySettingsPage";
import CharitySettingsPage from "./pages/settings/CharitySettingsPage";
import GoalsSettingsPage from "./pages/settings/GoalsSettingsPage";
import CategoriesSettingsPage from "./pages/settings/CategoriesSettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <UserRoleProvider>
          <div className="max-w-lg mx-auto min-h-screen p-4 page-gradient">
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/dream" element={<DreamPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/pet" element={<PetPage />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/settings" element={<ParentSettingsPage />} />
              <Route path="/settings/children" element={<ChildrenSettingsPage />} />
              <Route path="/settings/skills" element={<SkillsSettingsPage />} />
              <Route path="/settings/professions" element={<ProfessionsSettingsPage />} />
              <Route path="/settings/tasks" element={<TasksSettingsPage />} />
              <Route path="/settings/currency" element={<CurrencySettingsPage />} />
              <Route path="/settings/charity" element={<CharitySettingsPage />} />
              <Route path="/settings/goals" element={<GoalsSettingsPage />} />
              <Route path="/settings/categories" element={<CategoriesSettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <BottomNav />
        </UserRoleProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

