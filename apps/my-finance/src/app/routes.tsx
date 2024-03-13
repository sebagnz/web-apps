export const Routes = {
  login: {
    index: '/login',
  },
  app: {
    accounts: {
      index: '/app/accounts',
      new: '/app/accounts/new',
      id: (id: string) => `/app/accounts/${id}`,
    },
    expenses: {
      index: '/app/expenses',
      new: '/app/expenses/new',
    },
    savings: {
      index: '/app/savings',
    },
  },
}
