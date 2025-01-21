"use server";

import { SeasonsForm } from "@/app/admin/seasons/_components/SeasonsForm";
import { getById } from "@/services/crud/service";
import { ProtectedResource, SeasonEntity } from "@repo/core";

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
