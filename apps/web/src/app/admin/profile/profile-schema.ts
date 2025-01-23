import { fullNameValidator } from "@/validators/full-name";
import { optionalUrlValidator } from "@/validators/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserEntity } from "@repo/core";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  fullName: fullNameValidator,
  avatarUrl: optionalUrlValidator,
});

export type ProfileFormData = z.infer<typeof schema>;

export const useProfileForm = (user: UserEntity) => {
  return useForm<ProfileFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
    },
  });
};
