import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useLoginMutation } from "../../services/authApi";
import { setCredentials, type UserRole } from "../../store/reducers/authReducer";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Minimum 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading, error }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    // Handlers
    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await login(data).unwrap();
            const accessToken = response.data.accessToken;

            // Decode JWT payload to extract role
            const [, payload] = accessToken.split(".");
            const decoded = JSON.parse(atob(payload)) as { role?: UserRole };
            const role = decoded.role ?? "viewer";

            dispatch(setCredentials({ accessToken, role }));
            navigate("/");
        } catch {
            // handled by error state
        }
    };

    // Derived State
    const errorMessage =
        error && "data" in error
            ? (error.data as { message?: string })?.message
            : null;

    return (
        <div className="glass-card w-full max-w-lg p-12 rounded-[2.5rem] border-white/40 shadow-2xl">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                    Welcome <span className="text-indigo-600">Back.</span>
                </h2>
                <p className="mt-3 text-slate-500 font-medium">
                    Enter your credentials to access your cockpit.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input
                        {...register("email")}
                        placeholder="name@company.com"
                        className="w-full rounded-2xl border border-slate-200 bg-white/50 p-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs font-bold text-red-500 ml-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Security Key</label>
                    <input
                        type="password"
                        {...register("password")}
                        placeholder="••••••••"
                        className="w-full rounded-2xl border border-slate-200 bg-white/50 p-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    {errors.password && (
                        <p className="mt-1 text-xs font-bold text-red-500 ml-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-100">
                        <p className="text-xs font-bold text-red-600">
                            {errorMessage}
                        </p>
                    </div>
                )}

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="premium-button premium-gradient w-full py-4 rounded-2xl font-bold shadow-premium hover:shadow-glow disabled:opacity-60 text-lg"
                    >
                        {isLoading ? "Authenticating..." : "Sign In"}
                    </button>
                </div>
            </form>

            <div className="mt-10 text-center">
                <p className="text-sm font-medium text-slate-500">
                    New to the platform?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-600 font-bold hover:underline"
                    >
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
