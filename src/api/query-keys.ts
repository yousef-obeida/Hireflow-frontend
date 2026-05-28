export const queryKeys = {
    auth: {
        session: ['auth', 'session'] as const,
    },
    dashboard: {
        stats: ['dashboard', 'stats'] as const,
    },
    candidates: {
        all: ['candidates'] as const,
        lists: () => [...queryKeys.candidates.all, 'list'] as const,
        list: (filters?: object) => [...queryKeys.candidates.lists(), { filters }] as const,
        details: () => [...queryKeys.candidates.all, 'detail'] as const,
        detail: (id: string | number) => [...queryKeys.candidates.details(), id] as const,
    },
    jobs: {
        all: ['jobs'] as const,
        lists: () => [...queryKeys.jobs.all, 'list'] as const,
        list: (filters?: object) => [...queryKeys.jobs.lists(), { filters }] as const,
        detail: (id: string | number) => [...queryKeys.jobs.all, 'detail', id] as const,
    },
    users: {
        all: ['users'] as const,
        lists: () => [...queryKeys.users.all, 'list'] as const,
        list: (filters?: object) => [...queryKeys.users.lists(), { filters }] as const,
        detail: (id: string | number) => [...queryKeys.users.all, 'detail', id] as const,
    },
    interviews: {
        all: ['interviews'] as const,
        lists: () => [...queryKeys.interviews.all, 'list'] as const,
        list: (filters?: object) => [...queryKeys.interviews.lists(), { filters }] as const,
        detail: (id: string | number) => [...queryKeys.interviews.all, 'detail', id] as const,
    },
    pipeline: {
        all: ['pipeline'] as const,
        stages: ['pipeline', 'stages'] as const,
    },
    cv: {
        analysis: (candidateId: string | number) => ['cv', 'analysis', candidateId] as const,
    },
    emails: {
        logs: ['emails', 'logs'] as const,
    }
};

