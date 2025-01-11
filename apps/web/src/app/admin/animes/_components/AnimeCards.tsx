import { AnimeCard } from "@/app/admin/animes/_components/AnimeCard";
import { AnimeEntity } from "@repo/core";

interface Props {
  readonly animes: AnimeEntity[];
}

export const AnimeCards = ({ animes }: Props) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
      {animes.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
};
