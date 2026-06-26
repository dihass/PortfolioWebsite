import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Silkscreen } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";
import PageIntro from "@/components/ui/PageIntro";

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
    "Software Engineer specialising in full-stack systems, backend optimisation, and mobile development. Open to junior SWE roles.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Dihas Sathnindu — Software Engineer",
    description:
      "Software Engineer specialising in full-stack systems, backend optimisation, and mobile development.",
    type: "website",
    url: "https://dihassathnindu.com",
    siteName: "Dihas Sathnindu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dihas Sathnindu — Software Engineer",
    description: "Software Engineer. Full stack, mobile, AI research.",
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
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable} ${silkscreen.variable}`}>
      <head>
        {/* Always start at the top on load/refresh */}
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration='manual';window.scrollTo(0,0);" }} />
      </head>
      <body>
        <PageIntro />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
