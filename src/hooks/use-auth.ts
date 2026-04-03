import { useState, useEffect, useCallback } from "react";

const AUTH_KEY = "admin_auth";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem(AUTH_KEY) === "true"
  );

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === AUTH_KEY) {
        setIsLoggedIn(e.newValue === "true");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = useCallback(() => {
    localStorage.setItem(AUTH_KEY, "true");
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    setIsLoggedIn(false);
  }, []);

  return { isLoggedIn, login, logout };
}
