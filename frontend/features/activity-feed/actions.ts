"use server";

import { ActionResponse, ActivityLog } from "@/types/api";
import { revalidateTag } from "next/cache";

export const refetchAction = (tag: string) => {
  return revalidateTag(tag);
};

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export const getActivity = async (): Promise<ActionResponse<ActivityLog[]>> => {
  try {
    const response = await fetch(`${BASE_URL}/activity`, {
      method: "GET",
      next: { tags: ["activity-feed"], revalidate: 5000 },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      return {
        data: null,
        error:
          errorPayload.message || `Failed to load data: ${response.statusText}`,
      };
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : String(error) || "Un expected error occurred",
    };
  }
};
