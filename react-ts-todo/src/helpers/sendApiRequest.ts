type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export const BASE_URL: string = "http://localhost:4000";

function returnCorrectRequest(method: Method, data: unknown): RequestInit {
  if (method === "GET") {
    return {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
  }

  return {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  };
}

interface ErrorResponse {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export class ResponseError extends Error {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.name = "ResponseError";
    this.response = response;
  }
}

export async function sendApiRequest<T>(
  url: string,
  method: Method,
  data: unknown = {}
): Promise<T> {
  const res = await fetch(
    `${BASE_URL}${url}`,
    returnCorrectRequest(method, data)
  );

  if (!res.ok) {
    let errorResponse: { error?: ErrorResponse[] | string } = {};
    try {
      errorResponse = await res.json();
    } catch (error) {
      throw new ResponseError("API request failed", res);
    }

    if (Array.isArray(errorResponse.error)) {
      const errorMessage = errorResponse.error
        .map((error: ErrorResponse) => error.msg)
        .join(", ");

      throw new ResponseError(errorMessage, res);
    } else if (typeof errorResponse.error === "string") {
      throw new ResponseError(errorResponse.error, res);
    } else {
      throw new ResponseError("API request failed", res);
    }
  }

  return (await res.json()) as Promise<T>;
}
