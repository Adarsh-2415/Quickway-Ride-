import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers";
import { SITE_CONFIG } from "@/constants/siteConfig";
import { MainLayoutWrapper } from "@/components/layout/MainLayoutWrapper";

const outfitFont = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const plusJakartaSansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.seoDefaults.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.seoDefaults.description,
  metadataBase: new URL(SITE_CONFIG.seoDefaults.url),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: SITE_CONFIG.seoDefaults.title,
    description: SITE_CONFIG.seoDefaults.description,
    url: SITE_CONFIG.seoDefaults.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.seoDefaults.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfitFont.variable} ${plusJakartaSansFont.variable}`}
    >
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-amber-500 selection:text-slate-900 flex flex-col justify-between">
        <AppProviders>
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
        </AppProviders>
      </body>
    </html>
  );
}
