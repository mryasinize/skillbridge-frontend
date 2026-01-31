import React from 'react';
import { getUserAction } from '@/app/actions/auth';
import { getCategories } from '@/app/actions/tutor';
import { redirect } from 'next/navigation';
import ProfileForm from '@/app/components/ProfileForm';
import Link from 'next/link';
import { KeyRound, Shield, UserCircle } from 'lucide-react';

export default async function ProfilePage() {
    const user = await getUserAction();
    if (!user) {
        redirect('/login');
    }

    const categories = await getCategories();

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Profile Settings</h2>
                    </div>
                    <p className="text-gray-500 font-medium">Manage your identity and security.</p>
                </div>
                <Link
                    href="/dashboard/profile/change-password"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-xs hover:bg-gray-800 transition-all shadow-none"
                >
                    <KeyRound size={16} />
                    Reset Password
                </Link>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <ProfileForm user={user} categories={categories} />
                <div className="space-y-6">
                    <div className="bg-linear-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white shadow-sm relative overflow-hidden">
                        <div className="relative z-10 space-y-4">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black mb-1">Security First</h4>
                                <p className="text-blue-100 text-sm leading-relaxed">
                                    We recommend changing your password regularly and using unique credentials for your SkillBridge account.
                                </p>
                            </div>
                        </div>
                        <UserCircle className="absolute -bottom-8 -right-8 text-white/10 -rotate-12" size={160} />
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm border-dashed">
                        <h4 className="font-bold text-gray-900 mb-2 italic">Pro Tip</h4>
                        <p className="text-xs text-gray-500 leading-relaxed italic">
                            Keep your professional bio up to date! Tutors with detailed, passion-filled biographies receive 40% more booking requests on average.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}