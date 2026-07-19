import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackgroundParticles } from "@/components/background-particles";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.siddhartha.work"),
  title: {
    default: "Siddhartha Katiyar | Developer Blog & Engineering Portfolio",
    template: "%s | Siddhartha Katiyar",
  },
  description: "Technical deep-dives on backend infrastructure, database engineering, and security tooling. Sharing lessons from building high-performance systems at Jsmon.",
  keywords: [
    "Siddhartha Katiyar",
    "Systems Engineer",
    "Backend Developer",
    "Go",
    "Database Engineering",
    "Rate Limiting",
    "ThrottleX",
    "Distributed Systems",
    "Next.js Portfolio"
  ],
  authors: [{ name: "Siddhartha Katiyar", url: "https://www.siddhartha.work" }],
  creator: "Siddhartha Katiyar",
  openGraph: {
    title: "Siddhartha Katiyar | Developer Blog",
    description: "Technical deep-dives on backend infrastructure, database engineering, and security tooling.",
    url: "https://www.siddhartha.work",
    siteName: "Siddhartha Katiyar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddhartha Katiyar | Developer Blog & Portfolio",
    description: "Technical deep-dives on backend infrastructure, database engineering, and security tooling.",
    creator: "@siddharthakat25",
  },
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundParticles />
          <div className="flex min-h-screen flex-col">
             <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
