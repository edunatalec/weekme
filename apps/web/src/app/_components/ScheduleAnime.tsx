import { AnimeEntity } from "@repo/core";
import Image from "next/image";

interface Props {
  anime: AnimeEntity;
}

export const ScheduleAnime = ({ anime }: Props) => {
  return (
    <div
      key={anime.id}
      className="relative h-[260px] overflow-hidden rounded-md"
    >
      <Image
        src={anime.imageUrl}
        layout="fill"
        width={0}
        height={0}
        alt={`Foto do anime ${anime.name}`}
        objectFit="cover"
      />
      <div className="absolute inset-0 z-10 flex flex-col gap-2 overflow-visible bg-card/80 opacity-0 backdrop-blur-sm transition-opacity hover:opacity-100">
        <span className="px-2 text-lg font-bold">{anime.name}</span>
        <span className="overflow-y-auto px-2 pb-2 text-sm">
          {anime.synopsis}
        </span>
      </div>
    </div>
  );
};
