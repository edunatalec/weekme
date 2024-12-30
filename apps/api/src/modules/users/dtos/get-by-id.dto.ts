import { IsUUID } from 'class-validator';

export class GetUserByIdParamDto {
  @IsUUID()
  readonly id: string;
}
