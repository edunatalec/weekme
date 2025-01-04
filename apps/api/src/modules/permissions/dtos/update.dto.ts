import { IsOptional, IsString, MinLength } from 'class-validator';
import { IdParamDto } from 'src/core/dtos/id.dto';

export class UpdatePermissionByIdParamDto extends IdParamDto {}

export class UpdatePermissionBodyDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly name: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly description: string;
}
