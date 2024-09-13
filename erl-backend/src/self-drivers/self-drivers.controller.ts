import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { SelfDriversService } from './self-drivers.service';
import { AddSelfDriversDto } from '../dto/add-selfDrivers.dto';
import { UpdateSelfDriversDto } from '../dto/update-selfDrivers.dto';

@Controller('self-drivers')
export class SelfDriversController {
  constructor(private selfDriversService: SelfDriversService) {}

  @Get('/:id')
  fetchSelfDriver(@Param('id') id: string) {
    return this.selfDriversService.findSelfDriver(parseInt(id));
  }

  @Get('related/:id')
  fetchRelatedSelfDriver(@Param('id') id: string) {
    return this.selfDriversService.findRelatedSelfDrivers(parseInt(id));
  }

  @Get()
  fetchAllSelfDrivers() {
    return this.selfDriversService.findAllSelfDrivers();
  }

  @Post('/create')
  addNewSelfDriver(@Body(ValidationPipe) body: AddSelfDriversDto) {
    return this.selfDriversService.createSelfDriver(body);
  }

  @Patch('update/:id')
  updateSelfDriver(
    @Param('id') id: string,
    @Body() body: UpdateSelfDriversDto,
  ) {
    return this.selfDriversService.updateSelfDriver(parseInt(id), body);
  }
}
