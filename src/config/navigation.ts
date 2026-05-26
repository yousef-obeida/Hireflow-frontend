import { ROUTES } from '../app/constants.ts';
import { Briefcase, Users, LayoutDashboard, Settings, CalendarCheck, FileText, Mail } from 'lucide-react';

export const NAVIGATION = [
    {
        name: 'Dashboard',
        href: ROUTES.DASHBOARD,
        icon: LayoutDashboard,
        permissions: ['view:dashboard'], // Both Admin and HR
    },
    {
        name: 'Candidates',
        href: ROUTES.CANDIDATES,
        icon: Users,
        permissions: ['view:candidates', 'manage:candidates'], // Both Admin and HR
    },
    {
        name: 'Jobs',
        href: '/jobs',
        icon: Briefcase,
        permissions: ['view:jobs', 'manage:jobs'], // Both Admin and HR
    },
    {
        name: 'Interviews',
        href: '/interviews',
        icon: CalendarCheck,
        permissions: ['manage:interviews'], // HR only
    },
    {
        name: 'CV Analysis',
        href: '/cv-analysis',
        icon: FileText,
        permissions: ['analyze:cv'], // Both Admin and HR
    },
    {
        name: 'Emails',
        href: '/emails',
        icon: Mail,
        permissions: ['manage:emails'], // Both Admin and HR
    },
    {
        name: 'Users',
        href: '/users',
        icon: Users,
        permissions: ['manage:users'], // Admin only
    },
    {
        name: 'Settings',
        href: '/settings',
        icon: Settings,
        permissions: ['view:settings'], // Both Admin and HR
    },
];
