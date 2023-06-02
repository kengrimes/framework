import type { APIRoute } from "astro";
import router from "../../trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export const all: APIRoute = ({ request }) =>
  fetchRequestHandler({
    endpoint: "/api",
    req: request,
    router,
    createContext: () => ({}),
    onError({ error }) {
      error.cause && console.error(error.cause);
      error.stack && console.error(error.stack);
      delete error.stack;
    },
  });
