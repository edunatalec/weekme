import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class ResetPasswordRepository {
  constructor(private readonly service: PrismaService) {}

  get resetPassword(): Prisma.ResetPasswordDelegate {
    return this.service.resetPassword;
  }
}
