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
      }

      return response;
    });
  }

  public async request(data: HttpResquest): Promise<HttpResponse> {
    let response: HttpResponse;

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
        data: response.data,
        message: response.data["message"],
        statusCode: response.statusCode,
      });
    }

    return response;
  }

  private async get(data: HttpResquest): Promise<HttpResponse> {
    const response = await this.instance.get(data.endpoint, {
      params: data.queryParams,
    });

    return this.buildResponse(response);
  }

  private async post(data: HttpResquest): Promise<HttpResponse> {
    const response = await this.instance.post(data.endpoint, data.body, {
      params: data.queryParams,
    });

    return this.buildResponse(response);
  }

  private async patch(data: HttpResquest): Promise<HttpResponse> {
    const response = await this.instance.patch(data.endpoint, data.body, {
      params: data.queryParams,
    });

    return this.buildResponse(response);
  }

  private async delete(data: HttpResquest): Promise<HttpResponse> {
    const response = await this.instance.delete(data.endpoint, {
      params: data.queryParams,
    });

    return this.buildResponse(response);
  }

  private buildResponse(response: AxiosResponse): HttpResponse {
    return {
      data: response.data,
      statusCode: response.status,
    };
  }
}
