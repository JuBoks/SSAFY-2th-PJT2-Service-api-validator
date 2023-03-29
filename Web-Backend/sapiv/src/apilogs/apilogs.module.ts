import { Module } from '@nestjs/common';
import { ApilogsService } from './apilogs.service';
import { ApilogsController } from './apilogs.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ApilogsController],
  providers: [ApilogsService]
})
export class ApilogsModule {}
