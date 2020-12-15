import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {

      if( type == 'outcome'){
        const balance = this.transactionsRepository.getBalance();
        const totalBalance = balance.total - value;

        if(totalBalance < 0){
          throw Error('should not be able to create outcome transaction without a valid balance');
        }
      }

      return this.transactionsRepository.create({
        title,
        value,
        type
      });
  }
}

export default CreateTransactionService;
