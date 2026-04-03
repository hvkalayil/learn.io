import { type PageProps } from "$fresh/server.ts";
import { API_URL } from "../config.ts";
import { ConfigSyncer } from "../islands/ConfigSyncer.tsx";

export default function App({ Component }: PageProps) {
  const config = {
    API_URL: API_URL,
  };
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Learn.io | Master Your Future</title>
        <meta
          name="description"
          content="Discover, teach, and master new skills with Learn.io - the premium educational platform for curious minds."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles.css" />

        <link rel="icon" href="/favicon.ico" />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className="antialiased text-white bg-primary selection:bg-accent/30 selection:text-white min-h-screen font-sans">
        <div className="fixed inset-0 bg-mesh-gradient opacity-40 -z-10 pointer-events-none" />
        <ConfigSyncer config={config} />
        <div className="relative z-0 flex flex-col min-h-screen">
          <Component />
          <footer className="mt-auto py-12 px-6 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-2xl font-bold tracking-tighter">
                Learn<span className="text-accent ring-accent">.io</span>
              </div>
              <p className="text-white/40 text-sm font-mono leading-7">
                Built with precision by{" "}
                <a
                  href="http://hvkalayil.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-accent transition-colors underline decoration-accent/30 underline-offset-4"
                >
                  HVK
                </a>
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
