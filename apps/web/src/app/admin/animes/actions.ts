"use server";

import { AnimeFormData } from "@/app/admin/animes/schema";
import http from "@/services/http/http";
import {
  FetchPageableItems,
  FetchPageableItemsProps,
} from "@/types/pagination.type";
import { AnimeEntity, Pageable } from "@repo/core";

export const fetchAnimes: FetchPageableItems = async <T = AnimeEntity>({
  page,
  size,
  search,
}: FetchPageableItemsProps) => {
  const response = await http.request<Pageable<T>>({
    endpoint: "animes",
    method: "GET",
    queryParams: {
      page: `${page}`,
      size: `${size}`,
      ...search,
    },
  });

  return response.data;
};

export const getAnimeById = async (id: string): Promise<AnimeEntity> => {
  const response = await http.request<AnimeEntity>({
    endpoint: "animes/:id",
    method: "GET",
    params: { id },
  });

  return response.data;
};

export const createAnime = async (anime: AnimeFormData) => {
  await http.request({
    endpoint: "animes",
    method: "POST",
    body: anime,
  });
};

export const updateAnime = async (id: string, anime: AnimeFormData) => {
  await http.request({
    endpoint: "animes/:id",
    method: "PATCH",
    body: anime,
    params: { id },
  });
};
