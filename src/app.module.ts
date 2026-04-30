import { Module } from '@nestjs/common';
import { LiabilityModule } from './liabiility/liability.module';

@Module({
  imports: [LiabilityModule],
})
export class AppModule {}
