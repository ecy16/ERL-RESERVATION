import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default class TypeormConfig {
    static getOrmConfigs(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'mssql',
            host: String(configService.get('DATABASE_HOST')),
            port: Number(configService.get('DATABASE_PORT')),
            username: configService.get('DATABASE_USER'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            autoLoadEntities: Boolean(configService.get('AUTOLOAD_ENTITIES')),
            synchronize: Boolean(configService.get('SYNCHRONIZE')),
            
            extra: {
                trustServerCertificate: Boolean(
                    configService.get('TRUSTSERVER_CERTIFCATE'),
                ),
            },
        };
    }
}
export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (
        configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> =>
        TypeormConfig.getOrmConfigs(configService),
    inject: [ConfigService],
};
