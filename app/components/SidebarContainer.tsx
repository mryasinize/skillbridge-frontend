'use client';

import React from 'react';
import { useDashboard } from '@/app/context/DashboardContext';

export default function SidebarContainer({ children }: { children: React.ReactNode }) {
    const { isSidebarOpen, setSidebarOpen } = useDashboard();

    return (
        <>
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transition-transform duration-300 lg:translate-x-0 lg:static lg:block
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {children}
            </aside>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </>
    );
}
