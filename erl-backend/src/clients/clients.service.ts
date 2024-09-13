import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ClientsService {
    constructor(private dataSource: DataSource) {}
    async fetchAllClients() {
        const allClientQuery = await this.dataSource.createQueryRunner();
        await allClientQuery.connect();
        try {
            await allClientQuery.startTransaction();
            const allClients = await allClientQuery.manager.query(
                `select Account,Name,Account+'-'+Name+'-'+ (case when On_Hold = 1 then 'OnHold' else '' end) as Client_Info from client order by Name asc`,
            );
            await allClientQuery.commitTransaction();
            return allClients;
        } catch (e) {
            throw new Error(e);
        }
    }

    async fetchOneClient1(custcode: string) {
        const clientQuery = await this.dataSource.createQueryRunner();
        await clientQuery.connect();
        try {
            await clientQuery.startTransaction();
            const client = await clientQuery.manager.query(
                `select * from Client where Account =@0 order by Name asc`,
                [custcode],
            );
            await clientQuery.commitTransaction();
            return client;
        } catch (e) {
            throw new Error(e);
        }
    }
    async fetchOneClient2(custname: string) {
        const clientQuery = await this.dataSource.createQueryRunner();
        await clientQuery.connect();
        try {
            await clientQuery.startTransaction();
            const client = await clientQuery.manager.query(
                `select * from Client where Name =@0 order by Name asc`,
                [custname],
            );
            await clientQuery.commitTransaction();
            return client;
        } catch (e) {
            throw new Error(e);
        }
    }
}
