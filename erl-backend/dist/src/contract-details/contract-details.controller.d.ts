import { ContractDetailsService } from './contract-details.service';
import { CreateContractDetailDto } from '../dto/create-contract-detail.dto';
import { UpdateContractDetailDto } from '../dto/update-contract-detail.dto';
export declare class ContractDetailsController {
    private readonly contractDetailsService;
    constructor(contractDetailsService: ContractDetailsService);
    addContractDetail(body: CreateContractDetailDto): Promise<import("src/entities/contract-detail.entity").ContractDetailEntity>;
    findAll(): Promise<any>;
    getOneContractDetailsById(id: string): Promise<import("src/entities/contract-detail.entity").ContractDetailEntity>;
    getCharges(id: string): Promise<any>;
    getChargeType(id: string): Promise<any>;
    findAllChargeTypes(): Promise<any>;
    findAllCharge(): Promise<any>;
    update(id: string, updateContractDetailDto: UpdateContractDetailDto): Promise<import("src/entities/contract-detail.entity").ContractDetailEntity>;
    remove(id: string): string;
    getRelatedContracts(id: string): Promise<any>;
}
