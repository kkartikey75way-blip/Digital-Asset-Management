import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import Sidebar from "../components/layout/Sidebar";
import { navigationItems } from "../config/navigation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/reducers/authReducer";

const DashboardLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const role = useAppSelector(
        (state) => state.auth.role
    );

    const activeItem = useMemo(
        () =>
            navigationItems.find(
                (item) => item.path === location.pathname
            ),
        [location.pathname]
    );

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex flex-1 flex-col">
                <header className="sticky top-0 z-10 px-8 py-6">
                    <div className="glass-card flex items-center justify-between px-8 py-4 rounded-3xl">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                {activeItem?.label ??
                                    "Dashboard"}
                            </h1>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                                {activeItem?.path === "/" ? "Overview" : "Asset Control"}
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            {role && (
                                <div className="flex flex-col items-end">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Current Role</span>
                                    <span className="text-sm font-bold text-indigo-600">
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </span>
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="px-5 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-red-600 hover:border-red-100 transition-all duration-300"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 w-full px-6 py-8">
                    <div className="mx-auto max-w-6xl space-y-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
