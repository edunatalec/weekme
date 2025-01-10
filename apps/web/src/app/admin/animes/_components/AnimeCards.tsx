import { AnimeCard } from "@/app/admin/animes/_components/AnimeCard";
import { AnimeEntity } from "@repo/core";

interface Props {
  readonly animes: AnimeEntity[];
}

export const AnimeCards = ({ animes }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
      {animes.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
};
