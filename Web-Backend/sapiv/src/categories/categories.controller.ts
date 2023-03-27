import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Req } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AllowUnauthorizedRequest } from 'src/common/guard/allow-unauthorized-request';
import { Logger } from 'winston';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() request: Request) {
    this.logger.log('Calling create Category', CategoriesController.name)
    return this.categoriesService.create(createCategoryDto, request);
  }

  @Get()
  @AllowUnauthorizedRequest()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
