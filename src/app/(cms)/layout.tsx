import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body id="outstatic">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
