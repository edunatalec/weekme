import { NotFoundException } from '@nestjs/common';

export class PermissionsNotFoundException extends NotFoundException {
  constructor() {
    super('Nenhuma permissão foi encontrada.');
  }
}

export class PermissionNotFoundException extends NotFoundException {
  constructor() {
    super('A permissão não foi encontrada.');
  }
}
