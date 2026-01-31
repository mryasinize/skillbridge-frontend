import Link from 'next/link';
import { User } from '../types/intex';
import Logo from './Logo';

export default async function Navbar({ user }: { user?: User | null }) {
    return (
        <nav className="sticky top-0 z-[100] bg-white border-b border-gray-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center gap-12">
                        <Logo />

                        <div className="hidden md:flex items-center">
                            <Link href="/tutors" className="text-gray-400 hover:text-blue-600 text-xs font-black uppercase tracking-[0.2em] transition-colors">
                                Browse Experts
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        {user ? (
                            <Link href="/dashboard" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-black group-hover:bg-blue-100 transition-colors">
                                    {user.name?.[0].toUpperCase() || user.email?.[0].toUpperCase()}
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-xs font-black tracking-[0.2em] text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {user.name || user.email?.split('@')[0]}
                                    </p>
                                </div>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-2 sm:gap-4">
                                <Link href="/login" className="hidden sm:block text-gray-400 hover:text-gray-900 text-xs font-black uppercase tracking-[0.2em] px-4">
                                    Sign In
                                </Link>
                                <Link href="/login" className="sm:hidden text-gray-600 text-sm font-bold px-3 py-2">
                                    Login
                                </Link>
                                <Link href="/register" className="bg-blue-600 text-white px-4 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs font-black uppercase tracking-wider sm:tracking-[0.2em] hover:bg-blue-700 transition-all active:scale-95">
                                    <span className="sm:hidden">Join</span>
                                    <span className="hidden sm:inline">Join Platform</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
