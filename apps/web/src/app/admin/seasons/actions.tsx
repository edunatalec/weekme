"use server";

import { SeasonFormData } from "@/app/admin/seasons/schema";
import http from "@/services/http/http";
import {
  FetchPageableItems,
  FetchPageableItemsProps,
} from "@/types/pagination.type";
import { Pageable, SeasonEntity } from "@repo/core";

export const fetchSeasons: FetchPageableItems = async <T = SeasonEntity,>({
  page,
  size,
  search,
}: FetchPageableItemsProps) => {
  const response = await http.request<Pageable<T>>({
    endpoint: "seasons",
    method: "GET",
    queryParams: {
      page: `${page}`,
      size: `${size}`,
      ...search,
    },
  });

  return response.data;
};

export const getSeasonById = async (id: string): Promise<SeasonEntity> => {
  const response = await http.request<SeasonEntity>({
    endpoint: "seasons/:id",
    method: "GET",
    params: { id },
  });

  return response.data;
};

export const createSeason = async (season: SeasonFormData): Promise<void> => {
  await http.request({
    endpoint: "seasons",
    method: "POST",
    body: season,
  });
};

export const updateSeason = async (
  id: string,
  season: SeasonFormData,
): Promise<void> => {
  await http.request({
    endpoint: "seasons/:id",
    method: "PATCH",
    body: season,
    params: { id },
  });
};
