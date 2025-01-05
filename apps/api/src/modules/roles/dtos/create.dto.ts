import {
  ArrayNotEmpty,
  IsArray,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateRoleBodyDto {
  @IsString()
  @MinLength(3)
  readonly name: string;

  @IsString()
  @MinLength(3)
  readonly description: string;

  // TODO: MUDAR PARA IsUUIDArray()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  readonly permissionIds: string[];
}
