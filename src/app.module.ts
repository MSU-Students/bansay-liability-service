import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiabilityModule } from './liability/liability.module';
import { PaymentModule } from './liability/payment.module';
import { Liability } from './liability/entities/liability.entity';
import { Payment } from './liability/entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +(process.env.DATABASE_PORT || 5432),
      username: process.env.DB_USER || 'bansay',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'bansay_db',
      entities: [Liability, Payment],
      synchronize: true,
    }),
    LiabilityModule,
    PaymentModule,
  ],
})
export class AppModule {}
