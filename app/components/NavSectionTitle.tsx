'use client';

import { navigation, sharedNavigation } from '@/app/constants/navLinks';
import { useDashboard } from '@/app/context/DashboardContext';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function NavSectionTitle({ role }: { role: string }) {
    let pathname = usePathname();
    const isChangePasswordRoute = pathname.endsWith("change-password");
    if (isChangePasswordRoute) {
        pathname = pathname.replace("/change-password", "");
    }
    const { setSidebarOpen } = useDashboard();
    const currentNav = navigation[role as keyof typeof navigation] || sharedNavigation;
    const activeItem = currentNav.find(item => item.href === pathname);

    if (!activeItem) {
        return (
            <div className="flex-1 max-w-xl mx-4 hidden sm:block font-black text-gray-400">
                SkillBridge Dashboard
            </div>
        );
    }

    return (
        <>
            <button
                className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
                onClick={() => setSidebarOpen(true)}
            >
                <Menu size={24} />
            </button>
            <div className="flex-1 max-w-xl mx-4 hidden sm:block">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <activeItem.icon size={22} />
                    </div>
                    <h1 className="text-xl font-black text-gray-900 tracking-tight">
                        {activeItem.name}
                    </h1>
                </div>
            </div>
        </>
    );
}
