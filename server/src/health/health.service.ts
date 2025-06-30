import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth() {
    return {
      status: 'healthy',
      service: 'heal-api-nestjs',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      environment: 'development',
    };
  }

  getDebug() {
    return {
      status: 'debug',
      timestamp: new Date().toISOString(),
      environment: {
        hasGeminiKey: !!process.env.NEXT_PUBLIC_GEMINI_API_KEY,
        hasJwtSecret: !!process.env.JWT_SECRET,
        nodeVersion: process.version,
      },
    };
  }
}