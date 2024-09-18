import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
export declare class TransactionsService {
    private transactionRepo;
    private readonly transactionEnity;
    private readonly transactionDatasource;
    constructor(transactionRepo: Repository<TransactionEntity>, transactionEnity: EntityManager, transactionDatasource: DataSource);
    createTransaction(createTransactionDto: CreateTransactionDto): Promise<TransactionEntity>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTransactionDto: UpdateTransactionDto): string;
    remove(id: number): string;
}
