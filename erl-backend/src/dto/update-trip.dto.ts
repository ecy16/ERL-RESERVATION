import { PartialType } from '@nestjs/swagger';
import { AddTripDto } from './add-trip.dto';


export class UpdateTripDto extends PartialType(AddTripDto) { }