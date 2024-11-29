import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Black Friday Deals",
  description: "Find the best Black Friday deals for developers",
  icons: {
    icon: "/black-friday-logo.png",
    apple: "/black-friday-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${fontSans.variable} font-sans bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
