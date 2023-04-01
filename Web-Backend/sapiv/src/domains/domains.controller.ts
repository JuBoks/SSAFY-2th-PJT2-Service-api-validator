import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { TestCase } from 'src/apis/entities/testcase.entity';
import { Action } from 'src/casl/action';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from 'src/common/guard/policies-guard';
import { DomainsService } from './domains.service';
import { DomainDto } from './dto/domain.dto';

@Controller('domains')
@ApiHeader({
  name: 'idtoken',
  description: 'Custom header',
})
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, TestCase))
  create(@Body() createDomainDto: DomainDto) {
    return this.domainsService.create(createDomainDto);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, TestCase))
  findAll(@Query('categoryId') id : string) {
    return this.domainsService.findAll(+id);
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, TestCase))
  findOne(@Param('id') id: string) {
    return this.domainsService.findOne(+id);
  }

  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, TestCase))
  update(@Param('id') id: string, @Body() updateDomainDto: DomainDto) {
    return this.domainsService.update(+id, updateDomainDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, TestCase))
  remove(@Param('id') id: string) {
    return this.domainsService.remove(+id);
  }

  @Get('all/list')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, TestCase))
  listAll() {
    return this.domainsService.listAll();
  }
}
