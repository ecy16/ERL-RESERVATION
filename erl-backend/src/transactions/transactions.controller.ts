import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/create')
  addTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @Get('/ById/:id')
  fetchTrnasactions(@Param('id') id: number){
    return this.transactionsService.fetchTransactionsById((id));
  }
  @Get()
  findAllTransactions() {
    return this.transactionsService.findAllTransactions();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch('update/:id')
  updateTransaction(@Param('id') id: string, @Body() body: UpdateTransactionDto) {
    return this.transactionsService.updateTransaction(parseInt(id), body)
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
