import { CreateContractDto } from '../dto/create-contract.dto';
import { UpdateContractDto } from '../dto/update-contract.dto';
import { ContractEntity } from 'src/entities/contract.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { SearchContractsDto } from 'src/dto/SearchContracts.dto';
export declare class ContractsService {
    private contractsRepo;
    private readonly contractEntity;
    private readonly contractDataSource;
    constructor(contractsRepo: Repository<ContractEntity>, contractEntity: EntityManager, contractDataSource: DataSource);
    createContract(createContractDto: CreateContractDto): Promise<ContractEntity>;
    updateContract(id: number, attrs: Partial<ContractEntity>): Promise<ContractEntity>;
    findContracts(id: number): Promise<ContractEntity>;
    fetchContracts(): Promise<ContractEntity[]>;
    findDemandContracts: any;
    findAllContracts(): Promise<any>;
    searchContracts(searchContractsDto: SearchContractsDto): Promise<ContractEntity[]>;
    findContract(id: number): Promise<ContractEntity>;
    findOneContract(id: number): Promise<ContractEntity>;
    update(id: number, updateContractDto: UpdateContractDto): string;
    remove(id: number): string;
}
