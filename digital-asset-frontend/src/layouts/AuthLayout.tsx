import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,hsla(230,80%,90%,1)_0,transparent_50%),radial-gradient(at_100%_0%,hsla(280,80%,90%,1)_0,transparent_50%),radial-gradient(at_50%_100%,hsla(190,90%,90%,1)_0,transparent_50%)]"></div>
            <div className="relative z-10 w-full flex justify-center p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
