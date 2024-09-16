import { ContractsService } from './contracts.service';
import { CreateContractDto } from '../dto/create-contract.dto';
import { UpdateContractDto } from '../dto/update-contract.dto';
export declare class ContractsController {
    private readonly contractsService;
    constructor(contractsService: ContractsService);
    addContract(body: CreateContractDto): Promise<import("src/entities/contract.entity").ContractEntity>;
    findContracts(): Promise<import("src/entities/contract.entity").ContractEntity[]>;
    findDemandContracts(): Promise<any>;
    fetchContract(id: string): Promise<import("src/entities/contract.entity").ContractEntity>;
    getContractById(id: string): Promise<import("src/entities/contract.entity").ContractEntity>;
    getOneContractById(id: string): Promise<import("src/entities/contract.entity").ContractEntity>;
    searchContractsValue(Body: any): Promise<import("src/entities/contract.entity").ContractEntity[]>;
    updateContract(id: string, body: UpdateContractDto): Promise<import("src/entities/contract.entity").ContractEntity>;
    remove(id: string): string;
}
