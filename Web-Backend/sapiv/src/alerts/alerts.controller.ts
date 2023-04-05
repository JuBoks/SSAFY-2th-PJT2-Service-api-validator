import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { CustomRequest } from 'src/common/custromrequest';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from 'src/common/guard/policies-guard';
import { Action } from 'src/casl/action';
import { ApiHeader } from '@nestjs/swagger';
import { Alert } from './entities/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { AlertsService } from './alerts.service';
import { AllowUnauthorizedRequest } from 'src/common/guard/allow-unauthorized-request';
import { EmailDto } from './dto/email-dto';

@Controller('alerts')
@ApiHeader({
  name: 'idtoken',
  description: 'Custom header',
})
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Alert))
  async create(@Body() createFavoriteDto: CreateAlertDto, @Req() req:CustomRequest) {
    return await this.alertsService.create(createFavoriteDto, req);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Alert))
  async findAll(@Req() req:CustomRequest) {
    return await this.alertsService.findAll(req);
  }

  @Post(':id')
  @AllowUnauthorizedRequest()
  async notice(@Param('id') id: number, @Body() emailDto: EmailDto) {
    return await this.alertsService.notice(id, emailDto );
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Alert))
  remove(@Param('id') id: number, @Req() request: CustomRequest) {
    return this.alertsService.remove(+id, request);
  }
}
