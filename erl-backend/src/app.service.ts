import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    root(userRoles: any) {
        throw new Error('Method not implemented.');
    }
    getHello(): string {
        return 'Hello World!';
    }
}
