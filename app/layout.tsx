import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Silkscreen } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import ClientShell from "@/components/ui/ClientShell";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silkscreen",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dihassathnindu.com"),
  icons: { icon: "/favicon.svg" },
  title: "Dihas Sathnindu — Software Engineer",
  description:
    "First Class Computer Science graduate and Software Engineer specialising in enterprise systems, backend optimisation, real-time platforms, and AI research.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Dihas Sathnindu — Software Engineer",
    description:
      "First Class Computer Science graduate specialising in enterprise systems, backend optimisation, real-time platforms, and AI research.",
    type: "website",
    url: "https://dihassathnindu.com",
    siteName: "Dihas Sathnindu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dihas Sathnindu — Software Engineer",
    description: "First Class CS graduate. Enterprise, backend, real-time, and AI systems.",
  },
  alternates: {
    canonical: "https://dihassathnindu.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${jakarta.variable} ${silkscreen.variable}`}>
      <head>
        {/* Always start at the top on load/refresh */}
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration='manual';window.scrollTo(0,0);" }} />
      </head>
      <body>
        <ThemeProvider>
          <ClientShell />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
