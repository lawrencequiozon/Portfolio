import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mark Lawrence — IT Professional",
  description: "The portfolio of Mark Lawrence, an IT professional focused on dependable systems and thoughtful support.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
