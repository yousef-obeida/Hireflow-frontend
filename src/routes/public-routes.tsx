import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";

export const PublicRoutes = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Redirect authenticated users away from public routes like login
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#111c2d] font-sans antialiased selection:bg-[#0058bc]/10 selection:text-[#0058bc]">
      <main className="flex-1 overflow-x-hidden w-full">
        <Outlet />
      </main>
    </div>
  );
};
