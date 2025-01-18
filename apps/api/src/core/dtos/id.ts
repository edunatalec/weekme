import { IsUUID } from 'class-validator';

export class IdParamDto {
  @IsUUID()
  readonly id: string;
}
