import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateContractDto } from '../dto/create-contract.dto';
import { UpdateContractDto } from '../dto/update-contract.dto';
import { ContractEntity } from 'src/entities/contract.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { SearchContractsDto } from 'src/dto/SearchContracts.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from } from 'rxjs';


@Injectable()
export class ContractsService {

  constructor(
    @InjectRepository(ContractEntity)
    private contractsRepo: Repository<ContractEntity>,

    private readonly contractEntity: EntityManager,

    private readonly contractDataSource: DataSource,

  ) {

  }

  // <//create a contract>
  async createContract(createContractDto: CreateContractDto) {
    const contract = new ContractEntity(createContractDto);
    try {

      return await this.contractEntity.save(contract);

    } catch (err) {

      throw new BadRequestException(err);
    }


  }
  // <///edit contract>

  async updateContract(id: number, attrs: Partial<ContractEntity>) {

    const contract = await this.findContracts(id);

    if (!contract) {

      throw new NotFoundException('contract not found');

    }

    Object.assign(contract, attrs);

    return this.contractsRepo.save(contract);

  }

  // <--------fetchcontracts->
  async findContracts(id: number) {

    return await this.contractsRepo.findOne({
      where: { ContractId: id }
    });

  }
  async fetchContracts() {

    return await this.contractsRepo.find({

    });

  }
  findDemandContracts

  // <--FINDALLCONTRCATS->
  async findAllContracts() {

    const contractsQuery = await this.contractDataSource.createQueryRunner();
    await contractsQuery.connect();
    try {
      await contractsQuery.startTransaction();
      const contracts = await contractsQuery.query(
        `
         SELECT a.ContractId,
                  ContractNo
                  ,companyName
                  ,CompanyCode
                  ,a.status
                  ,StartDate
                  ,EndDate
                  ,BillingDay
				  ,frequency
                    FROM _cplContracts a left join _cplContractDetails b on a.ContractId = b.ContractId where b.frequency ='onDemand' 


                  `,


      );
      await contractsQuery.commitTransaction();
      return contracts;
    }
    catch (e) {
      throw new Error(`Failed to find any contracts: ${e.message}`);
    }
  }

  // <///////////searchContracts//////>


  async searchContracts(searchContractsDto: SearchContractsDto): Promise<ContractEntity[]> {
    const query = this.contractsRepo.createQueryBuilder('contract')
    const { StartDate, EndDate, ...otherParams } = searchContractsDto;
    Object.keys(otherParams).forEach(key => {
      const value = SearchContractsDto[key]
      if (value) {
        query.andWhere(`contract.${key} = :${key}`, { [key]: value });
      }
    })
    if (StartDate && EndDate) {
      query.andWhere('contract.StartDate BETWEEN :StartDate AND :EndDate', { StartDate, EndDate });
    } else if (StartDate) {
      query.andWhere('contract.StartDate >= :StartDate', { StartDate });
    } else if (EndDate) {
      query.andWhere('contract.EndDate <= :EndDate', { EndDate });
    }

    try {
      return await query.getMany();
    } catch (error) {
      throw new BadRequestException(`Failed to find any results: ${error.message}`);
    }

  }



  findContract(id: number) {
    return this.contractsRepo.findOne({ where: { ContractId: id } });
  }
  findOneContract(id: number) {
    return this.contractsRepo.findOne({ where: { ContractId: id } });
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
