import { IsOptional, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { LiabilityStatus } from '../enums/liability-status.enum';
import { LiabilityType } from '../enums/liability-type.enum';

export class QueryLiabilityDto {
  @IsOptional()
  @IsEnum(LiabilityType)
  type?: LiabilityType;

  @IsOptional()
  @IsEnum(LiabilityStatus)
  status?: LiabilityStatus;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  studentId?: number;
}
