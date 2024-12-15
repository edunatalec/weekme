export class ActivateUserDto {
  readonly userId: string;
  readonly status: 'BLOCKED' | 'ACTIVE';
}
