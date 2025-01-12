import { AnimeForm } from "@/app/admin/animes/_components/AnimeForm";
import { getById } from "@/services/crud/service";
import { AnimeEntity, ProtectedResource } from "@repo/core";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const anime = await getById<AnimeEntity>({
    id,
    resource: ProtectedResource.ANIMES,
  });

  return <AnimeForm anime={anime} />;
};

export default Page;
