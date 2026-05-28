import { create } from "zustand";

/* ------------------------------------------------------------------ */
/*  UI State — layout preferences & transient UI state                 */
/* ------------------------------------------------------------------ */

interface UIState {
  /** Whether the sidebar is collapsed (icon-only mode) */
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

/**
 * Lightweight UI state store for layout preferences.
 * Keeps UI concerns separate from auth/server state.
 */
export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setSidebarCollapsed: (collapsed) =>
    set({ sidebarCollapsed: collapsed }),
}));
