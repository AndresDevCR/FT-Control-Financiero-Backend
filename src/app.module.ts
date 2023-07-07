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
import { DepartmentModule } from './modules/financial_control/department/department.module';
import { PositionModule } from './modules/financial_control/position/position.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TerminusModule,
    HttpModule,
    AuthModule,
    ...AdministrationModules,
    ...financialControlModules,
    DepartmentModule,
    PositionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
