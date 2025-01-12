import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { IsUUIDArray } from 'src/core/decorators/is-uuid-array';

export class CreateRoleBodyDto {
  @IsString()
  @MinLength(3)
  readonly name: string;

  @IsString()
  @MinLength(3)
  readonly description: string;

  @IsUUIDArray()
  @IsOptional()
  readonly permissionIds: string[];

  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;
}
