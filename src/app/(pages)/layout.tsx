import Sidenav from "@/components/Sidenav";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/Footer";
import MainContent from "@/components/MainContent";
import SearchProvider from "@/context/SearchContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
