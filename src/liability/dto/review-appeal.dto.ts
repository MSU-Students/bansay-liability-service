import { IsEnum, IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { AppealStatus } from '../enums/appeal-status.enum';

export class ReviewAppealDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsNumber()
  @IsPositive()
  reviewedBy: number;

  @IsEnum(AppealStatus)
  status: AppealStatus.APPROVED | AppealStatus.REJECTED;

  @IsString()
  @IsNotEmpty()
  reviewerRemarks: string;
}
