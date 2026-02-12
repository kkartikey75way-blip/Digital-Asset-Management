import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

// Lazy load page components
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const VerifyPage = lazy(() => import("../pages/auth/VerifyPage"));
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const AssetsPage = lazy(() => import("../pages/dashboard/AssetsPage"));
const VendorsPage = lazy(() => import("../pages/dashboard/VendorPage"));
const AnalyticsPage = lazy(() => import("../pages/dashboard/AnalyticsPage"));
const ReportsPage = lazy(() => import("../pages/dashboard/ReportsPage"));

const PageLoader = () => (
    <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const LazyLoad = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<PageLoader />}>
        {children}
    </Suspense>
);

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            { path: "/login", element: <LazyLoad><LoginPage /></LazyLoad> },
            { path: "/register", element: <LazyLoad><RegisterPage /></LazyLoad> },
            { path: "/verify", element: <LazyLoad><VerifyPage /></LazyLoad> },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    { path: "/", element: <LazyLoad><DashboardPage /></LazyLoad> },
                    {
                        path: "/assets",
                        element: <LazyLoad><AssetsPage /></LazyLoad>,
                    },
                    {
                        element: (
                            <RoleRoute
                                allowedRoles={["admin", "manager"]}
                            />
                        ),
                        children: [
                            {
                                path: "/vendors",
                                element: <LazyLoad><VendorsPage /></LazyLoad>,
                            },
                            {
                                path: "/analytics",
                                element: <LazyLoad><AnalyticsPage /></LazyLoad>,
                            },
                            {
                                path: "/reports",
                                element: <LazyLoad><ReportsPage /></LazyLoad>,
                            },
                        ],
                    },
                    {
                        element: (
                            <RoleRoute allowedRoles={["admin"]} />
                        ),
                        children: [
                            {
                                path: "/admin",
                                element: <div>Admin Page</div>,
                            },
                        ],
                    },
                    {
                        path: "*",
                        element: <Navigate to="/" replace />,
                    },
                ],
            },
        ],
    },
]);
