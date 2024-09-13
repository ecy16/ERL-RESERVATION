import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from '../dto/create-contract.dto';
import { UpdateContractDto } from '../dto/update-contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  // @Post()
  // create(@Body() createContractDto: CreateContractDto) {
  //   return this.contractsService.create(createContractDto);
  // }

  @Post('/create')
  addContract(@Body(ValidationPipe) body: CreateContractDto) {
      return this.contractsService.createContract(body);
  }


  @Get()
  findContracts() {
    return this.contractsService.fetchContracts();
  }
  @Get('/demand')
  findDemandContracts() {
    return this.contractsService.findAllContracts();
  }
  
  @Get('/:id')
  fetchContract(@Param('id') id: string) {
    return this.contractsService.findContract(parseInt(id));
  }
  @Get('/:id')
  getContractById(@Param('id') id: string) {
    return this.contractsService.findContract(parseInt(id));
  }
  @Get('/:id')
  getOneContractById(@Param('id') id: string) {
    return this.contractsService.findOneContract(parseInt(id));
  }


  @Post('search')
  searchContractsValue(@Body() Body:any) {
      return this.contractsService.searchContracts(Body)
  }
  
  @Patch('/:id')
  updateContract(
      @Param('id') id: string,
      @Body() body: UpdateContractDto,
  ) {
      return this.contractsService.updateContract(parseInt(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.remove(+id);
  }
}
