// import { RoleEntity } from './role.entity';

type UserEntityArguments = {
  id: string;
  fullName: string;
  email: string;
  active: boolean;
  password?: string;
  avatarUrl?: string;
  // role?: RoleEntity;
};

export class UserEntity {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly active: boolean;
  readonly password?: string;
  readonly avatarUrl?: string;
  // readonly role?: RoleEntity;

  constructor(readonly args: UserEntityArguments) {
    this.id = args.id;
    this.fullName = args.fullName;
    this.email = args.email;
    this.active = args.active;
    this.avatarUrl = args.avatarUrl;
    this.password = args.password;
    // this.role = args.role;
  }
}
