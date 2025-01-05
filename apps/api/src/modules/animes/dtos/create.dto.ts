import { AnimeStatus } from '@repo/core';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
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

  // TODO: MUDAR PARA IsUUIDArray()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  readonly seasonIds: string[];
}
