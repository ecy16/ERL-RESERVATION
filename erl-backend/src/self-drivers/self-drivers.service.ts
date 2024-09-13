import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { SelfDriversEntity } from '../entities/selfDrivers.entity';
import { AddSelfDriversDto } from '../dto/add-selfDrivers.dto';

@Injectable()
export class SelfDriversService {
    constructor(
        @InjectRepository(SelfDriversEntity)
        private selfDriversRepo: Repository<SelfDriversEntity>,
        private readonly selfDriversEntity: EntityManager,
        private readonly selfDriversDataSource: DataSource,
    ) { }

    async createSelfDriver(addSelfDriversDto: AddSelfDriversDto) {
        const selfDriver = new SelfDriversEntity(addSelfDriversDto);
        try {
            return await this.selfDriversEntity.save(selfDriver);
        } catch (err) {
            throw new Error(`Failed something happened: ${err.message}`);
        }
    }
    async findAllSelfDrivers() {
        try {
            return await this.selfDriversRepo.find();
        } catch (err) {
            console.log(err);
            throw new BadRequestException(err);
        }
    }

    // async findRelatedSelfDrivers(BookingDriverId: number) {
    //   const selfDriver = this.selfDriversDataSource.createQueryRunner();
    //   await selfDriver.connect();
    //   try {
    //     await selfDriver.startTransaction();
    //     const tripInfo = await selfDriver.query(
    //       `select  * from _cplSelfDrivers where ReservationId=@0`,
    //       [BookingDriverId],
    //     );
    //     await selfDriver.commitTransaction();
    //     return tripInfo;
    //   } catch (e) {
    //     throw new Error(`Failed to find trips: ${e.message}`);
    //   }
    // }

    findRelatedSelfDrivers(id: number) {
        return this.selfDriversRepo.find({ where: { ReservationId: id } });
    }

    findSelfDriver(id: number) {
        return this.selfDriversRepo.findOne({ where: { BookingDriverId: id } });
    }

    async updateSelfDriver(id: number, attrs: Partial<SelfDriversEntity>) {
        try {
            const selfDriver = await this.findSelfDriver(id);
            if (!selfDriver) {
                throw new NotFoundException('Driver not found');
            }
            Object.assign(selfDriver, attrs);
            return this.selfDriversRepo.save(selfDriver);
        } catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }


    async uploadFile(file:Express.Multer.File):Promise<string>{
        const filePath =`uploads/${file.filename}`;
        return filePath
    }

    
}
