// import { UserRoles } from 'nest-access-control';
import { Entity, Column, PrimaryGeneratedColumn, Unique, Index } from 'typeorm';

@Entity('_cplUsers')
// @Index(['DriverFirstName', 'DriverLastName'], { unique: true })
// @Unique(['FullName'])
// @Unique(['username'])
export class User {
    @PrimaryGeneratedColumn()
    UserID: number;
    @Column({ nullable: true })
    FullName: string;
    @Column({ nullable: true })
    username: string;
    @Column({ nullable: true })
    EmailAddress: string;
    @Column({ nullable: true })
    password: string;
    @Column({ nullable: true })
    UserStatus: string;
    @Column({ nullable: true })
    Department: string;
    @Column({ nullable: true })
    // Roles: string;
    // @Column({ nullable: true })
    CreatedBy: string;
    @Column({ nullable: true })
    CreatedOn: string;
    @Column({ nullable: true })
    ModifiedBy: string;
    @Column({ nullable: true })
    ModifiedOn: string;
    @Column({nullable: true })
    roles: string ;  
  
 

    constructor(users: Partial<User>) {
        Object.assign(this, users);
    }
}
