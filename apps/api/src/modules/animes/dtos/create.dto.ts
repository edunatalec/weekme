import { AnimeStatus } from '@repo/core';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateAnimeBodyDto {
  @IsString()
  @MinLength(3)
  readonly name: string;

  @IsUrl()
  @IsOptional()
  readonly backgroundUrl?: string;

  @IsUrl()
  readonly imageUrl: string;

  @IsEnum(AnimeStatus)
  readonly status: AnimeStatus;

  @IsString()
  @MinLength(3)
  readonly synopsis: string;

  @IsInt()
  readonly year: number;

  @IsInt()
  readonly weekday: number;

  @IsDateString()
  @IsOptional()
  readonly startDate?: Date;

  @IsDateString()
  @IsOptional()
  readonly finishDate?: Date;
}
