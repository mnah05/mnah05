import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$")({
  beforeLoad: ({ params }) => {
    const splat = (params as { _splat?: string })._splat ?? "";
    throw redirect({ href: `/notes${splat ? `/${splat}` : ""}` });
  },
});
