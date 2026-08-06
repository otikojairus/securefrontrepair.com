import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";
import { SITE_NAME, absoluteUrl, getSiteUrl } from "@/lib/site-data";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["600", "700", "800"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} | Commercial Doors, Storefront Glass & Vandalism Response`,
    template: "%s",
  },
  description:
    "Emergency commercial door repair, storefront glass replacement and graffiti & vandalism cleanup across Canada. 24/7 dispatch.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | Doors, Glass & Vandalism Response`,
    description: "Emergency property response for commercial doors, storefront glass and vandalism cleanup across Canada.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${manrope.variable} ${sora.variable}`}>
      <body>
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
