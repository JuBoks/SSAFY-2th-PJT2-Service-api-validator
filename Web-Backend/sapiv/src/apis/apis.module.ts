import { Module } from '@nestjs/common';
import { ApisService } from './apis.service';
import { ApisController } from './apis.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain } from 'domain';
import { Category } from 'src/categories/entities/category.entity';
import { Metadata } from 'src/metadatas/entities/metadata.entity';
import { Api } from './entities/api.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Metadata, Api, Domain, Category])],
  controllers: [ApisController],
  providers: [ApisService]
})
export class ApisModule {}
