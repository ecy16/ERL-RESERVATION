import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
export declare class BillingController {
    private readonly billingService;
    constructor(billingService: BillingService);
    create(createBillingDto: CreateBillingDto): string;
    fetchAllBills(): Promise<any>;
    findBill(id: string): Promise<any>;
    fetchBillDetails(id: number): Promise<any>;
    fetchBillDetailsTrips(id: string): Promise<void>;
    findOne(id: string): string;
    update(id: string, updateBillingDto: UpdateBillingDto): string;
    remove(id: string): string;
}
