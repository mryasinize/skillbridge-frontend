'use client';

import { registerAction } from '@/app/actions/auth';
import { getCategories } from '@/app/actions/tutor';
import { SubmitButton } from '@/app/components/SubmitButton';
import Logo from '@/app/components/Logo';
import { AlertCircle, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';

export default function RegisterPage() {
    const [response, action] = useActionState(registerAction, null);
    const [role, setRole] = useState('STUDENT');
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

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
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Create account</h1>
                        <p className="text-gray-500">Join SkillBridge today</p>
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
                                Full Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                required
                                placeholder="John Doe"
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                            />
                        </div>

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

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                I want to join as
                            </label>
                            <div className="relative">
                                <select
                                    name="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 appearance-none cursor-pointer"
                                >
                                    <option value="STUDENT">Student</option>
                                    <option value="TUTOR">Tutor</option>
                                </select>
                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {role === 'TUTOR' && (
                            <div className="space-y-5 pt-5 border-t border-gray-100">
                                <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Tutor Profile</p>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                        Category
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="categoryId"
                                            required
                                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 appearance-none cursor-pointer"
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                        Hourly Rate ($)
                                    </label>
                                    <input
                                        name="hourlyRate"
                                        type="number"
                                        step="0.01"
                                        required
                                        placeholder="50"
                                        className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                        Bio
                                    </label>
                                    <textarea
                                        name="bio"
                                        required
                                        rows={3}
                                        placeholder="Tell students about your experience..."
                                        className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        <SubmitButton text="Create Account" loadingText="Creating..." />
                    </form>
                </div>
                <p className="text-center mt-8 text-gray-500">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1">
                        Sign in <ArrowRight size={14} />
                    </Link>
                </p>
            </div>
        </div>
    );
}
