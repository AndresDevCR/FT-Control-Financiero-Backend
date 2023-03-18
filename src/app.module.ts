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
import { EpsModules } from './modules/eps';
import { DamageReportModules } from './modules/damage_report';
import { PolesModules } from './modules/rounds';
import { TransformerModules } from './modules/rounds/transformers';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TerminusModule,
    HttpModule,
    AuthModule,
    ...AdministrationModules,
    ...DamageReportModules,
    ...EpsModules,
    ...PolesModules,
    ...TransformerModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
