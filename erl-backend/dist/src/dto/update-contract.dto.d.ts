import { CreateContractDto } from './create-contract.dto';
declare const UpdateContractDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateContractDto>>;
export declare class UpdateContractDto extends UpdateContractDto_base {
    ContractId: number;
    ContractNo: string;
    companyName: string;
    CompanyCode: string;
    status: string;
    StartDate: string;
    EndDate: string;
    BillingDay: string;
}
export {};
