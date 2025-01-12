import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @Type(() => Number)
  @Min(1)
  @IsNumber()
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @Min(10)
  @Max(50)
  @IsNumber()
  @IsOptional()
  readonly size?: number = 10;
}
