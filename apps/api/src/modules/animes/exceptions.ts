import { ConflictException, NotFoundException } from '@nestjs/common';

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

export class AnimeAlreadyRegisteredException extends ConflictException {
  constructor() {
    super('Anime com esse nome já cadastrado.');
  }
}
