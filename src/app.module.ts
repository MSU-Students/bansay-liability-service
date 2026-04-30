import { Module } from '@nestjs/common';
import { LiabilityModule } from './liability/liability.module';

@Module({
  imports: [LiabilityModule],
})
export class AppModule {}
