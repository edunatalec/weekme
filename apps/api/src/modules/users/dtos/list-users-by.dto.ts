import { Type } from 'class-transformer';
import { IsOptional, IsString, Max, Min } from 'class-validator';

export class ListUsersByDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  readonly page?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  readonly size?: number;
}
