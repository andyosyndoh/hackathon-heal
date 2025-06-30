import { Module } from '@nestjs/common';
import { CrisisService } from './crisis.service';
import { CrisisController } from './crisis.controller';

@Module({
  providers: [CrisisService],
  controllers: [CrisisController],
})
export class CrisisModule {}