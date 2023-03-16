import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { AxiosError, AxiosRequestConfig, RawAxiosRequestConfig } from 'axios';
import { ApisService } from './apis.service';
import { CreateApiDto } from './dto/create-api.dto';
import { TestApiDto } from './dto/test-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Controller('apis')
@ApiHeader({
  name: 'uid',
  description: 'Custom header',
})
export class ApisController {
  constructor(private readonly apisService: ApisService) {}

  @Post()
  create(@Body() createApiDto: CreateApiDto) {
    return this.apisService.create(createApiDto);
  }

  @Post('test')
  async test(@Body() testApiDto: TestApiDto) {
    
    let result =  await this.apisService.test(testApiDto);
    return result;
  }

  @Get()
  findAll() {
    return this.apisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApiDto: UpdateApiDto) {
    return this.apisService.update(+id, updateApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apisService.remove(+id);
  }
}
