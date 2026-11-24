"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthSession, User } from "@/types";
import { useToast } from "@/context/ToastContext";

const STORAGE_KEY = "aula-auth-session";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (session: AuthSession) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { notify } = useToast();
  const [session, setSessionState] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restaurar sesión persistida
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSessionState(JSON.parse(raw) as AuthSession);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  const setSession = useCallback((s: AuthSession) => {
    setSessionState(s);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }, []);

  const logout = useCallback(() => {
    setSessionState(null);
    localStorage.removeItem(STORAGE_KEY);
    notify("Cerraste sesión correctamente.", "info");
    router.replace("/login");
  }, [router, notify]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: !!session,
      isLoading,
      setSession,
      logout,
    }),
    [session, isLoading, setSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
