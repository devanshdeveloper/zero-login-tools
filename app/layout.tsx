import type { Metadata } from "next";
import { Architects_Daughter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const architectsDaughter = Architects_Daughter({
  weight: "400",
  variable: "--font-architects-daughter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZeroLoginTools - Free Instant Browser Tools",
  description:
    "A library of web utilities which work without login, without server computation, and entirely client-side. Fast, secure, and private tools.",
  openGraph: {
    title: "ZeroLoginTools - Free Instant Browser Tools",
    description:
      "A library of web utilities which work without login, without server computation, and entirely client-side. Fast, secure, and private tools.",
    url: "https://zerologintools.com",
    siteName: "ZeroLoginTools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroLoginTools - Free Instant Browser Tools",
    description:
      "A library of web utilities which work without login, without server computation, and entirely client-side. Fast, secure, and private tools.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${architectsDaughter.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <Header />
        <main className="flex-1 focus:outline-none">{children}</main>
        <footer className="py-6 md:px-8 md:py-0 border-t mt-auto">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 text-muted-foreground">
            <p className="text-balance text-center text-sm leading-loose md:text-left">
              Built with <span className="font-bold">Next.js</span> and{" "}
              <span className="font-bold">Tailwind CSS</span>. The site is fully
              client-side and open source.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
