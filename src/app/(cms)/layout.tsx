import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body id="outstatic">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
