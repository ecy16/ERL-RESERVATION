"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfigAsync = void 0;
const config_1 = require("@nestjs/config");
class TypeormConfig {
    static getOrmConfigs(configService) {
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
                trustServerCertificate: Boolean(configService.get('TRUSTSERVER_CERTIFCATE')),
            },
        };
    }
}
exports.default = TypeormConfig;
exports.typeOrmConfigAsync = {
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => TypeormConfig.getOrmConfigs(configService),
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=typeorm.config.js.map