import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { User, UserType } from "../types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    phone: string,
    type: UserType,
    location: string,
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - em produção isso seria uma chamada ao Supabase
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser: User = {
      id: "1",
      name: "Usuário Teste",
      email,
      phone: "(51) 99999-9999",
      type: "volunteer",
      location: "Porto Alegre, RS",
      createdAt: new Date(),
    };

    setUser(mockUser);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone: string,
    type: UserType,
    location: string,
  ) => {
    // Mock register - em produção isso seria uma chamada ao Supabase
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      type,
      location,
      createdAt: new Date(),
    };

    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider",
    );
  }
  return context;
}