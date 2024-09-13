import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateContractDetailDto } from '../dto/create-contract-detail.dto';
import { UpdateContractDetailDto } from '../dto/update-contract-detail.dto';

import { DataSource, EntityManager, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from } from 'rxjs';
import { ContractDetailEntity } from 'src/entities/contract-detail.entity';
import { error } from 'console';



@Injectable()
export class ContractDetailsService {


  constructor(
    @InjectRepository(ContractDetailEntity)
    private contractDetailsRepo: Repository<ContractDetailEntity>,

    private readonly ContractDetailEntity: EntityManager,

    private readonly contractDetailDataSource: DataSource,

  ) {

  }

  // <-----createContractDetails->

  async createContractDetails(createContractDetailDto: CreateContractDetailDto) {
    const contractDetail = new ContractDetailEntity(createContractDetailDto);

    contractDetail.ContractDetailNo
    try {
      // Fetch the current maximum ContractDetailNo for the given ContractId
      const maxContractDetail = await this.contractDetailsRepo
        .createQueryBuilder("contractDetail")
        .select("MAX(contractDetail.ContractDetailNo)", "max")
        .where("contractDetail.ContractId = :contractId", { contractId: createContractDetailDto.ContractId })
        .getRawOne();

      // Increment the ContractDetailNo for the given ContractId
      const newContractDetailNo = (maxContractDetail.max || 0) + 1;
      contractDetail.ContractDetailNo = newContractDetailNo;

      // Save the new contract detail
      return await this.contractDetailsRepo.save(contractDetail);
    } catch (err) {
      throw new BadRequestException(err);
    }
  
  }
  // <-----EditcontractDetails----->

  async updateContractDetails(id: number, attrs: Partial<ContractDetailEntity>) {

    const contractDetail = await this.findOneContractsDetails(id);

    if (!contractDetail) {

      throw new NotFoundException('contractDetail not found');

    }

    Object.assign(contractDetail, attrs);

    return this.contractDetailsRepo.save(contractDetail);

  }




  // <-----FINDONECONTRCATDETAIL---->
  async findOneContractsDetails(id: number) {

    return await this.contractDetailsRepo.findOne({
      where: { ContractDetailsId: id }
    });

  }

  // <-------------FINDALLDETAILS------------------->



  async findAllContractsDetails() {

    const contractsDetailsQuery = await this.contractDetailDataSource.createQueryRunner();
    await contractsDetailsQuery.connect();
    try {
      await contractsDetailsQuery.startTransaction();
      const contractsDetail = await contractsDetailsQuery.query(
        `
          SELECT [ContractDetailsId]
          ,[ContractDetailNo]
                ,[ContractId]
                ,[status]
                ,[BookingType]
                ,[vehicleType]
                ,[Transmission]
                ,[NoOfVehicles]
                ,[ServiceFromDate]
                ,[ServiceToDate]
                ,[ChargeType]
                ,[ChargeAmount]
                ,[ChargeCurr]
                
                ,[frequency]





                FROM [dbo].[_cplContractDetails] order by ContractDetailsId desc `,


      );
      await contractsDetailsQuery.commitTransaction();
      return contractsDetail;
    }
    catch (e) {
      throw new Error(`Failed to find any contractsDetail: ${e.message}`);
    }
  }
// <--------------getcurrency--->
async getCurrency(id:number){

  const currencyQuery = await this.contractDetailDataSource.createQueryRunner();
  await currencyQuery.connect();
  try{
    await currencyQuery.startTransaction();
    const currencyDetails = await currencyQuery.query(
      `SELECT companyName,
      case when c.iCurrencyID = 0 then 'KES'
      else b.CurrencyCode end as currencyCode
      FROM _cplContracts cpl
      JOIN Client c ON c.account = cpl.companyCode
      left Join currency b on c.iCurrencyID = b. CurrencyLink
      where ContractId =${id}`
    )

    await currencyQuery.commitTransaction();
    console.log(currencyDetails[0])
    return currencyDetails[0];
  }
  catch(e){
    throw new Error(`Failed to find any currency: ${e.message}`);

  }
}

async getChargeType(id:number){
const chargeQuery = await this.contractDetailDataSource.createQueryRunner();
await chargeQuery.connect();
try{
  await chargeQuery.startTransaction();
  const chargeDetails = await chargeQuery.query(
    `select  code,Description_1,Description_2 from StkItem where ServiceItem=1 and ItemActive = 1
    `
  )
  await chargeQuery.commitTransaction();
  if (chargeDetails && chargeDetails.length > 0) {
    return chargeDetails;
  } else {
    throw new Error(`chargeType with id ${id} not found`);

    
  }
  
}

catch(e){
  throw new Error(`Failed to find any chargeType: ${e.message}`);

}
}

async findAllCharges(){
  const chargeQuery = await this.contractDetailDataSource.createQueryRunner();
await chargeQuery.connect();
try{
  await chargeQuery.startTransaction();
  const chargeDetails = await chargeQuery.query(
    `select  code,Description_1,Description_2 from StkItem where ServiceItem=1 and ItemActive = 1
    `
  )
  await chargeQuery.commitTransaction();
  if (chargeDetails && chargeDetails.length > 0) {
    return chargeDetails;
  } else {
    throw new Error(`chargeTypeS not found`);

    
  }
  
}
catch(e){
  throw new Error(`Failed to find ALL chargeType: ${e.message}`);

}
}





async findCurr() {
  const currencyQuery = this.contractDetailDataSource.createQueryRunner();
  await currencyQuery.connect();

  try {
    await currencyQuery.startTransaction();
    const currencyDetails = await currencyQuery.query(`
      SELECT
        y.companyName,
        CASE
          WHEN a.iCurrencyID = 0 THEN 'KES'
          ELSE b.CurrencyCode
        END AS currcode,
        a.*
      FROM
        _cplContractDetails z
      JOIN _cplContracts y ON z.ContractId = y.ContractId
      JOIN Client a ON y.companyName = a.Name
      LEFT JOIN currency b ON a.iCurrencyID = b.CurrencyLink
    `);

    await currencyQuery.commitTransaction();
    return currencyDetails;
  } catch (e) {
    await currencyQuery.rollbackTransaction();
    throw new Error(`Failed to find any currency: ${e.message}`);
  } finally {
    await currencyQuery.release();
  }
}

  findAll() {
    return `This action returns all contractDetails`;
  }

  findOneContract(id: number) {
    return this.contractDetailsRepo.findOne({ where: { ContractDetailsId: id } });
  }


  async findRelatedContractDetails(id: number) {
    // return this.contractDetailsRepo.find({ where: { ContractId: id } });


    const contractsDetailsQuery = await this.contractDetailDataSource.createQueryRunner();
    await contractsDetailsQuery.connect();
    try {
      await contractsDetailsQuery.startTransaction();
      const contractsDetail = await contractsDetailsQuery.query(
        `
        select x.* from _cplContractDetails x join  _cplcontracts  y on x.ContractId=y.ContractId where x.ContractId =@0  order by ContractId desc `, [id]


      );
      await contractsDetailsQuery.commitTransaction();
      return contractsDetail;
    }
    catch (e) {
      throw new Error(`Failed to find any contracts: ${e.message}`);
    }

  }

  update(id: number, updateContractDetailDto: UpdateContractDetailDto) {
    return `This action updates a #${id} contractDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} contractDetail`;
  }
}
