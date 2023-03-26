import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Favorite } from './entities/favorite.entity';
import { Metadata } from 'src/apis/entities/metadata.entity';
import { Api } from 'src/apis/entities/api.entity';
import { Domain } from 'src/apis/entities/domain.entity';
import { Category } from 'src/apis/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Metadata, Api, Domain, Category])],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
  ],
})
export class FavoritesModule {}
