import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { navigationItems } from "../../config/navigation";

const Sidebar = () => {
    const role = useAppSelector((state) => state.auth.role);

    const baseStyle =
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group";

    const activeStyle =
        "premium-gradient shadow-premium scale-[1.02] text-white";

    const inactiveStyle =
        "text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm";

    const filteredItems = navigationItems.filter(item =>
        role && item.roles.includes(role)
    );

    return (
        <aside className="w-72 bg-slate-50/50 backdrop-blur-xl border-r border-slate-200/50 p-8 flex flex-col">
            <div className="mb-10 px-2">
                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    Digital Asset
                </h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Management</p>
            </div>

            <nav className="space-y-2">
                {filteredItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
