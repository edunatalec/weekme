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

export interface HttpResquest {
  readonly method: "GET" | "POST" | "PATCH" | "DELETE";
  readonly endpoint: string;
  readonly body?: any;
  readonly params?: { [key: string]: string };
  readonly queryParams?: { [key: string]: string };
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
