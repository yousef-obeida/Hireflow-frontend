export const PERMISSIONS = {
    VIEW_DASHBOARD: 'view:dashboard',
    VIEW_CANDIDATES: 'view:candidates',
    MANAGE_CANDIDATES: 'manage:candidates', // Move candidates through pipeline
    ANALYZE_CV: 'analyze:cv',               // AI CV Analysis parsing
    VIEW_JOBS: 'view:jobs',
    MANAGE_JOBS: 'manage:jobs',             // Create, update job postings
    MANAGE_INTERVIEWS: 'manage:interviews', // Schedule interviews
    MANAGE_EMAILS: 'manage:emails',         // Automated email notifications
    VIEW_SETTINGS: 'view:settings',
    MANAGE_USERS: 'manage:users',           // Admin role scope
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
    ADMIN: [
        // Admin has ALL access EXCEPT interviews
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.VIEW_CANDIDATES,
        PERMISSIONS.MANAGE_CANDIDATES,
        PERMISSIONS.ANALYZE_CV,
        PERMISSIONS.VIEW_JOBS,
        PERMISSIONS.MANAGE_JOBS,
        PERMISSIONS.MANAGE_EMAILS,
        PERMISSIONS.VIEW_SETTINGS,
        PERMISSIONS.MANAGE_USERS,
    ],
    HR: [
        // HR has ALL access EXCEPT users
        PERMISSIONS.VIEW_DASHBOARD,
        PERMISSIONS.VIEW_CANDIDATES,
        PERMISSIONS.MANAGE_CANDIDATES,
        PERMISSIONS.ANALYZE_CV,
        PERMISSIONS.VIEW_JOBS,
        PERMISSIONS.MANAGE_JOBS,
        PERMISSIONS.MANAGE_INTERVIEWS,
        PERMISSIONS.MANAGE_EMAILS,
        PERMISSIONS.VIEW_SETTINGS,
    ],
};

