'use client';

import { loginAction } from '@/app/actions/auth';
import { SubmitButton } from '@/app/components/SubmitButton';
import Logo from '@/app/components/Logo';
import { AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useActionState } from 'react';

export default function LoginPage() {
    const [response, action] = useActionState(loginAction, null);

    return (
        <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4 py-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-50/50 rounded-full -mr-64 -mt-64 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-indigo-50/50 rounded-full -ml-32 -mb-32 blur-3xl"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="mb-8 flex justify-center">
                    <Logo size="lg" />
                </div>
                <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Welcome back</h1>
                        <p className="text-gray-500">Sign in to continue learning</p>
                    </div>

                    <form action={action} className="space-y-5">
                        {response?.error && (
                            <div className="flex items-center gap-3 bg-red-50 text-red-600 p-4 rounded-2xl">
                                <AlertCircle size={18} />
                                <p className="text-sm font-medium">{response.error}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="********"
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                            />
                        </div>

                        <SubmitButton text="Sign In" loadingText="Signing in..." />
                    </form>
                </div>
                <p className="text-center mt-8 text-gray-500">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1">
                        Create one <ArrowRight size={14} />
                    </Link>
                </p>
            </div>
        </div>
    );
}
