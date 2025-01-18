import { applyDecorators, Controller, Get, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const ProfileControllerDecorators = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiTags('Perfil'),
    Controller('profile'),
  );
};

export const GetProfileEndpoint = () => {
  return applyDecorators(Get());
};

export const UpdateProfileEndpoint = () => {
  return applyDecorators(Patch());
};
