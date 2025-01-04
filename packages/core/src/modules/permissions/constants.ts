export type CrudAction = 'view' | 'create' | 'update' | 'delete';

export enum ProtectedResource {
  USERS = 'users',
  ROLES = 'roles',
  PERMISSIONS = 'permissions',
  ANIMES = 'animes',
  SEASONS = 'seasons',
}
