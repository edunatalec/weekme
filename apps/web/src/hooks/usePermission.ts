"use client";

import { useSession } from "@/contexts/SessionProvider";
import { hasPermission, ResourceMap } from "@repo/core";

interface HasPermissionProps<Resource extends keyof ResourceMap> {
  resource: Resource;
  action: ResourceMap[Resource]["action"];
  data?: ResourceMap[Resource]["dataType"];
}

type HasPermission = <Resource extends keyof ResourceMap>(
  props: HasPermissionProps<Resource>,
) => boolean;

export const usePermission = (): {
  hasPermission: HasPermission;
} => {
  const { user } = useSession();

  return {
    hasPermission: <Resource extends keyof ResourceMap>({
      resource,
      action,
      data,
    }: HasPermissionProps<Resource>) =>
      hasPermission({ action, resource, data, user }),
  };
};
