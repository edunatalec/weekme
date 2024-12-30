"use client";

import { useSession } from "@/contexts/SessionProvider";
import {
  AnimeEntity,
  PermissionEntity,
  RoleEntity,
  SeasonEntity,
  UserEntity,
} from "@repo/core";

export type Module = "users" | "roles" | "permissions" | "animes" | "seasons";
type Action = "view" | "create" | "update" | "delete";
type HandlePermission<M extends keyof Modules> =
  | string[]
  | ((user: UserEntity, data: Modules[M]["dataType"] | undefined) => boolean);

type Modules = {
  users: {
    dataType: UserEntity;
    action: Action;
  };
  roles: {
    dataType: RoleEntity;
    action: Action;
  };
  permissions: {
    dataType: PermissionEntity;
    action: "view" | "update";
  };
  animes: {
    dataType: AnimeEntity;
    action: Action;
  };
  seasons: {
    dataType: SeasonEntity;
    action: Action;
  };
};

const MODULES: {
  [M in keyof Modules]: {
    [A in Modules[M]["action"]]: HandlePermission<M>;
  };
} = {
  users: {
    view: ["users:view"],
    create: ["users:create"],
    update: ["users:update"],
    delete: ["users:delete"],
  },
  roles: {
    view: ["roles:view"],
    create: ["roles:create"],
    update: ["roles:update"],
    delete: ["roles:delete"],
  },
  permissions: {
    view: ["permissions:view"],
    update: ["permissions:update"],
  },
  animes: {
    view: ["animes:view"],
    create: ["animes:create"],
    update: ["animes:update"],
    delete: ["animes:delete"],
  },
  seasons: {
    view: ["seasons:view"],
    create: ["seasons:create"],
    update: ["seasons:update"],
    delete: ["seasons:delete"],
  },
};

interface HasPermissionProps<M extends keyof Modules> {
  module: M;
  action: Modules[M]["action"];
  data?: Modules[M]["dataType"];
}

type HasPermission = <M extends keyof Modules>(
  props: HasPermissionProps<M>,
) => boolean;

export const usePermission = (): {
  hasPermission: HasPermission;
} => {
  const { user } = useSession();

  const hasPermission: HasPermission = <M extends keyof Modules>({
    module,
    action,
    data,
  }: HasPermissionProps<M>): boolean => {
    if (!user) return false;

    const permissions = MODULES[module][action];

    if (Array.isArray(permissions)) {
      const requiredPermissions = [...permissions, "admin"];

      return user.roles.some((role) =>
        role.permissions.some((permission) =>
          requiredPermissions.includes(permission.identifier),
        ),
      );
    }

    return permissions(user, data);
  };

  return {
    hasPermission,
  };
};
