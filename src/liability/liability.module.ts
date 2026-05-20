import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiabilityController } from './liability.controller';
import { LiabilityService } from './liability.service';
import { Liability } from './entities/liability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Liability])],
  controllers: [LiabilityController],
  providers: [LiabilityService],
})
export class LiabilityModule {}
