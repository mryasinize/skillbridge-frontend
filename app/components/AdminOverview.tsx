import React from 'react';
import { Users, GraduationCap, Calendar, ArrowRight } from 'lucide-react';
import { AdminStats } from '@/app/actions/admin';
import Link from 'next/link';
import StatCard from './StatCard';

export default function AdminOverview({ stats }: { stats: AdminStats }) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Platform Performance</h2>
                </div>
                <p className="text-gray-500 font-medium">Real-time overview of the SkillBridge ecosystem.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Students"
                    value={stats.totalStudents}
                    icon={GraduationCap}
                    variant="blue"
                    description="Active learners on the platform"
                />
                <StatCard
                    title="Active Tutors"
                    value={stats.totalTutors}
                    icon={Users}
                    variant="purple"
                    description="Verified teachers and experts"
                />
                <StatCard
                    title="Total Bookings"
                    value={stats.totalBookings}
                    icon={Calendar}
                    variant="emerald"
                    description="Completed and upcoming sessions"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Management</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link
                            href="/dashboard/users"
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group"
                        >
                            <span className="font-bold text-gray-700 group-hover:text-blue-600">Moderate Users</span>
                            <ArrowRight size={18} className="text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/dashboard/categories"
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors group"
                        >
                            <span className="font-bold text-gray-700 group-hover:text-purple-600">Manage Categories</span>
                            <ArrowRight size={18} className="text-gray-400 group-hover:text-purple-600 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-2">Platform Health</h3>
                        <p className="text-blue-100 text-sm mb-6 max-w-xs">Everything is running smoothly. All systems are operational.</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-widest border border-white/20">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                            All Normal
                        </div>
                    </div>
                    <GraduationCap className="absolute -bottom-4 -right-4 text-white/10 rotate-12" size={160} />
                </div>
            </div>
        </div>
    );
}
