"use client";
import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-[url('/main-img.png')] bg-cover bg-center min-h-screen w-full relative">
      <div className="w-full min-h-screen bg-black/75 backdrop-blur-sm flex items-center justify-center py-8">
        <div className="w-full max-w-md px-4">
          <Link href={"/"} className="block transition-transform hover:scale-105">
            <Image
              src="/logo.png"
              width={120}
              height={120}
              priority
              alt="logo"
              className="mx-auto mb-8"
            />
          </Link>
          
          <div className="w-full rounded-xl bg-secondaryBg/70 backdrop-blur-md p-8 mx-auto 
                        border border-gray-700/30 shadow-2xl 
                        transition-all duration-300 hover:shadow-primary/5">
            {children}
          </div>
          
          <p className="text-center text-gray-400 text-sm mt-8 font-light">
            © {year} All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
