import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fuzzy Docs",
  description: "Use fuzzy search on most used docs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
