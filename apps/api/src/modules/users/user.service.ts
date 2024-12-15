import { Injectable } from '@nestjs/common';
import {
  type ActivateUserArgs,
  type FindUserArgs,
  type FindUsersArgs,
  UserRepository,
} from 'src/core/database/repositories/user.repository';
import { UserEntity } from 'src/core/entities/user.entity';
import { Pageable } from 'src/core/interfaces/Pageable';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findUser(args: FindUserArgs): Promise<UserEntity> {
    return await this.userRepository.findUser(args);
  }

  public async findUsers(args: FindUsersArgs): Promise<Pageable<UserEntity>> {
    return await this.userRepository.findUsers(args);
  }

  public async activateUser(args: ActivateUserArgs): Promise<UserEntity> {
    return await this.userRepository.activateUser(args);
  }
}
