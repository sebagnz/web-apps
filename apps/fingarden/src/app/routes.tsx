export const Routes = {
  home: {
    index: '/',
  },
  login: {
    index: '/login',
  },
  app: {
    accounts: {
      index: '/app/accounts',
      new: '/app/accounts/new',
      id: (id: string) => `/app/accounts/${id}`,
      snapshots: {
        new: (id: string) => `/app/accounts/${id}/snapshots/new`,
        id: (id: string, snapshotId: string) => `/app/accounts/${id}/snapshots/${snapshotId}`,
      },
    },
    expenses: {
      index: '/app/expenses',
      new: '/app/expenses/new',
    },
    analytics: {
      index: '/app/analytics',
    },
    preferences: {
      index: '/app/preferences',
    },
  },
}
