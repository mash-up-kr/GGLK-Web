import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";

import { UnheadProvider, createHead } from "@unhead/react/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "icon", href: "/favicon.ico" },
];

const META_TITLE = "OOTD";
const META_DESCRIPTION = "Roast your style! OOTD Roasting By GGLK";
const WEBSITE_URL = "https://ooootd.com";

export const meta: Route.MetaFunction = () => {
  return [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { title: META_TITLE },
    {
      name: "description",
      content: META_DESCRIPTION,
    },
    { name: "keywords", content: "OOTD, 매쉬업, Mashup, Roasting, Style" },
    { name: "author", content: "gglk" },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: WEBSITE_URL },
    { property: "og:title", content: META_TITLE },
    {
      property: "og:description",
      content: META_DESCRIPTION,
    },
    { property: "og:image", content: `${WEBSITE_URL}/og-image-800-400.png` },
    { property: "og:image:width", content: "800" },
    { property: "og:image:height", content: "400" },

    { property: "og:image", content: `${WEBSITE_URL}/og-image-1280-800.png` },
    { property: "og:image:width", content: "1280" },
    { property: "og:image:height", content: "800" },

    { property: "og:site_name", content: META_TITLE },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Create a client
const queryClient = new QueryClient();

const head = createHead();

export default function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <UnheadProvider head={head}>
          <Outlet />
        </UnheadProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
