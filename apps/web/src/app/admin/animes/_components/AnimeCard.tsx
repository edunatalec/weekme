import { AnimeEntity, getWeekdayName } from "@repo/core";
import Image from "next/image";
import Link from "next/link";

interface Props {
  anime: AnimeEntity;
}

export const AnimeCard = ({ anime }: Props) => {
  return (
    <Link
      href={`animes/${anime.id}/edit`}
      className="flex flex-col gap-1 transition-transform duration-300 ease-in-out hover:scale-[1.03]"
    >
      <div className="relative h-[270px] w-full">
        <Image
          src={anime.imageUrl}
          layout="fill"
          width={0}
          height={0}
          alt={`Foto do anime ${anime.name}`}
          className="rounded-md"
          objectFit="cover"
        />
      </div>

      <span className="line-clamp-2 min-h-12">{anime.name}</span>
      <div className="flex justify-between text-xs text-foreground/60">
        <span>{getWeekdayName(anime.weekday)}</span>
        {anime.startDate && (
          <span>{new Date(anime.startDate).getFullYear()}</span>
        )}
      </div>
    </Link>
  );
};
