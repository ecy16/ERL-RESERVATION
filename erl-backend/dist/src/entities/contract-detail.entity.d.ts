export declare class ContractDetailEntity {
    ContractDetailsId: number;
    ContractId: number;
    ContractDetailNo: number;
    status: string;
    BookingType: string;
    vehicleType: string;
    Transmission: string;
    NoOfVehicles: string;
    ServiceFromDate: string;
    ServiceToDate: string;
    ChargeType: string;
    ChargeAmount: string;
    ChargeCurr: string;
    frequency: string;
    interval: string;
    constructor(contractDetail: Partial<ContractDetailEntity>);
}
