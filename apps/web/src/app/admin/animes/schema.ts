import { optionalUrlValidator, urlValidator } from "@/validators/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimeEntity } from "@repo/core";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AnimeStatus = z.enum(["FINISHED", "RELEASING", "TO_RELEASE", "HIATUS"], {
  message: "Obrigatório",
});

const schema = z.object({
  name: z.string({ message: "Obrigatório" }),
  backgroundUrl: optionalUrlValidator,
  imageUrl: urlValidator,
  status: AnimeStatus,
  synopsis: z.string({ message: "Obrigatório" }),
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
  seasonIds: z.preprocess(
    (val) => ((val as string[]).length === 0 ? undefined : val),
    z.array(z.string()).nonempty().optional(),
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
          seasonIds: anime.seasons.map((season) => season.id),
        }
      : {
          seasonIds: [],
        },
  });
};
