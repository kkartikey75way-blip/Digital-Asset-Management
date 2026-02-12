import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import type { UserRole } from "../store/reducers/authReducer";

interface RoleRouteProps {
    allowedRoles: UserRole[];
}

const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
    const { role } = useSelector(
        (state: RootState) => state.auth
    );

    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default RoleRoute;
