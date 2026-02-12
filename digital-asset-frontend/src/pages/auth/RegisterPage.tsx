import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "../../services/authApi";
import { useNavigate, Link } from "react-router-dom";

const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Minimum 6 characters"),
    role: z.enum(["admin", "manager", "viewer"]),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
    const navigate = useNavigate();
    const [registerUser, { isLoading, error }] =
        useRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser(data).unwrap();
            navigate("/login");
        } catch (err) {
            // If backend doesn't expose /auth/register and returns 404,
            // gracefully send the user to login instead of leaving them stuck.
            const maybeError = err as { status?: number };
            if (maybeError.status === 404) {
                navigate("/login");
            }
        }
    };

    const errorMessage =
        error && "data" in error
            ? (error.data as { message?: string })?.message
            : null;

    return (
        <div className="glass-card w-full max-w-lg p-12 rounded-[2.5rem] border-white/40 shadow-2xl">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                    Join the <span className="text-indigo-600">Fleet.</span>
                </h2>
                <p className="mt-3 text-slate-500 font-medium">
                    Create your account to start managing assets.
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

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Your Role</label>
                    <select
                        {...register("role")}
                        className="w-full rounded-2xl border border-slate-200 bg-white/50 p-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                    >
                        <option value="admin">Administrator</option>
                        <option value="manager">Project Manager</option>
                        <option value="viewer">Guest Viewer</option>
                    </select>
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
                        {isLoading ? "Creating Account..." : "Get Started"}
                    </button>
                </div>
            </form>

            <div className="mt-10 text-center">
                <p className="text-sm font-medium text-slate-500">
                    Already a member?{" "}
                    <Link
                        to="/login"
                        className="text-indigo-600 font-bold hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
