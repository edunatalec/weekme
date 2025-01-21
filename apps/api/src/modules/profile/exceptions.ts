import { BadRequestException } from '@nestjs/common';

export class PasswordInvalidException extends BadRequestException {
  constructor() {
    super('A senha atual enviada incorreta.');
  }
}
