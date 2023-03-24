import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Api } from 'src/apis/entities/api.entity';
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

  async findAll(req:CustomRequest): Promise<Api[]>{
     return await this.dataSource
    .getRepository(Api)
    .createQueryBuilder("apis")
    .leftJoinAndSelect(Favorite, "photo", "photo.userId = user.id")
    .where((qb) => {
        const subQuery = qb
            .subQuery()
            .select("meta_id")
            .from(Favorite, "favorites")
            .where("favorites.user_id = :uid")
            .getQuery()
        return "apis.id IN " + subQuery
    })
    .setParameter("uid", req.user.uid)
    .getMany();
    
  }

  async create(createFavoriteDto: CreateFavoriteDto, req:CustomRequest) {
    const uid = req.user.uid;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try{
      for (const id of createFavoriteDto.apis){
        const favorite = new Favorite();
        favorite.user_id = uid;
        favorite.meta_id = id;
        
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

  async remove(id: number, req:CustomRequest) {
    return await this.dataSource
    .getRepository(Favorite)
    .createQueryBuilder('favorites')
    .delete()
    .from(Favorite)
    .where("user_id = :uid", { uid: req.user.uid })
    .andWhere("meta_id = :id", { id: id})
    .execute()
  }
}
