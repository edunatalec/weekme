import { NotFoundException } from '@nestjs/common';

export class SeasonsNotFoundException extends NotFoundException {
  constructor() {
    super('Nenhuma temporada foi encontrada.');
  }
}

export class SeasonNotFoundException extends NotFoundException {
  constructor() {
    super('A temporada não foi encontrada.');
  }
}
