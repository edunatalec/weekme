import { IsUUID } from 'class-validator';

export class DeleteUserParamDto {
  @IsUUID()
  readonly id: string;
}
