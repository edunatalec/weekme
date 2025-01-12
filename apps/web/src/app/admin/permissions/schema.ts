import { zodResolver } from "@hookform/resolvers/zod";
import { PermissionEntity } from "@repo/core";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string({ message: "Obrigatório" }),
  description: z.string({ message: "Obrigatório" }),
});

export type PermissionFormData = z.infer<typeof schema>;

export const usePermissionForm = (permission?: PermissionEntity) => {
  return useForm<PermissionFormData>({
    resolver: zodResolver(schema),
    defaultValues: permission
      ? {
          name: permission.name,
          description: permission.description,
        }
      : {},
  });
};
