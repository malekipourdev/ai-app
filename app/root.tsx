import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { LanguageProvider } from "./i18n/LanguageContext";
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
  // Favicon links
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  {
    rel: "icon",
    href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><rect width='16' height='16' rx='3' fill='%234f46e5'/><circle cx='4' cy='4' r='1.5' fill='%2322c55e'/><circle cx='12' cy='12' r='1.5' fill='%23ef4444'/><path d='M4 4 L8 4 L8 8 L12 8 L12 12' stroke='%23fbbf24' stroke-width='1.5' fill='none' stroke-linecap='round'/><circle cx='10' cy='6' r='1.5' stroke='%23ffffff' stroke-width='0.8' fill='none'/><path d='m11.2 7.2 1 1' stroke='%23ffffff' stroke-width='0.8' stroke-linecap='round'/></svg>",
    type: "image/svg+xml",
  },
  { rel: "apple-touch-icon", href: "/icon-48.svg", sizes: "48x48" },
  { rel: "shortcut icon", href: "/favicon.svg" },
  // PWA manifest
  { rel: "manifest", href: "/manifest.json" },
];

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

export default function App() {
  return (
    <LanguageProvider>
      <Outlet />
    </LanguageProvider>
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
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
