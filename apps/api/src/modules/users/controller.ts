import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Pageable, ProtectedResource, UserEntity } from '@repo/core';
import { RequiredResource } from 'src/core/decorators/required-resource.decorator';
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
  UpdateUserByIdParamDto,
} from 'src/modules/users/dtos/update.dto';
import {
  UserNotFoundException,
  UsersNotFoundException,
} from 'src/modules/users/exceptions';
import { SearchUsersQueryDto } from './dtos/search.dto';
import { UserService } from './service';
import { CurrentData } from 'src/core/decorators/current-data.decorator';

@ApiBearerAuth()
@ApiTags('Usuários')
@Controller('users')
@RequiredResource(ProtectedResource.USERS)
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
    return this.verifyUser(user);
  }

  @UpdateUserEndpoint()
  public async update(
    @CurrentData() user: UserEntity | undefined,
    @Param() _: UpdateUserByIdParamDto,
    @Body() body: UpdateUserBodyDto,
  ): Promise<UserEntity> {
    await this.verifyUser(user);

    return this.service.update(user.id, body);
  }

  @DeleteUserEndpoint()
  public async delete(
    @CurrentData() user: UserEntity | undefined,
    @Param() _: DeleteUserParamDto,
  ): Promise<void> {
    await this.verifyUser(user);

    await this.service.delete(user.id);
  }

  private async verifyUser(user: UserEntity | undefined): Promise<UserEntity> {
    if (user) return user;

    throw new UserNotFoundException();
  }
}
