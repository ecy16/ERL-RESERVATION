import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { BillingEntity } from 'src/entities/billing.entity';
export declare class BillingService {
    private billingRepo;
    private readonly BillingEntity;
    private readonly BillingDataSource;
    constructor(billingRepo: Repository<BillingEntity>, BillingEntity: EntityManager, BillingDataSource: DataSource);
    create(createBillingDto: CreateBillingDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBillingDto: UpdateBillingDto): string;
    remove(id: number): string;
    findAllBillings(): Promise<any>;
    FindBillDetailsById(reservationId: number): Promise<any>;
    FetchBillDetailsById(reservationId: number): Promise<void>;
}
