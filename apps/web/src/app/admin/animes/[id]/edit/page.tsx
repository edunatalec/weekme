import { AnimeForm } from "@/app/admin/animes/_components/AnimeForm";
import { getAnimeById } from "@/app/admin/animes/actions";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const anime = await getAnimeById(id);

  return <AnimeForm anime={anime} />;
};

export default Page;
