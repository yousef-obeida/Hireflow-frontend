import React from "react";
import { useSessionRestore } from "@/hooks/use-session-restore";

interface Props {
  children: React.ReactNode;
}

/**
 * Wraps the app and restores the session (GET /profile)
 * before rendering children. Shows a loading state while
 * the token is being validated.
 */
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const { isLoading } = useSessionRestore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#0058bc] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-[#414755] font-medium">Restoring session…</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
