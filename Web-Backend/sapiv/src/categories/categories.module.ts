import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain } from 'domain';
import { Api } from 'src/apis/entities/api.entity';
import { Metadata } from 'src/metadatas/entities/metadata.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Metadata, Api, Domain, Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
