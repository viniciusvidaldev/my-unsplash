import { configure } from "@testing-library/react";
import { delay } from "./delay";

interface Options {
  body?: Object;
  headers?: HeadersInit | undefined;
  method?: string | undefined;
}

interface Config {
  noBodyJson?: boolean;
  noJsonHeader?: boolean;
}

class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  get(path: string, options?: Options, config?: Config) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    }, config);
  }

  post(path: string, options?: Options, config?: Config) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    }, config);
  }

  put(path: string, options?: Options, config?: Config) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    }, config);
  }

  delete(path: string, options?: Options, config?: Config) {
    return this.makeRequest(path, {
      method: 'DELETE',
      body: options?.body,
      headers: options?.headers,
    }, config);
  }

  async makeRequest(path: string, options: Options, config?: Config) {
    await delay(500);

    const headers = new Headers();

    if (options.body && !config?.noJsonHeader) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: config?.noJsonHeader ? options.body as any : JSON.stringify(options.body),
      headers,
    });

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new Error(responseBody.message);
  }
}

export default HttpClient;