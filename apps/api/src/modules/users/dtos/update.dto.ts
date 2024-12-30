import { IsBoolean, IsString, IsUUID, MinLength } from 'class-validator';

export class UpdateUserParamDto {
  @IsUUID()
  readonly id: string;
}

export class UpdateUserBodyDto {
  @IsString()
  @MinLength(3)
  readonly fullName: string;

  @IsBoolean()
  readonly active: boolean;
}
