import { IsString, IsNotEmpty, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class CreateAppealDto {
  @IsNumber()
  @IsPositive()
  liabilityId: number;

  @IsNumber()
  @IsPositive()
  studentId: number;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsOptional()
  @IsString()
  evidenceUrl?: string;
}
