import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CaslModule } from './casl/casl.module';
import { APP_GUARD } from '@nestjs/core';
import { PoliciesGuard } from './common/guard/policies-guard';
import { ApisModule } from './apis/apis.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { DomainsModule } from './domains/domains.module';
import { MetadatasModule } from './metadatas/metadatas.module';
import { AlertsModule } from './alerts/alerts.module';
import { HttpModule } from '@nestjs/axios';
import { ApilogsModule } from './apilogs/apilogs.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({
    isGlobal: true,
  }), CaslModule, ApisModule, FavoritesModule, TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('NODE_ENV') === 'production' ? process.env.PROD_DATABASE_HOST : process.env.DEV_DATABASE_HOST,
      port: configService.get('NODE_ENV') === 'production' ? parseInt(process.env.PROD_DATABASE_PORT) : parseInt(process.env.DEV_DATABASE_PORT),
      username: configService.get('NODE_ENV') === 'production' ? process.env.PROD_DATABASE_USERNAME : process.env.DEV_DATABASE_USERNAME,
      password: configService.get('NODE_ENV') === 'production' ? process.env.PROD_DATABASE_PASSWORD : process.env.DEV_DATABASE_PASSWORD,
      database: configService.get('NODE_ENV') === 'production' ? process.env.PROD_DATABASE_NAME : process.env.DEV_DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
  }), CategoriesModule, DomainsModule, MetadatasModule, AlertsModule, HttpModule, ApilogsModule],
  controllers: [AppController],
  providers: [AppService,  {
    provide: APP_GUARD,
    useClass: PoliciesGuard,
  },],
})
export class AppModule {}
