import { IsEnum, IsNumber, IsPositive, IsString, IsNotEmpty, Min } from 'class-validator';
import { PaymentMethod } from '../enums/payment-method.enum';

export class CreatePaymentDto {
  @IsNumber()
  @IsPositive()
  liabilityId: number;

  @IsNumber()
  @IsPositive()
  @Min(0.01)
  amountPaid: number;

  @IsString()
  @IsNotEmpty()
  transactionRef: string;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
