import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { TestCase } from 'src/apis/entities/testcase.entity';
import { Action } from 'src/casl/action';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from 'src/common/guard/policies-guard';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
@ApiHeader({
  name: 'idtoken',
  description: 'Custom header',
})
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, TestCase))
  create(@Body() categoryDto: CategoryDto, @Req() request: Request) {
    return this.categoriesService.create(categoryDto, request);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, TestCase))
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('all/list')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, TestCase))
  listAll() {
    return this.categoriesService.listAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, TestCase))
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, TestCase))
  update(@Param('id') id: string, @Body() categoryDto: CategoryDto) {
    return this.categoriesService.update(+id, categoryDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, TestCase))
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
