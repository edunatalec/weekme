import { NotFoundException } from '@nestjs/common';

export class RolesNotFoundException extends NotFoundException {
  constructor() {
    super('Nenhum cargo foi encontrado.');
  }
}

export class RoleNotFoundException extends NotFoundException {
  constructor() {
    super('O cargo não foi encontrado.');
  }
}
