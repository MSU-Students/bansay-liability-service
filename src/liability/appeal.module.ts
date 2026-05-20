import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppealController } from './appeal.controller';
import { AppealService } from './appeal.service';
import { Appeal } from './entities/appeal.entity';
import { Liability } from './entities/liability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appeal, Liability])],
  controllers: [AppealController],
  providers: [AppealService],
})
export class AppealModule {}
