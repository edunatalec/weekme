import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly service: PrismaService) {}

  get user(): Prisma.UserDelegate {
    return this.service.user;
  }
}
