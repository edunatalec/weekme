import { NotFoundException } from '@nestjs/common';

export class AnimesNotFoundException extends NotFoundException {
  constructor() {
    super('Nenhum anime foi encontrado.');
  }
}

export class AnimeNotFoundException extends NotFoundException {
  constructor() {
    super('O anime não foi encontrado.');
  }
}
