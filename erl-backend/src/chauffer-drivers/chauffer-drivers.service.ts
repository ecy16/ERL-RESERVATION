import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChaufferDriverDto } from './dto/create-chauffer-driver.dto';
import { UpdateChaufferDriverDto } from './dto/update-chauffer-driver.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChaufferDriverEntity } from 'src/entities/chauffer-driver.entity';
import { AddDriversDto } from 'src/dto/add-drivers.dto';
import { SearchDriversDto } from 'src/dto/searchDrivers.dto';
import { Observable, from } from 'rxjs';
import { ChaufDriveDocs } from 'src/entities/chauffer-docs.entity';

@Injectable()
export class ChaufferDriversService {

constructor(
  @InjectRepository(ChaufferDriverEntity)
  private chaufferRepo:Repository<ChaufferDriverEntity>,
  private readonly chaufferDriversDataSource:DataSource,
){

}

async fetchAllChauffers(){
  return await this.chaufferRepo.find()
}

  create(createChaufferDriverDto: CreateChaufferDriverDto) {
    return 'This action adds a new chaufferDriver';
  }

  async getChaufferDrivers(id: number) {
    const chaufferDrivers = this.chaufferDriversDataSource.createQueryRunner();
    await chaufferDrivers.connect();
    try {
        await chaufferDrivers.startTransaction();
        const chaufferDriversInfo = await chaufferDrivers.query(
            `select  *from _cplChaufferDrivers where DriverFirstName=@Adam`,
            
        );
        await chaufferDrivers.commitTransaction();
        return chaufferDriversInfo;
    } catch (e) {
        throw new Error(`Failed to find trips: ${e.message}`);  }
    }


  
  async addChauffer(addDriversDto:AddDriversDto){
    const Chauffer = new ChaufferDriverEntity(addDriversDto);

    try{
      return await this.chaufferRepo.save(Chauffer);
    }catch(err){
      throw new BadRequestException(err)
    }
  }



async fetchChaufferById(DriverFirstName){
  const chauffer = this.chaufferDriversDataSource.createQueryRunner();
  await chauffer.connect();
  try{
    await chauffer.startTransaction();
    const chaufferInfo=await chauffer.query(
      `select  *from _cplChaufferDrivers where DriverFirstName=@0`,
[DriverFirstName]
    );
    await chauffer.commitTransaction();
    return chaufferInfo;
  }catch(m){
    throw new Error(`Failed to find Chauffers:${m.message}`)
  }
}

searchView(searchDriversDto: SearchDriversDto): Observable<ChaufferDriverEntity[]> {
  const query = this.chaufferRepo.createQueryBuilder('chauffers');
  const { ...otherParams } = searchDriversDto;

  Object.keys(otherParams).forEach(key => {
    const value = otherParams[key];
    if (value) {
      query.andWhere(`chauffers.${key} = :${key}`, { [key]: value });
    }
  });

  return from(query.getMany());
}







  

  findOne(id: number) {
    return `This action returns a #${id} chaufferDriver`;
  }
  
  update(id: number, updateChaufferDriverDto: UpdateChaufferDriverDto) {
    return `This action updates a #${id} chaufferDriver`;
  }

  remove(id: number) {
    return `This action removes a #${id} chaufferDriver`;
  };
}
