import { Router } from "@oak/oak";
import swaggerJsDoc from "npm:swagger-jsdoc";

const swaggerTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Swagger UI</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css">
      </head>
      <body>
          <div id="swagger-ui"></div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js"></script>
          <script>
              window.onload = function() {
                  const ui = SwaggerUIBundle({
                      url: "/docs-json",
                      dom_id: '#swagger-ui',
                  });
              };
          </script>
      </body>
      </html>
    `;

const apiSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Learn.io DB Tools",
      version: "1.0.0",
    },
    components: {
      parameters: {
        AuthUsername: {
          name: "username",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "DB username",
        },
        AuthPassword: {
          name: "password",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "DB password",
        },
      },
    },
  },
  apis: [] as string[],
};

async function initializeSwagger(router: Router) {
  const swaggerSpecfile = await getSwaggerSpecFile();

  router.get("/docs", (ctx) => {
    ctx.response.type = "text/html";
    ctx.response.body = swaggerTemplate;
  });

  router.get("/docs-json", (ctx) => {
    ctx.response.body = swaggerSpecfile;
  });
}

async function getSwaggerSpecFile() {
  apiSpec.apis = await getAllTsFiles(Deno.cwd());
  return swaggerJsDoc(apiSpec);
}

async function getAllTsFiles(dir: string): Promise<string[]> {
  const entries: string[] = [];

  for await (const entry of Deno.readDir(dir)) {
    const fullPath = `${dir}/${entry.name}`;
    if (entry.isDirectory) {
      const subEntries = await getAllTsFiles(fullPath);
      entries.push(...subEntries);
    } else if (entry.isFile && entry.name.endsWith(".ts")) {
      entries.push(fullPath);
    }
  }

  return entries;
}

export const setupSwagger = initializeSwagger;
