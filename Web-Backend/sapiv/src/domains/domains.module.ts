import { Module } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { DomainsController } from './domains.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Api } from 'src/apis/entities/api.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Metadata } from 'src/metadatas/entities/metadata.entity';
import { Domain } from './entities/domain.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Metadata, Api, Domain, Category])],
  controllers: [DomainsController],
  providers: [DomainsService]
})
export class DomainsModule {}
