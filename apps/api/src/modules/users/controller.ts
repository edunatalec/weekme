import { Body, Controller, Param, Query } from '@nestjs/common';
import { UserEntity } from '@repo/core';
import { Pageable } from 'src/core/interfaces/pageable';
import {
  DeleteUserEndpoint,
  GetUserByIdEndpoint,
  SearchUsersEndpoint,
  UpdateUserEndpoint,
} from 'src/modules/users/decorators';
import { DeleteUserParamDto } from 'src/modules/users/dtos/delete.dto';
import { GetUserByIdParamDto } from 'src/modules/users/dtos/get-by-id.dto';
import {
  UpdateUserBodyDto,
  UpdateUserParamDto,
} from 'src/modules/users/dtos/update.dto';
import {
  UserNotFoundException,
  UsersNotFoundException,
} from 'src/modules/users/exceptions';
import { SearchUsersQueryDto } from './dtos/search.dto';
import { UserService } from './service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @SearchUsersEndpoint()
  public async search(
    @Query() query: SearchUsersQueryDto,
  ): Promise<Pageable<UserEntity>> {
    const response = await this.service.search(query);

    if (!response) {
      throw new UsersNotFoundException();
    }

    return response;
  }

  @GetUserByIdEndpoint()
  public async getById(
    @Param() param: GetUserByIdParamDto,
  ): Promise<UserEntity | null> {
    return this.verifyUserById(param.id);
  }

  @UpdateUserEndpoint()
  public async update(
    @Param() param: UpdateUserParamDto,
    @Body() body: UpdateUserBodyDto,
  ): Promise<UserEntity> {
    await this.verifyUserById(param.id);

    return this.service.update(param.id, body);
  }

  @DeleteUserEndpoint()
  public async delete(@Param() param: DeleteUserParamDto): Promise<void> {
    await this.verifyUserById(param.id);

    await this.service.delete(param.id);
  }

  private async verifyUserById(id: string): Promise<UserEntity> {
    const user = await this.service.getById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
