"use server";

import http from "@/services/http/http";
import { Pageable, ProtectedResource } from "@repo/core";

interface SearchParams {
  resource: ProtectedResource;
  page: number;
  size: number;
  filters: { [key: string]: string };
}

export const search = async <T>({
  resource,
  page,
  size,
  filters,
}: SearchParams): Promise<Pageable<T>> => {
  const response = await http.request<Pageable<T>>({
    endpoint: resource,
    method: "GET",
    queryParams: {
      page: `${page}`,
      size: `${size}`,
      ...filters,
    },
  });

  return response.data;
};

interface GetByIdParams {
  resource: ProtectedResource;
  id: string;
}

export const getById = async <T>({
  id,
  resource,
}: GetByIdParams): Promise<T> => {
  const response = await http.request<T>({
    endpoint: `${resource}/:id`,
    method: "GET",
    params: { id },
  });

  return response.data;
};

interface CreateParams {
  resource: ProtectedResource;
  data: any;
}

export const create = async ({
  data,
  resource,
}: CreateParams): Promise<void> => {
  await http.request({
    endpoint: resource,
    method: "POST",
    body: data,
  });
};

interface UpdateParams {
  resource: ProtectedResource;
  data: any;
  id: string;
}

export const update = async ({
  id,
  data,
  resource,
}: UpdateParams): Promise<void> => {
  await http.request({
    endpoint: `${resource}/:id`,
    method: "PATCH",
    body: data,
    params: { id },
  });
};

interface RemoveParams {
  resource: ProtectedResource;
  id: string;
}

export const remove = async ({ id, resource }: RemoveParams): Promise<void> => {
  await http.request({
    endpoint: `${resource}/:id`,
    method: "DELETE",
    params: { id },
  });
};
