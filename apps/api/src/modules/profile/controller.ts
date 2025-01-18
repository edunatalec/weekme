import { Body } from '@nestjs/common';
import { UserEntity } from '@repo/core';
import { CurrentUser } from 'src/core/decorators/current-user';
import {
  GetProfileEndpoint,
  ProfileControllerDecorators,
  UpdateProfileEndpoint,
} from 'src/modules/profile/decorators';
import { UpdateProfileBodyDto } from 'src/modules/profile/dtos/update';
import { ProfileService } from 'src/modules/profile/service';

@ProfileControllerDecorators()
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @GetProfileEndpoint()
  public async get(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @UpdateProfileEndpoint()
  public async update(
    @CurrentUser() user: UserEntity,
    @Body() body: UpdateProfileBodyDto,
  ): Promise<UserEntity> {
    return this.service.update(user.id, body);
  }
}
