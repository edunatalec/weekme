import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class RoleRepository {
  constructor(private readonly service: PrismaService) {}

  get role(): Prisma.RoleDelegate {
    return this.service.role;
  }
}
