import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { LogDto } from 'src/apilogs/dto/apilog.dto';
import { ApilogsService } from './apilogs.service';
import { ResultDto } from './dto/apiresult.dto';
import { TimeDto } from './dto/apitime.dto';

@Controller('logs')
@ApiHeader({
  name: 'idtoken',
  description: 'Custom header',
})
export class ApilogsController {
  constructor(private readonly logsService: ApilogsService) {}

  @Get()
  getLogsByMetaId(@Query() logDto: LogDto) {
    console.log(logDto);
    return this.logsService.getLogsByMetaId(logDto);
  }

  @Get(':id')
  getLogByResultId(@Param('id') id: string) {
    return this.logsService.getLogByResultId(+id);
  }
  @Get('graph/action')
  getResultByAction(@Query() resultDto: ResultDto) {
    return this.logsService.getResultByAction(resultDto);
  }
  @Get('graph/metadatas/:id')
  getResultByMetaId(@Param('id') id: string, @Query() resultDto: ResultDto) {
    return this.logsService.getResultByMetaId(+id, resultDto);
  }
}
