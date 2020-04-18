import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income: number = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue.value,
        0,
      );

    const outcome: number = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue.value,
        0,
      );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
