import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiabilityModule } from './liability/liability.module';
import { AppealModule } from './liability/appeal.module';
import { Liability } from './liability/entities/liability.entity';
import { Appeal } from './liability/entities/appeal.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +(process.env.DATABASE_PORT || 5432),
      username: process.env.DB_USER || 'bansay',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'bansay_db',
      entities: [Liability, Appeal],
      synchronize: true,
    }),
    LiabilityModule,
    AppealModule,
  ],
})
export class AppModule {}
