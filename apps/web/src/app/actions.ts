import http from "@/services/http/http";
import { Schedule } from "@repo/core";

export const fetchScheduleAnimes = async (): Promise<Schedule[]> => {
  const response = await http.request<Schedule[]>({
    endpoint: "schedule/animes",
    method: "GET",
  });

  return response.data;
};
