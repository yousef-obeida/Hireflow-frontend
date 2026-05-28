import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";
import { ProtectedRoutes } from "./protected-routes";
import { PublicRoutes } from "./public-routes";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { CandidatesPage } from "@/features/candidates/pages/CandidatesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "available-jobs",
        element: <div className="p-10 text-2xl font-bold">Available Jobs (Placeholder)</div>,
      },
      {
        path: "apply/:jobId?",
        element: <div className="p-10 text-2xl font-bold">Apply Page (Placeholder)</div>,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "dashboard",
        element: <div className="p-10 text-2xl font-bold">Dashboard Page (Placeholder)</div>,
      },
      {
        path: "jobs",
        element: <div className="p-10 text-2xl font-bold">Jobs Management (Placeholder)</div>,
      },
      {
        path: "candidates",
        element: <CandidatesPage />,
      },
      {
        path: "candidates/:id/analysis",
        element: <div className="p-10 text-2xl font-bold">Candidate Analysis (Placeholder)</div>,
      },
      {
        path: "stages",
        element: <div className="p-10 text-2xl font-bold">Stages (Placeholder)</div>,
      },
      {
        path: "interviews",
        element: <div className="p-10 text-2xl font-bold">Interviews (HR Only) (Placeholder)</div>,
      },
      {
        path: "users",
        element: <div className="p-10 text-2xl font-bold">Users (Admin Only) (Placeholder)</div>,
      },
      {
        path: "profile",
        element: <div className="p-10 text-2xl font-bold">Profile Page (Placeholder)</div>,
      },
    ],
  },
  {
    path: "/design-system",
    element: <App />,
  },
  {
    path: "*",
    element: <div className="p-10 text-2xl font-bold text-[#ba1a1a]">404 Not Found</div>,
  },
]);
