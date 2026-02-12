import type { UserRole } from "../store/reducers/authReducer";

type Role = UserRole | null;

export const canCreateAsset = (role: Role): boolean => {
    if (!role) return false;
    return role === "admin" || role === "manager";
};

export const canDeleteAsset = (role: Role): boolean => {
    if (!role) return false;
    return role === "admin";
};

export const canRenewAsset = (role: Role): boolean => {
    if (!role) return false;
    return role === "admin" || role === "manager";
};
