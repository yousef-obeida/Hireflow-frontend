import { create } from "zustand";
import type { User } from "@/types";

/* ------------------------------------------------------------------ */
/*  localStorage helpers                                               */
/* ------------------------------------------------------------------ */

const TOKEN_KEY = "token";
const USER_KEY = "user";

const getStoredToken = (): string | null => localStorage.getItem(TOKEN_KEY);

const getStoredUser = (): User | null => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

/* ------------------------------------------------------------------ */
/*  Store types                                                        */
/* ------------------------------------------------------------------ */

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  /** Save token + user after a successful login API call. */
  login: (token: string, user: User) => void;

  /** Clear everything and redirect to /login. */
  logout: () => void;

  /** Update the stored user (e.g. after fetching /profile). */
  setUser: (user: User) => void;
}

/* ------------------------------------------------------------------ */
/*  Store implementation                                               */
/* ------------------------------------------------------------------ */

export const useAuthStore = create<AuthState>((set) => ({
  // ---------- hydrate from localStorage on first load ----------
  token: getStoredToken(),
  user: getStoredUser(),
  isAuthenticated: !!getStoredToken(),

  // ---------- actions ----------
  login: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    set({ token: null, user: null, isAuthenticated: false });
  },

  setUser: (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    set({ user });
  },
}));
