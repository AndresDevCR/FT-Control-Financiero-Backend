import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor(
    private healthCheckService: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get('health-check')
  healthCheck(): any {
    return this.healthCheckService.check([]);
  }
}
