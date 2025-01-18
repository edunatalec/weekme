import http from "@/services/http/http";

export const fetchScheduleAnimes = async () => {
  const response = await http.request({
    endpoint: "schedule/animes",
    method: "GET",
  });

  return response.data;
};
