import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LiabilityService } from './liability.service';
import { CreateLiabilityDto } from './dto/create-liability.dto';
import { UpdateLiabilityDto } from './dto/update-liability.dto';
import { QueryLiabilityDto } from './dto/query-liability.dto';

@Controller()
export class LiabilityController {
  constructor(private readonly liabilityService: LiabilityService) {}

  @MessagePattern({ cmd: 'liability.ping' })
  ping(): string {
    return this.liabilityService.ping();
  }

  @MessagePattern({ cmd: 'liability.create' })
  create(dto: CreateLiabilityDto) {
    return this.liabilityService.create(dto);
  }

  @MessagePattern({ cmd: 'liability.findAll' })
  findAll(query: QueryLiabilityDto) {
    return this.liabilityService.findAll(query);
  }

  @MessagePattern({ cmd: 'liability.findOne' })
  findOne(data: { id: number }) {
    return this.liabilityService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'liability.update' })
  update(data: { id: number } & UpdateLiabilityDto) {
    const { id, ...dto } = data;
    return this.liabilityService.update(id, dto);
  }

  @MessagePattern({ cmd: 'liability.remove' })
  remove(data: { id: number }) {
    return this.liabilityService.remove(data.id);
  }
}
