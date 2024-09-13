"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(UserDataSource) {
        this.UserDataSource = UserDataSource;
    }
    async addUser(addUserDto) {
        const queryRunner = this.UserDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(addUserDto.password, saltRounds);
            const user = queryRunner.manager.create(user_entity_1.User, {
                ...addUserDto,
                password: hashedPassword,
            });
            const results = await queryRunner.manager.save(user_entity_1.User, user);
            await queryRunner.commitTransaction();
            return {
                username: results.username,
            };
        }
        catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException(err.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findByUsername(username) {
        const queryRunner = this.UserDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await queryRunner.manager.findOne(user_entity_1.User, {
                where: { username: username }
            });
            await queryRunner.commitTransaction();
            return user;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            return null;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UsersService);
//# sourceMappingURL=users.service.js.map