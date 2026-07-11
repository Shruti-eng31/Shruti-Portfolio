import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

import { CustomCursor } from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Shruti Singh | Data Scientist & Full Stack Developer",
  description: "Portfolio of Shruti Singh - Data Scientist, Machine Learning Engineer, and Full Stack Developer.",
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${caveat.variable} antialiased bg-background text-foreground min-h-screen relative selection:bg-primary/30 selection:text-primary-dark transition-colors duration-500`}>
        <Providers>
          <CustomCursor />
          {/* Noise overlay */}
          <div className="pointer-events-none fixed inset-0 z-[50] h-full w-full opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
          
          <main className="relative z-10 flex flex-col items-center w-full overflow-hidden">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
