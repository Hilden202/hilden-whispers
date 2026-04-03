import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

const AUTH_KEY = "admin_auth";
const AUTH_EVENT = "auth_change";

function getSnapshot(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}

function subscribe(callback: () => void): () => void {
  const onAuth = () => callback();
  const onStorage = (e: StorageEvent) => {
    if (e.key === AUTH_KEY) callback();
  };
  window.addEventListener(AUTH_EVENT, onAuth);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(AUTH_EVENT, onAuth);
    window.removeEventListener("storage", onStorage);
  };
}

export function useAuth() {
  const isLoggedIn = useSyncExternalStore(subscribe, getSnapshot, () => false);

  const login = useCallback(() => {
    localStorage.setItem(AUTH_KEY, "true");
    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  return { isLoggedIn, login, logout };
}
