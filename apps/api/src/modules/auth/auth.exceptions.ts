import { ConflictException, UnauthorizedException } from '@nestjs/common';

export class UserAlreadyRegisteredException extends ConflictException {
  constructor() {
    super(
      'Usuário já existente. Use outro e-mail para cadastrar o seu usuário',
    );
  }
}

export class WrongPasswordOrEmailException extends UnauthorizedException {
  constructor() {
    super(
      'Credenciais inválidas. Verifique suas informações e tente novamente.',
    );
  }
}
