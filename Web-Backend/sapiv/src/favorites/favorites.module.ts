import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Favorite } from './entities/favorite.entity';
import { Api } from 'src/apis/entities/api.entity';
import { TestResult } from 'src/common/entities/testresult.entity';
import { Action } from 'src/common/entities/action.entity';
import { Metadata } from 'src/metadatas/entities/metadata.entity';
import { Domain } from 'src/domains/entities/domain.entity';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Metadata, Api, Domain, Category, TestResult, Action])],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
  ],
})
export class FavoritesModule {}
