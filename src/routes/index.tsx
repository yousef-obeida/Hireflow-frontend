import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";
import { ProtectedRoutes } from "./protected-routes";
import { PublicRoutes } from "./public-routes";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { CandidatesPage } from "@/features/candidates/pages/CandidatesPage";
import { JobsPage } from "@/features/jobs/pages/JobsPage";
import { CvAnalysisPage } from "@/features/candidates/pages/CvAnalysisPage";
import { PipelinePage } from "@/features/candidates/pages/PipelinePage";
import { UsersPage } from "@/features/users/pages/UsersPage";
import { JobDetailPage } from "@/features/jobs/pages/JobDetailPage";
import { InterviewsPage } from "@/features/interviews/pages/InterviewsPage";

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
        element: <JobsPage />,
      },
      {
        path: "jobs/:id",
        element: <JobDetailPage />,
      },
      {
        path: "candidates",
        element: <CandidatesPage />,
      },
      {
        path: "candidates/:id/analysis",
        element: <CvAnalysisPage />,
      },
      {
        path: "pipelines",
        element: <PipelinePage />,
      },
      {
        path: "interviews",
        element: <InterviewsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
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
