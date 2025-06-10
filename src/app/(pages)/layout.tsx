import Sidenav from "@/components/Sidenav";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MainContent from "@/components/MainContent";
import SearchProvider from "@/context/SearchContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  return (
    <>
      <SearchProvider>
        <Sidenav />
        <MainContent>
          <Navbar />
          {children}
          <Footer />
        </MainContent>
      </SearchProvider>
    </>
  );
}
