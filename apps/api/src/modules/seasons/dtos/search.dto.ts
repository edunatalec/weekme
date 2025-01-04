import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class SearchSeasonsQueryDto {
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
