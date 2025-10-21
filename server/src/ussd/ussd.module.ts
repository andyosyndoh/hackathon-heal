import { Module } from '@nestjs/common';
import { UssdController } from './ussd.controller';
import { UssdService } from './ussd.service';

@Module({
  imports: [],
  controllers: [UssdController],
  providers: [UssdService],
  exports: [UssdService],
})
export class UssdModule {}
