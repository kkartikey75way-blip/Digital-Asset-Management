import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const DashboardPage = () => {
    const navigate = useNavigate();
    const role = useAppSelector((state) => state.auth.role);

    return (
        <div className="space-y-10">
            <section className="relative overflow-hidden rounded-[2.5rem] p-1 shadow-premium">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-xy"></div>
                <div className="relative flex flex-col gap-8 rounded-[2.4rem] bg-slate-950/90 backdrop-blur-2xl px-12 py-10 text-white lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                            Unlock your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">asset cockpit.</span>
                        </h2>
                        <p className="mt-6 text-lg text-slate-300 font-medium leading-relaxed">
                            Complete visibility over your licenses, renewals, and infrastructure costs. Manage everything in one sleek interface.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button
                            type="button"
                            onClick={() => navigate("/assets")}
                            className="group flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            View Assets
                            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </button>
                        {(role === "admin" || role === "manager") && (
                            <button
                                type="button"
                                onClick={() => navigate("/analytics")}
                                className="flex items-center gap-2 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-md px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:bg-slate-800 hover:border-slate-600 active:scale-95"
                            >
                                Cost Analytics
                            </button>
                        )}
                    </div>
                </div>
            </section>

            <section className="grid gap-8 md:grid-cols-3">
                {[
                    { title: "Licenses & SaaS", desc: "Enterprise-grade tracking for every license key and subscription contract.", icon: "💎" },
                    { title: "Smart Renewals", desc: "Intelligent expiry tracking with proactive alerts to prevent downtime.", icon: "⚡" },
                    { title: "Spend Control", desc: "Precision analytics to optimize your monthly and annual tech budget.", icon: "📊" }
                ].map((item, i) => (
                    <div key={i} className="glass-card group p-8 rounded-3xl">
                        <div className="mb-4 text-3xl opacity-80 group-hover:opacity-100 transition-opacity">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">
                            {item.title}
                        </h3>
                        <p className="mt-3 text-slate-500 font-medium leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default DashboardPage;
