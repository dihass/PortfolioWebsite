import type { Metadata } from "next";
import { Spectral, Urbanist } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";
import PageIntro from "@/components/ui/PageIntro";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
  title: "Dihas Sathnindu — Software Engineer",
  description:
    "Software Engineer specialising in full-stack systems, backend optimisation, and mobile development. Open to junior SWE roles.",
  openGraph: {
    title: "Dihas Sathnindu — Software Engineer",
    description:
      "Software Engineer specialising in full-stack systems, backend optimisation, and mobile development.",
    images: [{ url: "/hero.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dihas Sathnindu — Software Engineer",
    description: "Software Engineer. Full stack, mobile, AI research.",
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spectral.variable} ${urbanist.variable}`}>
      <body>
        <PageIntro />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
