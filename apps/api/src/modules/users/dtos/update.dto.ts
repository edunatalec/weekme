import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { IdParamDto } from 'src/core/dtos/id.dto';

export class UpdateUserParamDto extends IdParamDto {}

export class UpdateUserBodyDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly fullName?: string;

  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;
}
