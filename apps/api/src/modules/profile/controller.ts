import { Body } from '@nestjs/common';
import { UserEntity } from '@repo/core';
import { CurrentUser } from 'src/core/decorators/current-user';
import {
  GetProfileEndpoint,
  ProfileControllerDecorators,
  UpdateProfileEndpoint,
  UpdateProfilePasswordEndpoint,
} from 'src/modules/profile/decorators';
import { UpdateProfileBodyDto } from 'src/modules/profile/dtos/update';
import { UpdateProfilePasswordBodyDto } from 'src/modules/profile/dtos/update-password';
import { PasswordInvalidException } from 'src/modules/profile/exceptions';
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

  @UpdateProfilePasswordEndpoint()
  public async updatePassword(
    @CurrentUser() user: UserEntity,
    @Body() body: UpdateProfilePasswordBodyDto,
  ): Promise<void> {
    const isPasswordValid = await this.service.validatePassword(user.id, body);

    if (isPasswordValid) {
      await this.service.updatePassword(user.id, body);
    } else {
      throw new PasswordInvalidException();
    }
  }
}
