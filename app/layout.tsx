import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My 4-Quadrant Todo",
  description: "Created by Samchohu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
