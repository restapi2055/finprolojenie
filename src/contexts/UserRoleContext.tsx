import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "child" | "parent";

interface Child {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female";
  avatar?: string;
}

interface UserRoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  selectedChildId: string;
  setSelectedChildId: (id: string) => void;
  children: Child[];
  setChildren: (children: Child[]) => void;
}

const mockChildren: Child[] = [
  { id: "1", name: "Саша", age: 10, gender: "male", avatar: "avatar-child" },
  { id: "2", name: "Маша", age: 8, gender: "female" },
];

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider = ({ children: reactChildren }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>("child");
  const [selectedChildId, setSelectedChildId] = useState("1");
  const [children, setChildren] = useState<Child[]>(mockChildren);

  return (
    <UserRoleContext.Provider value={{ role, setRole, selectedChildId, setSelectedChildId, children, setChildren }}>
      {reactChildren}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const ctx = useContext(UserRoleContext);
  if (!ctx) throw new Error("useUserRole must be used within UserRoleProvider");
  return ctx;
};

