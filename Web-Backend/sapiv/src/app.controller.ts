import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowUnauthorizedRequest } from './common/guard/allow-unauthorized-request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AllowUnauthorizedRequest()
  getHello(): string {
    return this.appService.getHello();
  }
}
