import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    private readonly transactionEntity: EntityManager,
    private readonly transactionDatasource: DataSource,
) {}


async createTransaction(createTransactionDto: CreateTransactionDto) {
  const transaction = new TransactionEntity(createTransactionDto);
  Object.assign(transaction, createTransactionDto);
      try {
        return await this.transactionEntity.save(transaction);
    } catch (err) {
        throw new BadRequestException(
            `SOMETHING WENT WRONG: ${err.message}`,
        );
    }
}
  
async fetchTransactionsById1(id:number) {

  try {
    return this.transactionRepo.findOne({ where: { TransactionId: id } });
} catch (e) {
    throw new Error(`Failed to find Trannsactions: ${e.message}`);
}
  }
  async fetchTransactionsById(id: number) {
    const queryRunner = this.transactionDatasource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const transaction = await queryRunner.query(
        `
        SELECT 
          a.TripId, a.tripNumber, a.ReservationId, a.FromDateTime, a.ToDateTime, a.PickupAddress, 
          a.DropAddress, a.PickupContactNo, a.PickupEmail, a.vehicleID, a.VehicleMake, a.VehicleModel,
          a.PickupFirstName + ' ' + a.PickupLastName AS [PickupName], 
          a.ArrivalFlightDateTime, a.ArrivalFlightNo, a.DepartureFlightDateTime, a.DepartureFlightNo, 
          a.Remarks, t.vehicleRegNo,  
          b.BookingFor, b.BookingStatus, b.Branch, b.BookingNo, b.BookingCategory, b.BookingType, 
          b.Source, b.companyName, d.DriverFirstName + ' ' + d.DriverLastName AS [DriverName], 
          t.TransactionId, t.MileageIN, t.MileageOUT, t.FuelIN, t.FuelOUT, t.[Transaction]
        FROM _cplreservationtrips a
        JOIN _cplReservations b ON a.ReservationId = b.ReservationId
        LEFT JOIN _cplVehicles c ON a.VehicleId = c.vehicleID
        LEFT JOIN _cplChaufferDrivers d ON a.DriverId = d.DriverId
        LEFT JOIN _cplTransactions t ON t.TripId = a.TripId
        WHERE t.TransactionId = @0
      `,
      [id] // Pass the transaction ID as a parameter
    );
    
    await queryRunner.commitTransaction();
    return transaction.length ? transaction[0] : null;
  } catch (e) {
    await queryRunner.rollbackTransaction();
    throw new Error(`Failed to find Transaction: ${e.message}`);
  } finally {
    await queryRunner.release();
  }
}
  



async findAllTransactions() {

  const transactionsQuery = await this.transactionDatasource.createQueryRunner();
  await transactionsQuery.connect();
  try {
    await transactionsQuery.startTransaction();
    const transactions = await transactionsQuery.query(
      `
select a.TripId,a.tripNumber,a.ReservationId,a.FromDateTime,a.ToDateTime,a.PickupAddress,a.DropAddress,a.PickupContactNo,a.PickupEmail,a.vehicleID,a.VehicleMake,a.TripStatus,
a.VehicleModel,a.PickupFirstName + ' ' + a.PickupLastName AS [PickupName],a.ArrivalFlightDateTime
,a.ArrivalFlightNo,a.DepartureFlightDateTime,a.DepartureFlightNo,a.Remarks,t.vehicleRegNo,
 b.BookingFor,b.BookingStatus,b.Branch,b.BookingNo,b.BookingCategory,b.BookingType,b.Source,b.companyName, d.DriverFirstName+' '+d.DriverLastName [DriverName] ,t.TransactionId,t.MileageIN,t.MileageOUT,t.FuelIN,t.FuelOUT,t.[Transaction] from _cplreservationtrips a 
                                join _cplReservations b on a.ReservationId=b.ReservationId left join _cplVehicles c on a.VehicleId = c.vehicleID left join _cplChaufferDrivers d on a.DriverId = d.DriverId left join _cplTransactions t on t.TripId = a.TripId where TransactionId is NOT NULL

                `,


    );
    await transactionsQuery.commitTransaction();
    return transactions;
  }
  catch (e) {
    throw new Error(`Failed to find any transactions: ${e.message}`);
  }
}



  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  async updateTransaction(id: number, attrs: Partial<TransactionEntity>) {
    const transaction = await this.fetchTransactionsById(id);
    if (!transaction) {
        throw new NotFoundException('transactions not found');
    }
    Object.assign(transaction, attrs);
    return this.transactionRepo.save(transaction);
}

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
