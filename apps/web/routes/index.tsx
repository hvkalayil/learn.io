import { Handlers, PageProps } from "$fresh/server.ts";
import { apiFetch } from "../lib/http.ts";

const handler: Handlers = {
  async GET(_, ctx) {
    try {
      const result = await apiFetch("/health", "GET");
      return ctx.render(result);
    } catch (error) {
      console.log(error);
      return new Response("Failed to call the Almighty API", { status: 500 });
    }
  },
};

export default function Home({ data }: PageProps) {
  console.log(data);
  return <h1>Hello World. I am {`${data.health}`}</h1>;
}

export { handler };
