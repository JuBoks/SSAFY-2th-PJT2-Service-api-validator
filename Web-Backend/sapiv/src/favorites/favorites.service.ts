import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { CustomRequest } from 'src/common/custromrequest';
import { DataSource, Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    private dataSource: DataSource
  ){}

  async findAll(req:CustomRequest): Promise<Favorite[]>{
    return await this.favoriteRepository.findBy({
      uid: req.user.uid
    });
  }

  async create(createFavoriteDto: CreateFavoriteDto, req:CustomRequest) {
    const uid = req.user.uid;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try{
      for (const id of createFavoriteDto.apis){
        const favorite = {
          uid: uid,
          meta_id: id,
        }
        await queryRunner.manager.save(favorite);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        err.message,
        HttpStatus.NOT_ACCEPTABLE,
      )
    } finally{
      await queryRunner.release();
    }
    return "success";
  }

  
  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
