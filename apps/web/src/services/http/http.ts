/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosProvider } from "@/services/http/axios.provider";

export class HttpError extends Error {
  public statusCode: number;
  public data: any;

  constructor({
    statusCode,
    message,
    data,
  }: {
    message: string;
    statusCode: number;
    data: any;
  }) {
    super(message);

    this.statusCode = statusCode;
    this.data = data;
  }
}

export class HttpResquest {
  public method: "GET" | "POST" | "PATCH" | "DELETE";
  public endpoint: string;
  public body?: any;
  public params?: { [key: string]: string };
  public queryParams?: { [key: string]: string };

  constructor({ method, endpoint, body, params, queryParams }: HttpResquest) {
    this.method = method;
    this.body = body;
    this.params = params;
    this.queryParams = queryParams;

    if (params) {
      for (const key in params) {
        endpoint.replace(`:${key}`, params[key]);
      }

      this.endpoint = endpoint;
    } else {
      this.endpoint = endpoint;
    }
  }
}

export interface HttpResponse<T> {
  statusCode: number;
  data: T;
}

export abstract class HttpProvider {
  abstract request<T = any>(data: HttpResquest): Promise<HttpResponse<T>>;
}

const http = new AxiosProvider();

export default http;
