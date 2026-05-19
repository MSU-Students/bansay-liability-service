import { IsEnum, IsNumber, IsDateString, IsPositive, Min, IsString, IsNotEmpty } from 'class-validator';
import { LiabilityType } from '../enums/liability-type.enum';

export class CreateLiabilityDto {
  @IsNumber()
  @IsPositive()
  studentId: number;

  @IsNumber()
  @IsPositive()
  issuerId: number;

  @IsEnum(LiabilityType)
  type: LiabilityType;

  @IsNumber()
  @IsPositive()
  @Min(0.01)
  amount: number;

  @IsDateString()
  dueDate: string;
}
