import { type PageProps } from "$fresh/server.ts";
import { API_URL } from "../config.ts";
import { ConfigSyncer } from "../islands/ConfigSyncer.tsx";

export default function App({ Component }: PageProps) {
  const config = {
    API_URL: API_URL,
  };
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Learn.io</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="text-white bg-secondary shadow-[0px_0px_1000px_#2bc9ed14_inset]">
        <ConfigSyncer config={config} />
        <Component />

        <footer className="font-mono text-center">
          <p>
            <a
              href="http://hvkalayil.github.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              By HVK
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
