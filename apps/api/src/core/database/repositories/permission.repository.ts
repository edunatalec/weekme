import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class PermissionRepository {
  constructor(private readonly service: PrismaService) {}

  get permission(): Prisma.PermissionDelegate {
    return this.service.permission;
  }
}
