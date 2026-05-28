import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";

export const ProtectedRoutes = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [activeSection, setActiveSection] = useState("dashboard");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div id="hireflow-root" className="min-h-screen bg-[#f9f9ff] text-[#111c2d] font-sans antialiased selection:bg-[#0058bc]/10 selection:text-[#0058bc]">
      <Navbar />
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar activeSection={activeSection} onNavigate={(id) => setActiveSection(id)} />
        <main className="flex-1 px-4 sm:px-6 md:px-12 py-6 md:py-10 overflow-x-hidden w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
