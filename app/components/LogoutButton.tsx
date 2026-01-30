'use client';

import { LogOut } from 'lucide-react';
import { logoutAction } from '../actions/auth';
import { User } from '../types/intex';

export default function LogoutButton({ user }: { user: User }) {
    return <button
        onClick={() => logoutAction()}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm border border-transparent hover:border-red-100"
    >
        <LogOut size={18} />
        <span className="hidden sm:inline">Logout</span>
    </button>

}