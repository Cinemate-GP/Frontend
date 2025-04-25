// 'use client'
// import Link from "next/link";
// import { NavLink } from "@/constants";
// import { usePathname } from "next/navigation";

// const LinkItem = ({link}: {link: NavLink}) => {
//     const pathname = usePathname()
//   return (
//     <li key={link.name}>
//       <Link
//         href={link.href}
//         className={`flex items-center px-3 py-2 rounded hover:text-red-500 transition-all duration-150 ease-in-out ${pathname === link.href ? "text-red-500" : ""}`}
//       >
//         <link.icon className="w-5 h-5 mr-3" aria-hidden="true" />
//         {link.name}
//       </Link>
//       <div className="border-r "></div>
//     </li>
//   );
// };

// export default LinkItem