export const ENDPOINTS = {
    auth: {
        login: "/login",
        logout: "/logout",
        me: "/me",
    },

    users: {
        all: "/users",
        create: "/users",

        details: (id: number | string) =>
            `/users/${id}`,

        update: (id: number | string) =>
            `/users/${id}`,

        delete: (id: number | string) =>
            `/users/${id}`,
    },

    jobs: {
        all: "/jobs",
        create: "/jobs",

        details: (id: number | string) =>
            `/jobs/${id}`,

        update: (id: number | string) =>
            `/jobs/${id}`,

        delete: (id: number | string) =>
            `/jobs/${id}`,
    },

    candidates: {
        all: "/candidates",
        create: "/candidates",

        details: (id: number | string) =>
            `/candidates/${id}`,

        update: (id: number | string) =>
            `/candidates/${id}`,

        delete: (id: number | string) =>
            `/candidates/${id}`,

        analysis: (id: number | string) =>
            `/candidates/${id}/analysis`,
    },

    stages: {
        all: "/stages",

        move: (id: number | string) =>
            `/stages/${id}/move`,
    },

    interviews: {
        all: "/interviews",
        create: "/interviews",

        details: (id: number | string) =>
            `/interviews/${id}`,

        schedule: (id: number | string) =>
            `/interviews/${id}`, // Includes automated email sending under the hood
    },

    dashboard: {
        stats: "/dashboard",
    },

    Public: {
        all: "/available-jobs",
        details: "/apply",
        create: (id: number | string) =>
            `/apply/${id}`,
    }

};