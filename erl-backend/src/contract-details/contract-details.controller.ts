import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ContractDetailsService } from './contract-details.service';
import { CreateContractDetailDto } from '../dto/create-contract-detail.dto';
import { UpdateContractDetailDto } from '../dto/update-contract-detail.dto';

@Controller('contract-details')
export class ContractDetailsController {
  constructor(private readonly contractDetailsService: ContractDetailsService) { }

  @Post('/create')
  addContractDetail(@Body(ValidationPipe) body: CreateContractDetailDto) {
    return this.contractDetailsService.createContractDetails(body);
  }

  @Get()
  findAll() {
    return this.contractDetailsService.findAllContractsDetails();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.contractDetailsService.findOne(+id);
  // }
  @Get('related/:id')
  getOneContractDetailsById(@Param('id') id: string) {
    return this.contractDetailsService.findOneContractsDetails(parseInt(id));
  }
  @Get('curr/:id')
  getCharges(@Param('id') id: string) {
    return this.contractDetailsService.getCurrency(parseInt(id));
  }
  @Get('chargeType/:id')
  getChargeType(@Param('id') id: string) {
    return this.contractDetailsService.getChargeType(parseInt(id));
  }


  @Get('chargeType')
  findAllChargeTypes() {
    return this.contractDetailsService.findAllCharges();
  }

  @Get('curr')
  findAllCharge() {
    return this.contractDetailsService.findCurr();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractDetailDto: UpdateContractDetailDto) {
    return this.contractDetailsService.updateContractDetails(+id, updateContractDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractDetailsService.remove(+id);
  }


  @Post('related/:id')
  getRelatedContracts(@Param('id') id: string) {
    return this.contractDetailsService.findRelatedContractDetails(parseInt(id));
  }
}
