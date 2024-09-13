import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ChaufferDriversService } from './chauffer-drivers.service';
import { CreateChaufferDriverDto } from './dto/create-chauffer-driver.dto';
import { UpdateChaufferDriverDto } from './dto/update-chauffer-driver.dto';
import { AddDriversDto } from 'src/dto/add-drivers.dto';

@Controller('chauffer-drivers')
export class ChaufferDriversController {
  constructor(private readonly chaufferDriversService: ChaufferDriversService) { }

  @Get()
  getAllChauffers() {
    return this.chaufferDriversService.fetchAllChauffers();
  }
  @Post('/create')
  addChaufferDriver(@Body(ValidationPipe) body: AddDriversDto) {
    return this.chaufferDriversService.addChauffer(body);
  }

@Get('chauffers/:DriverFirstName')
getDriver(@Param('DriverFirstName') DriverFirstName:string){
  return this.chaufferDriversService.fetchChaufferById(DriverFirstName)
}



  @Get('/:id')
  getChaufferDrivers(@Param('id') id: string) {
    return this.chaufferDriversService.getChaufferDrivers(parseInt(id));
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chaufferDriversService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChaufferDriverDto: UpdateChaufferDriverDto) {
    return this.chaufferDriversService.update(+id, updateChaufferDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chaufferDriversService.remove(+id);
  }
  @Post('search/chauffer')
  searchChauffer(@Body() Body:any) {
      return this.chaufferDriversService.searchView(Body)
  }
}
