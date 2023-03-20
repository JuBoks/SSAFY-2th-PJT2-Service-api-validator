import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CaslModule } from './casl/casl.module';
import { APP_GUARD } from '@nestjs/core';
import { PoliciesGuard } from './common/guard/policies-guard';
import { ApisModule } from './apis/apis.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), CaslModule, ApisModule],
  controllers: [AppController],
  providers: [AppService,  {
    provide: APP_GUARD,
    useClass: PoliciesGuard,
  },],
})
export class AppModule {}
