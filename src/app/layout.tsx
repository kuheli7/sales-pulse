import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sales Pulse",
  description: "Yearly sales dashboard (2022-2024) built with Next.js, Recharts and Kaggle data.",
};

// Runs before paint so the saved theme never flashes.
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" data-year="2024" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
}
