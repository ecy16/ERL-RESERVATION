import { Controller, Get, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
    constructor(private clientService: ClientsService) {}

    @Get('')
    fetchCustomers() {
        return this.clientService.fetchAllClients();
    }
    @Get('name/:custcode')
    fetchCustomerName(@Param('custcode') custcode: string) {
        return this.clientService.fetchOneClient1(custcode);
    }
    @Get('code/:custname')
    fetchCustomerCode(@Param('custname') custname: string) {
        return this.clientService.fetchOneClient2(custname);
    }
}
