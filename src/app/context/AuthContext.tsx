import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User, UserType } from "../types";
import { api } from "../services/api";

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
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const recoverSession = async () => {
      const token = localStorage.getItem("sos-chuva-token");
      const userId = localStorage.getItem("sos-chuva-user-id");

      if (token && userId) {
        try {
          const userData = await api.users.getProfile(userId);
          setUser(userData);
        } catch (error) {
          console.error("Erro ao recuperar sessão:", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    recoverSession();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.auth.login({ email, password });
    
    const token = response.token;
    const userData = response.user || response;
    
    if (token) localStorage.setItem("sos-chuva-token", token);
    if (userData?.id) localStorage.setItem("sos-chuva-user-id", userData.id);
    
    setUser(userData);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone: string,
    type: UserType,
    location: string,
  ) => {
    const response = await api.auth.register({
      name,
      email,
      password,
      phone,
      type,
      location,
    });

    const token = response.token;
    const userData = response.user || response;
    
    if (token) localStorage.setItem("sos-chuva-token", token);
    if (userData?.id) localStorage.setItem("sos-chuva-user-id", userData.id);

    // Auto-registrar perfil de voluntário se o tipo for voluntário
    if (userData.type === "volunteer") {
      try {
        await api.volunteers.register({
          userId: userData.id,
          name: userData.name,
          location: userData.location,
          phone: userData.phone,
          skills: ["Ajuda Geral"],
          availability: "Disponível",
          status: "available",
        });
      } catch (err) {
        console.error("Erro ao auto-registrar voluntário:", err);
      }
    }
    
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("sos-chuva-token");
    localStorage.removeItem("sos-chuva-user-id");
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
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

