import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { TestCase } from 'src/apis/entities/testcase.entity';
import { Action } from 'src/casl/action';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from 'src/common/guard/policies-guard';
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
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, TestCase))
  getLogsByMetaId(@Query() logDto: LogDto) {
    console.log(logDto);
    return this.logsService.getLogsByMetaId(logDto);
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, TestCase))
  getLogByResultId(@Param('id') id: string) {
    return this.logsService.getLogByResultId(+id);
  }
  @Get('graph/action')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, TestCase))
  getResultByAction(@Query() timeDto: TimeDto) {
    return this.logsService.getResultByAction(timeDto);
  }
  @Get('graph/metadatas/:id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, TestCase))
  getResultByMetaId(@Param('id') id: string, @Query() resultDto: ResultDto) {
    return this.logsService.getResultByMetaId(+id, resultDto);
  }
}
