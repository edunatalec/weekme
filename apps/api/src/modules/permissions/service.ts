import { Injectable } from '@nestjs/common';
import { Pageable, PermissionEntity } from '@repo/core';
import { permissionToEntity } from 'src/core/database/mappers/permission.mapper';
import { PrismaService } from 'src/core/database/service';
import { PrismaModule } from 'src/core/services/crud/constants';
import { PrismaCrudService } from 'src/core/services/crud/service';
import { SearchPermissionsQueryDto } from 'src/modules/permissions/dtos/search';
import { UpdatePermissionBodyDto } from 'src/modules/permissions/dtos/update';

@Injectable()
export class PermissionService extends PrismaCrudService<PrismaModule.PERMISSIONS> {
  constructor(prisma: PrismaService) {
    super(prisma.permission, {}, permissionToEntity);
  }

  public search(
    query: SearchPermissionsQueryDto,
  ): Promise<Pageable<PermissionEntity> | null> {
    return this._search({
      page: query.page,
      size: query.size,
      orderBy: {
        name: 'asc',
      },
      where: { name: { contains: query.name, mode: 'insensitive' } },
    });
  }

  public getById(id: string): Promise<PermissionEntity | null> {
    return this._getById({ id });
  }

  public update(
    id: string,
    body: UpdatePermissionBodyDto,
  ): Promise<PermissionEntity> {
    return this._update({
      id,
      data: body,
    });
  }
}
