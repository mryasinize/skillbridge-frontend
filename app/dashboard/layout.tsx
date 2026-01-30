import { getUserAction } from '@/app/actions/auth';
import {
    GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import NavSectionTitle from '@/app/components/NavSectionTitle';
import SidebarContainer from '@/app/components/SidebarContainer';
import LogoutButton from '@/app/components/LogoutButton';
import NavItemLink from '@/app/components/NavItemLink';
import { navigation, sharedNavigation } from '@/app/constants/navLinks';
import { DashboardProvider } from '@/app/context/DashboardContext';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const user = await getUserAction();

    if (!user) {
        redirect('/login');
    }

    const currentNav = navigation[user.role as keyof typeof navigation] || sharedNavigation;
    return (
        <DashboardProvider>
            <div className="h-screen flex bg-gray-50 overflow-hidden">
                <SidebarContainer>
                    <div className="h-full flex flex-col p-6">
                        <Link href="/" className="flex items-center gap-2 mb-10 px-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                <GraduationCap className="text-white" size={24} />
                            </div>
                            <span className="text-xl font-black tracking-tight text-gray-900">SkillBridge</span>
                        </Link>

                        <nav className="flex-1 space-y-1">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4 mb-4">
                                Main Menu
                            </div>
                            {currentNav.map((item) => (
                                <NavItemLink key={item.name} href={item.href}>
                                    <item.icon size={20} />
                                    <span className="font-bold text-sm tracking-tight">{item.name}</span>
                                </NavItemLink>
                            ))}
                        </nav>
                    </div>
                </SidebarContainer>

                <div className="flex-1 flex flex-col min-w-0 h-full relative">
                    <header className="h-20 shrink-0 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 flex items-center justify-between z-30">
                        <NavSectionTitle role={user.role} />
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 px-2">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-black">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="hidden md:block overflow-hidden">
                                    <div className="font-black text-sm text-gray-900 truncate">{user.name}</div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user.role}</div>
                                </div>
                            </div>
                            <LogoutButton user={user} />
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-6 md:p-10">
                        {children}
                    </main>
                </div>
            </div>
        </DashboardProvider>
    );
}
