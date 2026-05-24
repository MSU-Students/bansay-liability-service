import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Liability } from './entities/liability.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { LiabilityStatus } from './enums/liability-status.enum';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Liability)
    private readonly liabilityRepo: Repository<Liability>,
  ) {}

  async create(dto: CreatePaymentDto) {
    const liability = await this.liabilityRepo.findOne({
      where: { id: dto.liabilityId },
    });
    if (!liability) {
      throw new NotFoundException('Liability not found');
    }

    const payment = this.paymentRepo.create(dto);
    const saved = await this.paymentRepo.save(payment);

    const totalPaid = await this.paymentRepo
      .createQueryBuilder('payment')
      .select('COALESCE(SUM(payment.amountPaid), 0)', 'total')
      .where('payment.liabilityId = :liabilityId', {
        liabilityId: dto.liabilityId,
      })
      .getRawOne();

    if (Number(totalPaid.total) >= Number(liability.amount)) {
      await this.liabilityRepo.update(dto.liabilityId, {
        status: LiabilityStatus.PAID,
      });
    }

    return saved;
  }

  findByLiability(liabilityId: number) {
    return this.paymentRepo.find({
      where: { liabilityId },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.paymentRepo.findOne({ where: { id } });
  }

  findAll() {
    return this.paymentRepo.find({
      order: { createdAt: 'DESC' },
    });
  }
}
