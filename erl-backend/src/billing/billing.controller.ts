import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
// import { roles } from 'src/user.roles';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/role.enum';
import { RolesAuthGuard } from 'src/auth/guards/rolesAuth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ValidationTypes } from 'class-validator';

@Controller('billing')

export class BillingController {
  constructor(private readonly billingService: BillingService) {}





  @Post()
  create(@Body() createBillingDto: CreateBillingDto) {
    return this.billingService.create(createBillingDto);
  }
   @Get()
  // @UsePipes(ValidationPipe)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  fetchAllBills() {

    return this.billingService.findAllBillings();
  }
  
  @Get('/:id')
  findBill(@Param('id') id: string) {
      return this.billingService.FindBillDetailsById(parseInt(id));
  }

  
  @Post('one/:id')
  fetchBillDetails(@Param('id') id:number) {
      return this.billingService.FindBillDetailsById(id);
  }

  @Post('bill/:id')
  fetchBillDetailsTrips(@Param('id') id:string) {
      return this.billingService.FetchBillDetailsById(parseInt(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillingDto: UpdateBillingDto) {
    return this.billingService.update(+id, updateBillingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billingService.remove(+id);
  }
  
}
