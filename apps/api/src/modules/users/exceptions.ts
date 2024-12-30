import { NotFoundException } from '@nestjs/common';

export class UsersNotFoundException extends NotFoundException {
  constructor() {
    super('Nenhum usuário foi encontrado.');
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super('O usuário não foi encontrado.');
  }
}
