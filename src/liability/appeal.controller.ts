import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppealService } from './appeal.service';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { ReviewAppealDto } from './dto/review-appeal.dto';

@Controller()
export class AppealController {
  constructor(private readonly appealService: AppealService) {}

  @MessagePattern({ cmd: 'liability.createAppeal' })
  create(dto: CreateAppealDto) {
    return this.appealService.create(dto);
  }

  @MessagePattern({ cmd: 'liability.reviewAppeal' })
  review(dto: ReviewAppealDto) {
    return this.appealService.review(dto);
  }

  @MessagePattern({ cmd: 'liability.findAppealsByLiability' })
  findByLiability(data: { liabilityId: number }) {
    return this.appealService.findByLiability(data.liabilityId);
  }

  @MessagePattern({ cmd: 'liability.findAppeal' })
  findOne(data: { id: number }) {
    return this.appealService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'liability.listAppeals' })
  findAll() {
    return this.appealService.findAll();
  }
}
