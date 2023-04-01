import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { ApisService } from './apis.service';
import { CreateApiDto } from './dto/create-api.dto';
import { TestApiDto } from './dto/test-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Controller('apis')
@ApiHeader({
  name: 'idtoken',
  description: 'Custom header',
})
export class ApisController {
  constructor(private readonly apisService: ApisService) {}

  @Post()
  create(@Body() createApiDto: CreateApiDto) {
    return this.apisService.create(createApiDto);
  }

  @Post('test')
  async test(@Body() testApiDto: TestApiDto, @Res({ passthrough: true }) res: Response) {
    return this.apisService.test(testApiDto);
  }

  @Get()
  findAll(@Query('domainId') id: string) {
    return this.apisService.findAll(+id);
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

  @Get('all/testcase')
  testCaseAll(){
    return this.apisService.testCaseAll();
  }

  @Get('all/testcase/:id')
  testCaseOne(@Param('id') id: string){
    return this.apisService.testCaseOne(+id);
  }

  @Get('all/list')
  listAll(){
    return this.apisService.listAll();
  }
}
