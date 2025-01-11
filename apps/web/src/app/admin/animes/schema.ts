import { urlValidator } from "@/validators/url.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimeEntity } from "@repo/core";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AnimeStatus = z.enum(["FINISHED", "RELEASING", "TO_RELEASE", "HIATUS"], {
  message: "Obrigatório",
});

const schema = z.object({
  name: z.string({ message: "Obrigatório" }).min(3),
  backgroundUrl: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z.string().url().optional(),
  ),
  imageUrl: urlValidator,
  status: AnimeStatus,
  synopsis: z.string({ message: "Obrigatório" }).min(3),
  weekday: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number({ message: "Obrigatório" }).int().min(0).max(6),
  ),
  startDate: z.preprocess(
    (val) => (val instanceof Date ? val.toISOString() : val),
    z.string().datetime().optional(),
  ),
  finishDate: z.preprocess(
    (val) => (val instanceof Date ? val.toISOString() : val),
    z.string().datetime().optional(),
  ),
});

export type AnimeFormData = z.infer<typeof schema>;

export const useAnimeForm = (anime?: AnimeEntity) => {
  return useForm<AnimeFormData>({
    resolver: zodResolver(schema),
    defaultValues: anime
      ? {
          name: anime.name,
          backgroundUrl: anime.backgroundUrl,
          imageUrl: anime.imageUrl,
          startDate: anime.startDate?.toString(),
          finishDate: anime.finishDate?.toString(),
          status: anime.status,
          synopsis: anime.synopsis,
          weekday: anime.weekday,
        }
      : {},
  });
};
