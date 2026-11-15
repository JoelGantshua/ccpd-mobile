import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'UP',
      service: 'ccpd-mobile-api',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}