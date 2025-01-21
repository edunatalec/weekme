import { SeasonsForm } from "@/app/admin/seasons/_components/SeasonsForm";
import { getById } from "@/services/crud/service";
import { getPageTitle } from "@/utils/metadata";
import { ProtectedResource, SeasonEntity } from "@repo/core";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: getPageTitle("Editar temporada"),
};

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const season = await getById<SeasonEntity>({
    id,
    resource: ProtectedResource.SEASONS,
  });

  return <SeasonsForm season={season} />;
};

export default Page;
