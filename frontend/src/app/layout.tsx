import { ErrorBoundary } from "@/components/common/atoms/error-boundary";
import ThemedToaster from "@/components/common/atoms/themed-toaster";
import QueryProvider from "@/providers/QueryProvider";
import SidebarProvider from "@/providers/SidebarProvider";
import { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { headers } from "next/headers";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Open SurferH",
    default: "Open SurferH",
  },
  description:
    "Open SurferH",

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Open SurferH - Try Now For Free",
    description: "The AI Agent that completes your tasks.",
  },

  // Additional metadata
  keywords: [
    "AI agent",
    "automation",
    "task completion",
    "AI assistant",
    "productivity",
    "workflow automation",
  ],
  authors: [{ name: "H Company" }],
  creator: "H Company",
  publisher: "H Company",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce")!;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Open SurferH</title>
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider nonce={nonce} attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <SidebarProvider>
              <div className="h-screen flex flex-col">
                <div className="flex-1 min-h-0 md:pb-0 pt-0">
                  <ErrorBoundary>{children}</ErrorBoundary>
                </div>
              </div>
            </SidebarProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
