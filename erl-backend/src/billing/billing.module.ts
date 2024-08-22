import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingEntity } from 'src/entities/billing.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesAuthGuard } from 'src/auth/guards/rolesAuth.guard';
import { UsersService } from 'src/users/users.service';
// import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([BillingEntity])],
  controllers: [BillingController],
  providers: [BillingService, JwtAuthGuard, RolesGuard, RolesAuthGuard,UsersService],
})
export class BillingModule {}
