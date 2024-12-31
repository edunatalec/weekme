"use client";

import { useSession } from "@/contexts/SessionProvider";
import { hasPermission, TypedModules } from "@repo/core";

interface HasPermissionProps<Module extends keyof TypedModules> {
  module: Module;
  action: TypedModules[Module]["action"];
  data?: TypedModules[Module]["dataType"];
}

type HasPermission = <Module extends keyof TypedModules>(
  props: HasPermissionProps<Module>,
) => boolean;

export const usePermission = (): {
  hasPermission: HasPermission;
} => {
  const { user } = useSession();

  return {
    hasPermission: <M extends keyof TypedModules>({
      module,
      action,
      data,
    }: HasPermissionProps<M>) => hasPermission({ action, module, data, user }),
  };
};
