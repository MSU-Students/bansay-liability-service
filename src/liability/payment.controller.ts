import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({ cmd: 'liability.createPayment' })
  create(dto: CreatePaymentDto) {
    return this.paymentService.create(dto);
  }

  @MessagePattern({ cmd: 'liability.findPaymentsByLiability' })
  findByLiability(data: { liabilityId: number }) {
    return this.paymentService.findByLiability(data.liabilityId);
  }

  @MessagePattern({ cmd: 'liability.findPayment' })
  findOne(data: { id: number }) {
    return this.paymentService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'liability.listPayments' })
  findAll() {
    return this.paymentService.findAll();
  }
}
