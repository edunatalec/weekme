import { SeasonName } from '@repo/core';
import { IsBoolean, IsEnum, IsInt, IsOptional } from 'class-validator';

export class CreateSeasonBodyDto {
  @IsEnum(SeasonName)
  readonly name: SeasonName;

  @IsInt()
  readonly year: number;

  @IsBoolean()
  @IsOptional()
  readonly show?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;
}
