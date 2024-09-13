import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';

@Injectable()
export class TransactionsService {



  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    private readonly transactionEnity: EntityManager,
    private readonly transactionDatasource: DataSource,
) {}

async createTransaction(createTransactionDto: CreateTransactionDto) {
  const transaction = new TransactionEntity();
  Object.assign(transaction, createTransactionDto);
      try {
      console.log('Transactioncreate',transaction)
        return await this.transactionEnity.save(transaction);
    } catch (err) {
        throw new BadRequestException(
            `SOMETHING WENT WRONG: ${err.message}`,
        );
    }
}
  

  // async create(createTransactionDto: CreateTransactionDto) {
  //   const transaction= new TransactionEntity(createTransactionDto);

  //   return 'This action adds a new transaction';
  // }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
