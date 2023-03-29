import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain } from 'domain';
import { Api } from 'src/apis/entities/api.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Metadata } from 'src/metadatas/entities/metadata.entity';
import { Alert } from './entities/alert.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [TypeOrmModule.forFeature([Alert, Metadata, Api, Domain, Category]),
  MailerModule.forRootAsync({
    useFactory: () => ({
      transport: {
        host: process.env.MAILDEV_HOST,
        port: parseInt(process.env.MAILDEV_PORT),
        ignoreTLS: false,
        secure: false,
        auth: {
          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@sapiv.site>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  }),
  UsersModule
],
  controllers: [AlertsController],
  providers: [AlertsService]
})
export class AlertsModule {}
