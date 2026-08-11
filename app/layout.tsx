import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LogoCreator.Site — Guided AI Logo Creation",
  description:
    "Create, refine, save, and export professional logo concepts with a guided AI brand assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
