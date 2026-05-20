import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appeal } from './entities/appeal.entity';
import { Liability } from './entities/liability.entity';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { ReviewAppealDto } from './dto/review-appeal.dto';
import { AppealStatus } from './enums/appeal-status.enum';
import { LiabilityStatus } from './enums/liability-status.enum';

@Injectable()
export class AppealService {
  constructor(
    @InjectRepository(Appeal)
    private readonly appealRepo: Repository<Appeal>,
    @InjectRepository(Liability)
    private readonly liabilityRepo: Repository<Liability>,
  ) {}

  async create(dto: CreateAppealDto) {
    const liability = await this.liabilityRepo.findOne({
      where: { id: dto.liabilityId },
    });
    if (!liability) {
      throw new NotFoundException('Liability not found');
    }
    if (liability.status !== LiabilityStatus.UNPAID) {
      throw new BadRequestException('Can only appeal unpaid liabilities');
    }
    const existing = await this.appealRepo.findOne({
      where: {
        liabilityId: dto.liabilityId,
        studentId: dto.studentId,
        status: AppealStatus.PENDING,
      },
    });
    if (existing) {
      throw new BadRequestException('A pending appeal already exists for this liability');
    }
    const appeal = this.appealRepo.create(dto);
    return this.appealRepo.save(appeal);
  }

  async review(dto: ReviewAppealDto) {
    const appeal = await this.appealRepo.findOne({
      where: { id: dto.id },
      relations: ['liability'],
    });
    if (!appeal) {
      throw new NotFoundException('Appeal not found');
    }
    if (appeal.status !== AppealStatus.PENDING) {
      throw new BadRequestException('Appeal has already been reviewed');
    }
    appeal.status = dto.status;
    appeal.reviewerRemarks = dto.reviewerRemarks;
    appeal.reviewedBy = dto.reviewedBy;
    return this.appealRepo.save(appeal);
  }

  findByLiability(liabilityId: number) {
    return this.appealRepo.find({
      where: { liabilityId },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.appealRepo.findOne({ where: { id } });
  }

  findAll() {
    return this.appealRepo.find({
      order: { createdAt: 'DESC' },
    });
  }
}
