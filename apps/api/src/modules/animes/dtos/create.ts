import { AnimeStatus } from '@repo/core';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { IsUUIDArray } from 'src/core/decorators/is-uuid-array';

export class CreateAnimeBodyDto {
  @IsString()
  readonly name: string;

  @IsUrl()
  @IsOptional()
  readonly backgroundUrl?: string;

  @IsUrl()
  readonly imageUrl: string;

  @IsEnum(AnimeStatus)
  readonly status: AnimeStatus;

  @IsString()
  readonly synopsis: string;

  @IsInt()
  readonly weekday: number;

  @IsDateString()
  @IsOptional()
  readonly startDate?: Date;

  @IsDateString()
  @IsOptional()
  readonly finishDate?: Date;

  @IsUUIDArray()
  @IsOptional()
  readonly seasonIds: string[];

  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;
}
