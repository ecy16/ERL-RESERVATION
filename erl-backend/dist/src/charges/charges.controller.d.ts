import { ChargesService } from './charges.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
export declare class ChargesController {
    private readonly chargesService;
    constructor(chargesService: ChargesService);
    create(createChargeDto: CreateChargeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateChargeDto: UpdateChargeDto): string;
    remove(id: string): string;
}
