import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class UpdateProfileBodyDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly fullName?: string;

  @IsUrl()
  @IsOptional()
  readonly avatarUrl?: string;
}
