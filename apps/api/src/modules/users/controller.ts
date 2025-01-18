import { Body, Param, Query } from '@nestjs/common';
import { Pageable, UserEntity } from '@repo/core';
import { CurrentData } from 'src/core/decorators/current-data';
import {
  DeleteUserEndpoint,
  GetUserByIdEndpoint,
  SearchUsersEndpoint,
  UpdateUserEndpoint,
  UserControllerDecorators,
} from 'src/modules/users/decorators';
import { DeleteUserParamDto } from 'src/modules/users/dtos/delete';
import { GetUserByIdParamDto } from 'src/modules/users/dtos/get-by-id';
import {
  UpdateUserBodyDto,
  UpdateUserByIdParamDto,
} from 'src/modules/users/dtos/update';
import {
  UserNotFoundException,
  UsersNotFoundException,
} from 'src/modules/users/exceptions';
import { SearchUsersQueryDto } from './dtos/search';
import { UserService } from './service';

@UserControllerDecorators()
export class UserController {
  constructor(private readonly service: UserService) {}

  @SearchUsersEndpoint()
  public async search(
    @Query() query: SearchUsersQueryDto,
  ): Promise<Pageable<UserEntity>> {
    const response = await this.service.search(query);

    if (response) return response;

    throw new UsersNotFoundException();
  }

  @GetUserByIdEndpoint()
  public async getById(
    @CurrentData() user: UserEntity | undefined,
    @Param() _: GetUserByIdParamDto,
  ): Promise<UserEntity | null> {
    return this.validate(user);
  }

  @UpdateUserEndpoint()
  public async update(
    @CurrentData() user: UserEntity | undefined,
    @Param() _: UpdateUserByIdParamDto,
    @Body() body: UpdateUserBodyDto,
  ): Promise<UserEntity> {
    await this.validate(user);

    return this.service.update(user!.id, body);
  }

  @DeleteUserEndpoint()
  public async delete(
    @CurrentData() user: UserEntity | undefined,
    @Param() _: DeleteUserParamDto,
  ): Promise<void> {
    await this.validate(user);

    await this.service.delete(user!.id);
  }

  private async validate(user: UserEntity | undefined): Promise<UserEntity> {
    if (user) return user;

    throw new UserNotFoundException();
  }
}
