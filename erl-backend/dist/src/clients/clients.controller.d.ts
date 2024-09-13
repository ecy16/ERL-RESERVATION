import { ClientsService } from './clients.service';
export declare class ClientsController {
    private clientService;
    constructor(clientService: ClientsService);
    fetchCustomers(): Promise<any>;
    fetchCustomerName(custcode: string): Promise<any>;
    fetchCustomerCode(custname: string): Promise<any>;
}
