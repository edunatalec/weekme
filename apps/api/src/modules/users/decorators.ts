import { applyDecorators, Delete, Get, Patch } from '@nestjs/common';

export const SearchUsersEndpoint = () => {
  return applyDecorators(Get());
};

export const GetUserByIdEndpoint = () => {
  return applyDecorators(Get(':id'));
};

export const UpdateUserEndpoint = () => {
  return applyDecorators(Patch(':id'));
};

export const DeleteUserEndpoint = () => {
  return applyDecorators(Delete(':id'));
};
