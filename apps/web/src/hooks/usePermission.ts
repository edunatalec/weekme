"use client";

import { useSession } from "@/contexts/SessionProvider";
import { hasPermission, ResourceMap } from "@repo/core";

export const usePermission = <Resource extends keyof ResourceMap>(
  resource: Resource,
) => {
  const { user } = useSession();

  return {
    hasPermission: (
      action: ResourceMap[Resource]["action"],
      data?: ResourceMap[Resource]["dataType"],
    ) => hasPermission({ action, resource, data, user }),
  };
};
