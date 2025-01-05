import { Injectable } from '@nestjs/common';
import { Pageable, RoleEntity } from '@repo/core';
import { roleToEntity } from 'src/core/database/mappers/role.mapper';
import { PrismaService } from 'src/core/database/prisma.service';
import { PrismaModule } from 'src/core/services/crud/constants';
import { PrismaCrudService } from 'src/core/services/crud/service';
import { CreateRoleBodyDto } from 'src/modules/roles/dtos/create.dto';
import { SearchRolesQueryDto } from 'src/modules/roles/dtos/search.dto';
import { UpdateRoleBodyDto } from 'src/modules/roles/dtos/update.dto';

@Injectable()
export class RoleService extends PrismaCrudService<PrismaModule.ROLES> {
  constructor(prisma: PrismaService) {
    super(prisma.role, { permissions: true }, roleToEntity);
  }

  public search(
    query: SearchRolesQueryDto,
  ): Promise<Pageable<RoleEntity> | null> {
    return this._search({
      page: query.page,
      size: query.size,
      orderBy: {
        name: 'asc',
      },
      where: { name: { contains: query.name, mode: 'insensitive' } },
    });
  }

  public getById(id: string): Promise<RoleEntity | null> {
    return this._getById({ id });
  }

  public create(body: CreateRoleBodyDto): Promise<RoleEntity> {
    const { permissionIds, ...data } = body;

    return this._create({
      data: {
        ...data,
        ...(permissionIds && {
          permissions: {
            connect: permissionIds.map((id) => ({ id })),
          },
        }),
      },
    });
  }

  public update(id: string, body: UpdateRoleBodyDto): Promise<RoleEntity> {
    const { permissionIds, ...data } = body;

    return this._update({
      id,
      data: {
        ...data,
        ...(permissionIds && {
          permissions: {
            set: permissionIds.map((id) => ({ id })),
          },
        }),
      },
    });
  }

  public async delete(id: string): Promise<void> {
    return this._delete({ id });
  }
}
