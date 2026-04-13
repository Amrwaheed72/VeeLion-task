"use server";

import { ActionResponse } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

interface FetchOptions extends RequestInit {
  mapResponse?: (json: any) => any;
  onSuccess?: () => void;
}

export const serverActionWrapper = async <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<ActionResponse<T>> => {
  const { mapResponse, onSuccess, ...fetchOptions } = options;

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      return {
        data: null,
        error: errorPayload.message || `Request failed: ${response.statusText}`,
      };
    }
    const json = await response.json();
    const data = mapResponse ? mapResponse(json) : json;

    if (onSuccess) {
      onSuccess();
    }
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : String(error) || "Unexpected error occurred",
    };
  }
};
