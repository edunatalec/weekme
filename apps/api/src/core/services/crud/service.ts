import { Pageable } from '@repo/core';
import { PrismaService } from 'src/core/database/prisma.service';
import { PrismaTypeMap } from 'src/core/services/crud/types';

export class PrismaCrudService<Module extends keyof PrismaTypeMap> {
  constructor(
    protected readonly delegate: PrismaService[Module],
    protected readonly include: PrismaTypeMap[Module]['include'],
    protected readonly mapper: PrismaTypeMap[Module]['mapper'],
  ) {}

  protected get _delegate(): any {
    return this.delegate;
  }

  protected async _search(
    args: PrismaTypeMap[Module]['search'],
  ): Promise<Pageable<PrismaTypeMap[Module]['entity']> | null> {
    const skip = (args.page - 1) * args.size;

    const count = await this._delegate.count({
      where: args.where,
    });

    if (count === 0) return null;

    const items = await this._delegate.findMany({
      skip,
      take: args.size,
      orderBy: args.orderBy,
      where: args.where,
      include: this.include,
    });

    return {
      data: items.map((item) => this.mapper(item)),
      meta: {
        count,
        page: args.page,
        totalPages: Math.ceil(count / args.size),
      },
    };
  }

  protected async _getById(
    args: PrismaTypeMap[Module]['getById'],
  ): Promise<PrismaTypeMap[Module]['entity'] | null> {
    const response = await this._delegate.findUnique({
      where: { id: args.id },
      include: this.include,
    });

    if (response) {
      return this.mapper(response);
    }

    return null;
  }

  protected async _create(
    args: PrismaTypeMap[Module]['create'],
  ): Promise<PrismaTypeMap[Module]['entity']> {
    const response = await this._delegate.create({
      data: args.data,
      include: this.include,
    });

    return this.mapper(response);
  }

  protected async _update(
    args: PrismaTypeMap[Module]['update'],
  ): Promise<PrismaTypeMap[Module]['entity']> {
    const response = await this._delegate.update({
      where: { id: args.id },
      data: args.data,
      include: this.include,
    });

    return this.mapper(response);
  }

  protected async _delete(
    args: PrismaTypeMap[Module]['delete'],
  ): Promise<void> {
    await this._delegate.update({
      where: { id: args.id },
      data: { active: false },
    });
  }
}
