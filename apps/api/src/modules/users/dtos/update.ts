import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { IsUUIDArray } from 'src/core/decorators/is-uuid-array';
import { IdParamDto } from 'src/core/dtos/id';

export class UpdateUserByIdParamDto extends IdParamDto {}

export class UpdateUserBodyDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly fullName?: string;

  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;

  @IsUUIDArray()
  @IsOptional()
  readonly roleIds: string[];
}
