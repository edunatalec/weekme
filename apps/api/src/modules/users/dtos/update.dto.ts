import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class UpdateUserParamDto {
  @IsUUID()
  readonly id: string;
}

export class UpdateUserBodyDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly fullName?: string;

  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;
}
