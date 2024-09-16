import { CreateTransactionDto } from './dto/create-transaction.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
export declare class TransactionsService {
    private transactionRepo;
    private readonly transactionEntity;
    private readonly transactionDatasource;
    constructor(transactionRepo: Repository<TransactionEntity>, transactionEntity: EntityManager, transactionDatasource: DataSource);
    createTransaction(createTransactionDto: CreateTransactionDto): Promise<TransactionEntity>;
    fetchTransactionsById1(id: number): Promise<TransactionEntity>;
    fetchTransactionsById(id: number): Promise<any>;
    findAllTransactions(): Promise<any>;
    findOne(id: number): string;
    updateTransaction(id: number, attrs: Partial<TransactionEntity>): Promise<any>;
    remove(id: number): string;
}
