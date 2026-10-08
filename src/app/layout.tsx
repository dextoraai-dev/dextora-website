import type { Metadata, Viewport } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site-config";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo";
import { ThemeProvider } from "@/lib/theme";
import { I18nProvider } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DextoraBar } from "@/components/layout/DextoraBar";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F5EE" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0E12" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — AI-Powered Learning for Every Learner in India`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Dextora",
    "Dextora AI",
    "EdTech India",
    "AI-Powered Learning",
    "UPSC AI Mains Evaluation",
    "Dhyeya IAS Current Affairs",
    "Dextora Learn",
    "Personalised Learning",
    "NCERT AI Tutor",
    "Bilingual AI Education",
  ],
  authors: [{ name: "Dextora AI Research Team", url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.legalName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} — AI-Powered Learning for Every Learner in India`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/generated/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dextora AI — Educational Intelligence Platform for India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — AI-Powered Learning for Every Learner in India`,
    description: siteConfig.description,
    creator: "@dextora_ai",
    images: ["/images/generated/og-image.png"],
  },
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
  icons: {
    icon: "/brand/dextora-icon.svg",
    shortcut: "/brand/dextora-icon.svg",
    apple: "/brand/dextora-icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#E05A38]/20 selection:text-[#E05A38]">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ThemeProvider>
          <I18nProvider>
            {/* Top unified brand bar for cross-site feel */}
            <DextoraBar />
            {/* Primary Sticky Header */}
            <Navbar />
            {/* Main Page Content */}
            <main id="main-content" className="flex-1">
              {children}
            </main>
            {/* Footer */}
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
