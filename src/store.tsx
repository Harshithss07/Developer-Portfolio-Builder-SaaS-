import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, PortfolioData, AnalyticsStats } from "./types";

interface StoreContextType {
  token: string | null;
  user: User | null;
  portfolio: PortfolioData | null;
  analytics: AnalyticsStats | null;
  activityLogs: { timestamp: string; message: string }[];
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, username: string, name: string) => Promise<boolean>;
  loginWithGoogle: (token: string, user: User) => Promise<void>;
  logout: () => void;
  updateProfile: (details: { name?: string; bio?: string; avatarUrl?: string }) => Promise<boolean>;
  savePortfolio: (port: PortfolioData) => Promise<boolean>;
  publishPortfolio: (status: boolean) => Promise<boolean>;
  fetchGithubProjects: (username: string) => Promise<any[]>;
  generateAIChatSug: (type: "hero" | "bio" | "project", content: string, tone?: string) => Promise<string>;
  fetchStats: () => Promise<void>;
  updateLocalPortfolioDirectly: (port: PortfolioData) => void;
  refetchPortfolio: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("devfolio_token") || null);
  const [user, setUser] = useState<User | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);
  const [activityLogs, setActivityLogs] = useState<{ timestamp: string; message: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Authenticate user on load if token is available
  useEffect(() => {
    async function loadMe() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          // Load Portfolio
          const pRes = await fetch("/api/portfolio/my", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (pRes.ok) {
            const pData = await pRes.json();
            setPortfolio(pData.portfolio);
          }
          // Load Stats
          await loadStats(token);
        } else {
          // Token expired
          logout();
        }
      } catch (err) {
        console.error("Load state error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMe();
  }, [token]);

  async function loadStats(userToken: string) {
    try {
      const sRes = await fetch("/api/analytics/my", {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      if (sRes.ok) {
        const sData = await sRes.json();
        setAnalytics(sData.stats);
        setActivityLogs(sData.activityLogs);
      }
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("devfolio_token", data.token);
        setToken(data.token);
        setUser(data.user);
        await loadStats(data.token);
        return true;
      } else {
        const err = await res.json();
        throw new Error(err.error || "Login failed");
      }
    } catch (e: any) {
      console.error("Login context error:", e);
      throw e;
    }
  };

  const signup = async (email: string, password: string, username: string, name: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username, name })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("devfolio_token", data.token);
        setToken(data.token);
        setUser(data.user);
        await loadStats(data.token);
        return true;
      } else {
        const err = await res.json();
        throw new Error(err.error || "Sign up failed");
      }
    } catch (e: any) {
      console.error("Signup context error:", e);
      throw e;
    }
  };

  const loginWithGoogle = async (googleToken: string, googleUser: User) => {
    localStorage.setItem("devfolio_token", googleToken);
    setToken(googleToken);
    setUser(googleUser);
    await loadStats(googleToken);
  };

  const logout = () => {
    localStorage.removeItem("devfolio_token");
    setToken(null);
    setUser(null);
    setPortfolio(null);
    setAnalytics(null);
    setActivityLogs([]);
  };

  const updateProfile = async (details: { name?: string; bio?: string; avatarUrl?: string }): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(details)
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        if (portfolio) {
          const updated = { ...portfolio };
          if (details.name) updated.hero.title = details.name;
          if (details.avatarUrl) updated.hero.avatarUrl = details.avatarUrl;
          setPortfolio(updated);
        }
        await loadStats(token);
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const savePortfolio = async (port: PortfolioData): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch("/api/portfolio/my/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ portfolio: port })
      });
      if (res.ok) {
        const data = await res.json();
        setPortfolio(data.portfolio);
        await loadStats(token);
        return true;
      }
    } catch (e) {
      console.error("Save portfolio failed:", e);
    }
    return false;
  };

  const publishPortfolio = async (status: boolean): Promise<boolean> => {
    if (!token || !portfolio) return false;
    try {
      const res = await fetch("/api/portfolio/my/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isPublished: status })
      });
      if (res.ok) {
        const updated = { ...portfolio, isPublished: status };
        setPortfolio(updated);
        await loadStats(token);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const fetchGithubProjects = async (username: string): Promise<any[]> => {
    try {
      const res = await fetch(`/api/github/repos?username=${encodeURIComponent(username)}`);
      if (res.ok) {
        const data = await res.json();
        return data.repos || [];
      }
    } catch (err) {
      console.error("Error fetching github", err);
    }
    return [];
  };

  const generateAIChatSug = async (type: "hero" | "bio" | "project", content: string, tone?: string): Promise<string> => {
    if (!token) return "";
    try {
      const res = await fetch("/api/ai/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ type, content, tone })
      });
      if (res.ok) {
        const data = await res.json();
        return data.text || "";
      }
    } catch (err) {
      console.error("Generate AI trigger failed:", err);
    }
    return "";
  };

  const fetchStats = async () => {
    if (token) {
      await loadStats(token);
    }
  };

  const updateLocalPortfolioDirectly = (updated: PortfolioData) => {
    setPortfolio(updated);
  };

  const refetchPortfolio = async () => {
    if (!token) return;
    const pRes = await fetch("/api/portfolio/my", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (pRes.ok) {
      const pData = await pRes.json();
      setPortfolio(pData.portfolio);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        token,
        user,
        portfolio,
        analytics,
        activityLogs,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        loginWithGoogle,
        logout,
        updateProfile,
        savePortfolio,
        publishPortfolio,
        fetchGithubProjects,
        generateAIChatSug,
        fetchStats,
        updateLocalPortfolioDirectly,
        refetchPortfolio
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}
