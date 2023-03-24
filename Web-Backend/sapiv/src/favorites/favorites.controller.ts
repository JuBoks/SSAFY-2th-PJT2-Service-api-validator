import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { AllowUnauthorizedRequest } from 'src/common/guard/allow-unauthorized-request';
import { CustomRequest } from 'src/common/custromrequest';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from 'src/common/guard/policies-guard';
import { Action } from 'src/casl/action';
import { Favorite } from './entities/favorite.entity';
import { ApiHeader } from '@nestjs/swagger';

@Controller('favorites')
@ApiHeader({
  name: 'idtoken',
  description: 'Custom header',
})
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Favorite))
  async create(@Body() createFavoriteDto: CreateFavoriteDto, @Req() req:CustomRequest) {
    return await this.favoritesService.create(createFavoriteDto, req);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Favorite))
  async findAll(@Req() req:CustomRequest) {
    return await this.favoritesService.findAll(req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: CustomRequest) {
    return this.favoritesService.remove(+id, request);
  }
}
