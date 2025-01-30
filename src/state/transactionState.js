import { atom, selector } from 'recoil';

// Base atom for storing transactions
export const transactionsState = atom({
  key: 'transactionsState',
  default: [],
});

// Derived state for calculating the current balance
export const balanceState = selector({
  key: 'balanceState',
  get: ({ get }) => {
    const transactions = get(transactionsState);
    return transactions.reduce((total, transaction) => {
      const amount = parseFloat(transaction.amount);
      return transaction.type === 'income' 
        ? total + amount 
        : total - amount;
    }, 0);
  },
});

// Selector for getting transactions sorted by date
export const sortedTransactionsState = selector({
  key: 'sortedTransactionsState',
  get: ({ get }) => {
    const transactions = get(transactionsState);
    return [...transactions].sort((a, b) => b.date - a.date);
  },
});

// Selector for getting transaction statistics
export const transactionStatsState = selector({
  key: 'transactionStatsState',
  get: ({ get }) => {
    const transactions = get(transactionsState);
    
    return transactions.reduce((stats, transaction) => {
      const amount = parseFloat(transaction.amount);
      
      if (transaction.type === 'income') {
        stats.totalIncome += amount;
        stats.incomeCount++;
      } else {
        stats.totalExpenses += amount;
        stats.expenseCount++;
      }
      
      return stats;
    }, {
      totalIncome: 0,
      totalExpenses: 0,
      incomeCount: 0,
      expenseCount: 0,
    });
  },
});

// Helper selector for filtering transactions by type
export const filteredTransactionsState = selector({
  key: 'filteredTransactionsState',
  get: ({ get }) => {
    const transactions = get(transactionsState);
    
    return {
      income: transactions.filter(t => t.type === 'income'),
      expense: transactions.filter(t => t.type === 'expense'),
    };
  },
});

// Transaction shape for reference:
// {
//   id: number,
//   type: 'income' | 'expense',
//   amount: number,
//   description: string,
//   date: number (timestamp),
//   created_at: number (timestamp)
// }
