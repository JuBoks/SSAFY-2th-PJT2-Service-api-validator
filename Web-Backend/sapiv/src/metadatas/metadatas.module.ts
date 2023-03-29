import { Module } from '@nestjs/common';
import { MetadatasService } from './metadatas.service';
import { MetadatasController } from './metadatas.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MetadatasController],
  providers: [MetadatasService]
})
export class MetadatasModule {}
