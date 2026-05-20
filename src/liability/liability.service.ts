import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Liability } from './entities/liability.entity';
import { CreateLiabilityDto } from './dto/create-liability.dto';
import { UpdateLiabilityDto } from './dto/update-liability.dto';
import { QueryLiabilityDto } from './dto/query-liability.dto';

@Injectable()
export class LiabilityService {
  constructor(
    @InjectRepository(Liability)
    private readonly liabilityRepo: Repository<Liability>,
  ) {}

  ping(): string {
    return '[Liability] I am alive.';
  }

  create(dto: CreateLiabilityDto) {
    const liability = this.liabilityRepo.create(dto);
    return this.liabilityRepo.save(liability);
  }

  findAll(query: QueryLiabilityDto) {
    const where: Record<string, unknown> = {};
    if (query.type) where.type = query.type;
    if (query.status) where.status = query.status;
    if (query.studentId) where.studentId = query.studentId;
    return this.liabilityRepo.find({ where, order: { createdAt: 'DESC' } });
  }

  findOne(id: number) {
    return this.liabilityRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateLiabilityDto) {
    await this.liabilityRepo.update(id, dto);
    return this.liabilityRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const liability = await this.liabilityRepo.findOne({ where: { id } });
    if (liability) {
      await this.liabilityRepo.softRemove(liability);
    }
    return { id };
  }
}
