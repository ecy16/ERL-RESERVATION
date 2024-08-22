import { PartialType } from '@nestjs/mapped-types';
import { CreateChaufferDriverDto } from './create-chauffer-driver.dto';

export class UpdateChaufferDriverDto extends PartialType(CreateChaufferDriverDto) {}
