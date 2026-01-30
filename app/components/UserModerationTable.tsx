'use client';

import { moderateUser } from '@/app/actions/admin';
import { User } from '@/app/types/intex';
import { Search, ShieldAlert, ShieldCheck, UserMinus, UserPlus } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function UserModerationTable({ initialUsers }: { initialUsers: User[] }) {
    const [users, setUsers] = useState(initialUsers);
    const [searchQuery, setSearchQuery] = useState('');
    const [isPending, startTransition] = useTransition();

    // Implementing basic search functionality (client-side)
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleModerate = async (userId: string, action: 'BAN' | 'UNBAN') => {
        if (!confirm(`Are you sure you want to ${action.toLowerCase()} this user?`)) return;

        startTransition(async () => {
            const res = await moderateUser(userId, action);
            if (res.success) {
                toast.success(`User ${action === 'BAN' ? 'banned' : 'unbanned'} successfully`);
                setUsers(prev => prev.map(u =>
                    u.id === userId ? { ...u, isBanned: action === 'BAN' } : u
                ));
            } else {
                toast.error(res.error || `Failed to ${action.toLowerCase()} user`);
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="text-sm text-gray-500 font-medium">
                    Showing {filteredUsers.length} users
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-500">User</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-500">Role</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-500">Status</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900">{user.name}</span>
                                            <span className="text-xs text-gray-500">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                                            user.role === 'TUTOR' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.role === 'ADMIN' ? (
                                            <span className="text-xs text-gray-400 italic">Protected</span>
                                        ) : (
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${user.isBanned
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-emerald-100 text-emerald-700'
                                                }`}>
                                                {user.isBanned ? (
                                                    <><ShieldAlert size={12} /> Banned</>
                                                ) : (
                                                    <><ShieldCheck size={12} /> Active</>
                                                )}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {user.role !== 'ADMIN' && (
                                            <button
                                                onClick={() => handleModerate(user.id, user.isBanned ? 'UNBAN' : 'BAN')}
                                                disabled={isPending}
                                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50 ${user.isBanned
                                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                                    : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'
                                                    }`}
                                            >
                                                {user.isBanned ? (
                                                    <><UserPlus size={14} /> Unban</>
                                                ) : (
                                                    <><UserMinus size={14} /> Ban User</>
                                                )}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length === 0 && (
                    <div className="py-20 text-center text-gray-400 italic">
                        No users found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
}
