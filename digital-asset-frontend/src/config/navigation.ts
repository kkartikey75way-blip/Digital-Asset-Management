import type { UserRole } from "../store/reducers/authReducer";

export interface NavItem {
    label: string;
    path: string;
    roles: UserRole[];
}

export const navigationItems: NavItem[] = [
    {
        label: "Dashboard",
        path: "/",
        roles: ["admin", "manager", "viewer"],
    },
    {
        label: "Assets",
        path: "/assets",
        roles: ["admin", "manager", "viewer"],
    },
    {
        label: "Vendors",
        path: "/vendors",
        roles: ["admin", "manager"],
    },
    {
        label: "Reports",
        path: "/reports",
        roles: ["admin", "manager"],
    },
    {
        label: "Analytics",
        path: "/analytics",
        roles: ["admin", "manager"],
    },
];
