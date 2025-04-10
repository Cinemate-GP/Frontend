"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
const avtiveTab = "border-b-2 border-primary";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const path = useMemo(() => pathname.split("/")[2], [pathname]);
  const [active, setActive] = useState(path);

  useEffect(() => {
    setActive(path);
  }, [path]);

  return (
    <div className="bg-[url('/main-img.png')] bg-cover bg-center min-h-screen w-full relative">
      <div className="w-full min-h-screen bg-black/90 flex items-center justify-center py-8">
        <div className="w-full">
          <Link href={"/"}>
            <Image
              src="/logo.svg"
              width={100}
              height={100}
              priority
              alt="logo"
              className="mx-auto mb-6"
            />
          </Link>
          <div className="w-5/6 md:w-2/3 lg:w-2/5 rounded-lg bg-[#0d0d0d] p-5 mx-auto border border-gray-800">
            <ul className="flex gap-10 w-full justify-center mb-6">
              <li
                className={`p-2  hover:border-primary ${
                  active === "login" ? avtiveTab : " border-transparent"
                } transition-all duration-300 hover:text-primary`}
              >
                <Link href={"/auth/login"} onClick={() => setActive("login")}>
                  Login
                </Link>
              </li>
              <li className={`p-2 ${active === "signup" ? avtiveTab : ""} transition-all duration-300 hover:text-primary` }>
                <Link href={"/auth/signup"} onClick={() => setActive("signup")}>
                  Signup
                </Link>
              </li>
            </ul>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
