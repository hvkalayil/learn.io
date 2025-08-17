import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const { guideId } = ctx.params;
    return Response.redirect(
      new URL(`/guides/${guideId}/pages/1`, req.url),
      307,
    );
  },
};

export default () => null;
