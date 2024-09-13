import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    addTransaction(createTransactionDto: CreateTransactionDto): Promise<import("src/entities/transaction.entity").TransactionEntity>;
    fetchTransactionsById(id: number): Promise<any>;
    findAllTransactions(): Promise<any>;
    findOne(id: string): string;
    updateTransaction(id: string, body: UpdateTransactionDto): Promise<any>;
    remove(id: string): string;
}
