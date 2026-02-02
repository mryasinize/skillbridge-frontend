import Link from 'next/link';
import { Suspense } from 'react';
import NavbarAuth from './NavbarAuth';
import Logo from './Logo';

export default async function Navbar() {
    return (
        <nav className="sticky top-0 z-[100] bg-white border-b border-gray-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center gap-12">
                        <Logo />
                        <div className="hidden md:flex items-center">
                            <Link href="/tutors" className="text-gray-400 hover:text-blue-600 text-xs font-black uppercase tracking-[0.2em] transition-colors">
                                Browse Tutors
                            </Link>
                        </div>
                    </div>
                    <Suspense fallback={
                        <div className="flex items-center gap-3 sm:gap-6">
                            <div className="w-20 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                            <div className="w-32 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                        </div>
                    }>
                        <NavbarAuth />
                    </Suspense>
                </div>
            </div>
        </nav>
    );
}
