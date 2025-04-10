import Sidenav from "@/components/Sidenav";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if(!token) redirect("/auth/login");

  return (
    <>
      <Sidenav />
      <Navbar />
      <main className="overflow-hidden ml-0 md:ml-48">{children}</main>
    </>
  );
}
