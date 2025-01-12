import { zodResolver } from "@hookform/resolvers/zod";
import { RoleEntity } from "@repo/core";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string({ message: "Obrigatório" }),
  description: z.string({ message: "Obrigatório" }),
});

export type RoleFormData = z.infer<typeof schema>;

export const useRoleForm = (role?: RoleEntity) => {
  return useForm<RoleFormData>({
    resolver: zodResolver(schema),
    defaultValues: role
      ? {
          name: role.name,
          description: role.description,
        }
      : {},
  });
};
