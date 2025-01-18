import { fullNameValidator } from "@/validators/full-name";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserEntity } from "@repo/core";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  fullName: fullNameValidator,
  roleIds: z.preprocess(
    (val) => ((val as string[]).length === 0 ? undefined : val),
    z.array(z.string()).nonempty().optional(),
  ),
});

export type UserFormData = z.infer<typeof schema>;

export const useUserForm = (user?: UserEntity) => {
  return useForm<UserFormData>({
    resolver: zodResolver(schema),
    defaultValues: user
      ? {
          fullName: user.fullName,
          roleIds: user.roles.map((role) => role.id),
        }
      : {
          roleIds: [],
        },
  });
};
