import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Flexible API helper supporting both apiRequest(url, init) and apiRequest(method, url, data)
export async function apiRequest(
  arg1: string,
  arg2?: string | RequestInit,
  arg3?: unknown,
): Promise<Response> {
  let url: string;
  let init: RequestInit | undefined;

  if (typeof arg2 === "string") {
    // Signature: (method, url, data?)
    const method = arg1;
    url = arg2;
    const data = arg3;
    init = {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    };
  } else {
    // Signature: (url, init?)
    url = arg1;
    init = {
      credentials: "include",
      ...(arg2 || {}),
    } as RequestInit;
  }

  const res = await fetch(url, init);
  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Support queryKey in the form: [url, params?]
    const [rawUrl, rawParams] = queryKey as [string, Record<string, unknown> | undefined];
    const urlObj = new URL((rawUrl as string) || "", window.location.origin);
    if (rawParams && typeof rawParams === "object") {
      Object.entries(rawParams)
        .filter(([, v]) => v !== undefined && v !== null && v !== "")
        .forEach(([k, v]) => urlObj.searchParams.set(k, String(v)));
    }

    const res = await fetch(urlObj.pathname + (urlObj.search || ""), {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
