import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { UserProvider } from "@/context/UserContext";
import ThemeManager from "@/components/ThemeMangaer";
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
          <ReduxProvider>
            <ThemeManager/>
            <UserProvider>{children}</UserProvider>
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
