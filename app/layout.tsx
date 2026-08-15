import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — API Discovery & Playground Platform`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: ["API Discovery", "API Playground", "REST API", "HTTP Client", "Developer Tools"],
  authors: [{ name: "Requestly Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-background-primary text-text-primary antialiased selection:bg-accent-blue-muted selection:text-brand-black">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
