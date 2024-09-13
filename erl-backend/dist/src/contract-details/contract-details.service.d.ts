import { CreateContractDetailDto } from '../dto/create-contract-detail.dto';
import { UpdateContractDetailDto } from '../dto/update-contract-detail.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ContractDetailEntity } from 'src/entities/contract-detail.entity';
export declare class ContractDetailsService {
    private contractDetailsRepo;
    private readonly ContractDetailEntity;
    private readonly contractDetailDataSource;
    constructor(contractDetailsRepo: Repository<ContractDetailEntity>, ContractDetailEntity: EntityManager, contractDetailDataSource: DataSource);
    createContractDetails(createContractDetailDto: CreateContractDetailDto): Promise<ContractDetailEntity>;
    updateContractDetails(id: number, attrs: Partial<ContractDetailEntity>): Promise<ContractDetailEntity>;
    findOneContractsDetails(id: number): Promise<ContractDetailEntity>;
    findAllContractsDetails(): Promise<any>;
    getCurrency(id: number): Promise<any>;
    getChargeType(id: number): Promise<any>;
    findAllCharges(): Promise<any>;
    findCurr(): Promise<any>;
    findAll(): string;
    findOneContract(id: number): Promise<ContractDetailEntity>;
    findRelatedContractDetails(id: number): Promise<any>;
    update(id: number, updateContractDetailDto: UpdateContractDetailDto): string;
    remove(id: number): string;
}
