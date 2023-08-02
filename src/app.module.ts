import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmConfigService } from './typeorm.service';
import { AdministrationModules } from './modules/administration';
import { financialControlModules } from './modules/financial_control';
import { NotificationModule } from './modules/control_center/notification/notification.module';
import { controlCenterModules } from './modules/control_center';
import { LogsModule } from './modules/logbooks/log/logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TerminusModule,
    HttpModule,
    AuthModule,
    ...AdministrationModules,
    ...financialControlModules,
    ...controlCenterModules,
    LogsModule,
    NotificationModule,
    ...controlCenterModules,
    LogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
