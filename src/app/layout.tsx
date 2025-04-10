import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/providers/ReduxProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinemate",
  description: "Movie Recommendation system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased custom-scrollbar`}>
        <main>
          <ReduxProvider>{children}</ReduxProvider>
        </main>
      </body>
    </html>
  );
}
