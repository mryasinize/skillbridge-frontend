"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavItemLink({
    href,
    children
}: {
    href: string,
    children: React.ReactNode
}) {
    let pathname = usePathname();
    const isChangePasswordRoute = pathname.endsWith("change-password");
    if (isChangePasswordRoute) {
        pathname = pathname.replace("/change-password", "");
    }
    const navItemClasses = `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
    ${pathname === href
            ? 'bg-blue-600 text-white'
            : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'}
`;
    return <Link href={href} className={navItemClasses}>{children}</Link>;
}