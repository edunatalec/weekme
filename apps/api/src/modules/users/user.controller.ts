import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ListUsersByDto } from './dtos/list-users-by.dto';
import { UserService } from './user.service';
import { UserEntity } from 'src/core/entities/user.entity';
import { Pageable } from 'src/core/interfaces/Pageable';
import { ActivateUserDto } from './dtos/active-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private readonly roleService: RoleService,
  ) {}

  // @Patch('edit-role')
  // public async editRole(@Body() body: any): Promise<any> {}

  @Post('activate')
  public async activateUser(
    @Body() body: ActivateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userService.findUser({ id: body.userId });

    if (!user) {
      // TODO: criar exceção customizada
      throw new ConflictException('Usuário não cadastrado...');
    }

    return await this.userService.activateUser(body);
  }

  @Get()
  public async listUsersBy(
    @Query() params: ListUsersByDto,
  ): Promise<Pageable<UserEntity>> {
    // TODO: adicionar validação para page e size negativos
    // TODO: adicionra validação para max_page_size (100 talvez)
    const name = params.name ?? '';
    const page = parseInt(params?.page ?? '1', 10);
    const size = parseInt(params?.size ?? '10', 10);

    return await this.userService.findUsers({ name, page, size });
  }
}
