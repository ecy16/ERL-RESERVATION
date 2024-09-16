export declare class ContractEntity {
    ContractId: number;
    ContractNo: string;
    companyName: string;
    CompanyCode: string;
    status: string;
    StartDate: string;
    EndDate: string;
    BillingDay: string;
    constructor(contracts: Partial<ContractEntity>);
}
