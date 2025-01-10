import {
  HttpError,
  HttpProvider,
  HttpResponse,
  HttpResquest,
} from "@/services/http/http";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export class AxiosProvider implements HttpProvider {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    });

    this.instance.interceptors.request.use(async (config) => {
      const token = (await cookies()).get("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token.value}`;
      }

      if (process.env.NODE_ENV === "development") {
        const info = {
          url: `${config.baseURL}/${config.url}`,
          token: token?.value,
          queryParams: config.params,
          body: config.data,
        };

        console.log("### Request ###");
        console.log(info);
        console.log();
      }

      return config;
    });

    this.instance.interceptors.response.use(async (response) => {
      if (process.env.NODE_ENV === "development") {
        const info = {
          statusCode: response.status,
          data: response.data,
        };

        console.log("### Response ###");
        console.log(info);
        console.log();
      }

      if (response.status === 401) {
        const token = (await cookies()).get("token");

        if (token) redirect("/sign-in?logout");
      } else if (response.status === 403) {
        redirect("/admin");
      }

      return response;
    });
  }

  public async request<T = any>(data: HttpResquest): Promise<HttpResponse<T>> {
    if (data.params) {
      let endpoint = data.endpoint;

      for (const key in data.params) {
        endpoint = endpoint.replace(`:${key}`, data.params[key]);
      }

      data = {
        ...data,
        endpoint,
      };
    }

    let response: HttpResponse<T>;

    switch (data.method) {
      case "GET":
        response = await this.get(data);
        break;
      case "POST":
        response = await this.post(data);
        break;
      case "PATCH":
        response = await this.patch(data);
        break;
      case "DELETE":
        response = await this.delete(data);
        break;
    }

    if (response.statusCode >= 400) {
      throw new HttpError({
        data: response.data as any,
        message: (response.data as any)["message"],
        statusCode: response.statusCode,
      });
    }

    return response;
  }

  private async get<T>(data: HttpResquest): Promise<HttpResponse<T>> {
    const response = await this.instance.get(data.endpoint, {
      params: data.queryParams,
    });

    return this.buildResponse(response);
  }

  private async post<T>(data: HttpResquest): Promise<HttpResponse<T>> {
    const response = await this.instance.post(data.endpoint, data.body, {
      params: data.queryParams,
    });

    return this.buildResponse(response);
  }

  private async patch<T>(data: HttpResquest): Promise<HttpResponse<T>> {
    const response = await this.instance.patch(data.endpoint, data.body, {
      params: data.queryParams,
    });

    return this.buildResponse(response);
  }

  private async delete<T>(data: HttpResquest): Promise<HttpResponse<T>> {
    const response = await this.instance.delete(data.endpoint, {
      params: data.queryParams,
    });

    return this.buildResponse(response);
  }

  private buildResponse<T>(response: AxiosResponse): HttpResponse<T> {
    return {
      data: response.data,
      statusCode: response.status,
    };
  }
}
