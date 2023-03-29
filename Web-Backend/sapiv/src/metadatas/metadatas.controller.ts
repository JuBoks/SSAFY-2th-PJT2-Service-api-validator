import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MetadatasService } from './metadatas.service';
import { MetadataDto } from './dto/metadata.dto';
import { TestCase } from 'src/apis/entities/testcase.entity';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from 'src/common/guard/policies-guard';
import { Action } from 'src/casl/action';
import { ExpectResponseDto } from './dto/create-expect-response.dto';
import { ApiHeader } from '@nestjs/swagger';

@Controller('metadatas')
@ApiHeader({
  name: 'idtoken',
  description: 'Custom header',
})
export class MetadatasController {
  constructor(private readonly metadatasService: MetadatasService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, TestCase))
  create(@Body() createMetadataDto: MetadataDto) {
    return this.metadatasService.create(createMetadataDto);
  }

  @Post('/test/:id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, TestCase))
  test(@Param('id') id: string) {
    return this.metadatasService.test(+id);
  }

  @Post('/expect/:id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, TestCase))
  expect(@Param('id') id: string, @Body() expectResponseDto: ExpectResponseDto) {
    console.log(expectResponseDto);
    return this.metadatasService.expect(+id, expectResponseDto);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, TestCase))
  findAll(@Query('apiId') id:string) {
    return this.metadatasService.findAll(+id);
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, TestCase))
  findOne(@Param('id') id: string) {
    return this.metadatasService.findOne(+id);
  }

  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, TestCase))
  update(@Param('id') id: string, @Body() updateMetadataDto: MetadataDto) {
    return this.metadatasService.update(+id, updateMetadataDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, TestCase))
  remove(@Param('id') id: string) {
    return this.metadatasService.remove(+id);
  }
}
