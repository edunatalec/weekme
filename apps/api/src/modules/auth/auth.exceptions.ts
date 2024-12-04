import { ConflictException } from '@nestjs/common';

export class UserAlreadyRegisteredException extends ConflictException {
  constructor() {
    super(
      'Usuário já existente. Use outro e-mail para cadastrar o seu usuário',
    );
  }
}
