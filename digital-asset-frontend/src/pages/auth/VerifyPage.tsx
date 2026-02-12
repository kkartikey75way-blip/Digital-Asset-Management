import { Link, useSearchParams } from "react-router-dom";
import { useVerifyQuery } from "../../services/authApi";
import LoadingState from "../../components/ui/LoadingState";

const VerifyPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const { data, isLoading, isError, error } = useVerifyQuery(token || "", {
        skip: !token,
    });

    if (!token) {
        return (
            <div className="glass-card w-full max-w-lg p-12 rounded-[2.5rem] border-white/40 shadow-2xl text-center">
                <div className="text-5xl mb-6">⚠️</div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                    Invalid Link
                </h2>
                <p className="text-slate-500 font-medium mb-8">
                    The verification link is missing or malformed.
                </p>
                <Link
                    to="/login"
                    className="premium-button premium-gradient inline-block px-10 py-4 rounded-2xl font-bold text-white shadow-premium"
                >
                    Back to Login
                </Link>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="glass-card w-full max-w-lg p-12 rounded-[2.5rem] border-white/40 shadow-2xl">
                <LoadingState label="Verifying your account..." />
            </div>
        );
    }

    if (isError) {
        const errorMessage =
            error && "data" in error
                ? (error.data as { message?: string })?.message
                : "Verification failed";

        return (
            <div className="glass-card w-full max-w-lg p-12 rounded-[2.5rem] border-white/40 shadow-2xl text-center">
                <div className="text-5xl mb-6">❌</div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                    Verification Failed
                </h2>
                <p className="text-red-500 font-bold mb-4">{errorMessage}</p>
                <p className="text-slate-500 font-medium mb-8">
                    Your link may have expired. Please try registering again or contact support.
                </p>
                <Link
                    to="/register"
                    className="premium-button premium-gradient inline-block px-10 py-4 rounded-2xl font-bold text-white shadow-premium"
                >
                    Try Registering Again
                </Link>
            </div>
        );
    }

    const userRole = data?.data?.role || "unknown";

    return (
        <div className="glass-card w-full max-w-lg p-12 rounded-[2.5rem] border-white/40 shadow-2xl text-center animate-in zoom-in duration-500">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
                Email <span className="text-indigo-600">Verified!</span>
            </h2>
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Confirmed Role
                </p>
                <p className="text-2xl font-black text-indigo-700 capitalize">
                    {userRole}
                </p>
            </div>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                Your account is now fully active. You can proceed to the dashboard using the button below.
            </p>
            <Link
                to="/login"
                className="premium-button premium-gradient w-full py-4 rounded-2xl font-bold text-white shadow-premium hover:shadow-glow text-lg block"
            >
                Launch Cockpit
            </Link>
        </div>
    );
};

export default VerifyPage;
