import { AnimeForm } from "@/app/admin/animes/_components/AnimeForm";
import { getById } from "@/services/crud/service";
import { getPageTitle } from "@/utils/metadata";
import { AnimeEntity, ProtectedResource } from "@repo/core";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Editar anime"),
};

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
