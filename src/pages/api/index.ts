import type { APIRoute } from "astro";

import { renderTrpcPanel } from "trpc-panel";
import router from "../../trpc";

export const get: APIRoute = ({}) => {
  try {
    return new Response(renderTrpcPanel(router, { url: "/api" }), {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (e) {
    return new Response((e as Error).message, { status: 500 });
  }
};
