import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Api } from 'src/apis/entities/api.entity';
import { Category } from 'src/apis/entities/category.entity';
import { Domain } from 'src/apis/entities/domain.entity';
import { Metadata } from 'src/apis/entities/metadata.entity';
import { TestCase } from 'src/apis/entities/testcase.entity';
import { CustomRequest } from 'src/common/custromrequest';
import { DataSource } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private dataSource: DataSource
  ){}

  async findAll(req:CustomRequest): Promise<TestCase[]>{
     return await this.dataSource
    .createQueryBuilder()
    .from(Metadata, "metadata")
    .leftJoinAndSelect(Api, "api", "api.api_id = metadata.api_id")
    .leftJoinAndSelect(Domain, "domain", "domain.domain_id = api.domain_id")
    .leftJoinAndSelect(Category, "category", "category.category_id = domain.category_id")
    .where((qb) => {
        const subQuery = qb
            .subQuery()
            .select("meta_id")
            .from(Favorite, "favorites")
            .where("favorites.user_id = :uid")
            .getQuery()
        return "metadata.meta_id IN " + subQuery
    })
    .andWhere("metadata.state = 0")
    .setParameter("uid", req.user.uid)
    .select(["metadata.meta_id",
    "category.name",
    "domain.domain", 
    "api.resources",
    "api.method",
    "metadata.header",
    "metadata.params",
    "metadata.body",
    "metadata.name", 
    "metadata.cycle_time",
    "metadata.last_req_time"])
    .getRawMany();
    
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
