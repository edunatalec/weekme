import { BaseEntity } from '@repo/core';

export const baseToEntity = (base): BaseEntity => {
  return {
    id: base.id,
    active: base.active,
    createdAt: base.createdAt,
    updatedAt: base.updatedAt,
  };
};
