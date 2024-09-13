import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { AddUserDto } from "src/dto/add-user.dto";
import { User } from "src/entities/user.entity";
import * as bcrypt from 'bcryptjs';
// import { UserRoles } from "src/user.roles";
import { Role } from "src/role.enum";
import { use } from "passport";


@Injectable()
export class UsersService {
    constructor(
        private UserDataSource: DataSource,
    ) { }


    async addUser(addUserDto: AddUserDto) {
        const queryRunner = this.UserDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(addUserDto.password, saltRounds);
    
            const user = queryRunner.manager.create(User, {
                ...addUserDto,
                password: hashedPassword,
            });
            const results = await queryRunner.manager.save(User, user);
            await queryRunner.commitTransaction();
            return {
                username: results.username,
            };
        } catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
            throw new BadRequestException(err.message);
        } finally {
            await queryRunner.release();
        }




    }



 







        async findByUsername(username: string): Promise<User | null> {
            const queryRunner = this.UserDataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            try {
                const user = await queryRunner.manager.findOne(User, {
                    where: { username: username }
                });
                await queryRunner.commitTransaction();
                return user;

            } catch (err) {
                await queryRunner.rollbackTransaction();
                return null;
            } finally {
                await queryRunner.release();
            }
        }

    


}





































