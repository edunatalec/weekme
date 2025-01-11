import { SeasonsForm } from "@/app/admin/seasons/_components/SeasonsForm";
import { getSeasonById } from "@/app/admin/seasons/actions";
import React from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const season = await getSeasonById(id);

  return <SeasonsForm season={season} />;
};

export default Page;
