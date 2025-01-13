import { zodResolver } from "@hookform/resolvers/zod";
import { SeasonEntity } from "@repo/core";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SeasonName = z.enum(["SPRING", "SUMMER", "FALL", "WINTER"], {
  message: "Obrigatório",
});

const schema = z.object({
  name: SeasonName,
  year: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number({ message: "Obrigatório" }).int().min(1900),
  ),
  show: z.boolean({ message: "Obrigatório" }),
});

export type SeasonFormData = z.infer<typeof schema>;

export const useSeasonForm = (season?: SeasonEntity) => {
  return useForm<SeasonFormData>({
    resolver: zodResolver(schema),
    defaultValues: season
      ? {
          name: season.name,
          year: season.year,
          show: season.show,
        }
      : {
          show: false,
        },
  });
};
