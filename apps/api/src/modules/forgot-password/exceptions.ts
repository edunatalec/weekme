import { BadRequestException } from '@nestjs/common';

export class CodeExpiredOrInvalidException extends BadRequestException {
  constructor() {
    super('O código está expirado ou inválido.');
  }
}
