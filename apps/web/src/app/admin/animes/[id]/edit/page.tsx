"use client";

import { AnimeForm } from "@/app/admin/animes/_components/AnimeForm";
import { getAnimeById } from "@/app/admin/animes/actions";
import { AnimeEntity } from "@repo/core";
import { isRedirectError } from "next/dist/client/components/redirect";
import React, { useEffect, useRef, useState } from "react";

const Page = ({ params }: { params: any }) => {
  const { id }: { id: string } = React.use(params);
  const [loading, setLoading] = useState<boolean>(true);

  const anime = useRef<AnimeEntity>();

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        anime.current = await getAnimeById(id);
      } catch (error) {
        if (isRedirectError(error)) throw error;
      }

      setLoading(false);
    })();
  }, []);

  if (loading) return <div>loading...</div>;

  return <AnimeForm anime={anime.current} />;
};

export default Page;
