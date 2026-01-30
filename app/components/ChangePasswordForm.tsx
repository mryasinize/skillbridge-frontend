'use client';

import { changePasswordAction } from '@/app/actions/auth';
import { KeyRound, Lock, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { SubmitButton } from './SubmitButton';

export default function ChangePasswordForm() {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [state, action] = useActionState(async (prevState: any, formData: FormData) => {
        if (newPassword !== confirmPassword) {
            return { success: false, error: 'New passwords do not match' };
        }
        return await changePasswordAction(prevState, formData);
    }, null);

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message);
            router.push('/dashboard/profile');
        } else if (state?.error) {
            toast.error(state.error);
        }
    }, [state, router]);

    return (
        <form action={action} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8 max-w-xl mx-auto animate-in fade-in duration-500">
            <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <KeyRound size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Security Settings</h3>
                <p className="text-sm text-gray-500 italic">Update your account password.</p>
            </div>

            {state?.error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                    <p className="text-sm text-red-700 font-medium">{state.error}</p>
                </div>
            )}

            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                        <Lock size={12} /> Current Password
                    </label>
                    <input
                        type="password"
                        name="oldPassword"
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                        placeholder="••••••••"
                    />
                </div>

                <div className="h-px bg-gray-50 my-6 mx-4" />

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                            <ShieldCheck size={12} /> New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                            <ShieldCheck size={12} /> Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                            placeholder="••••••••"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
                <SubmitButton text="Update Password" loadingText="Securing..." className="w-full h-12 rounded-xl text-sm bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-none flex items-center justify-center gap-2" />
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="w-full h-12 rounded-xl text-gray-500 font-bold hover:bg-gray-50 transition-colors text-sm"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
