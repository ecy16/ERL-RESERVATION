import { DataSource } from 'typeorm';
export declare class ClientsService {
    private dataSource;
    constructor(dataSource: DataSource);
    fetchAllClients(): Promise<any>;
    fetchOneClient1(custcode: string): Promise<any>;
    fetchOneClient2(custname: string): Promise<any>;
}
