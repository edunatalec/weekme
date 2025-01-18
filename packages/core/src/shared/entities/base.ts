export interface BaseEntity {
  readonly id: string;
  readonly active: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
