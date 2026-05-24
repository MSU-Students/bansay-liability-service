import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { Liability } from './entities/liability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Liability])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
