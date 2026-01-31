import { UnifiedTutorStats } from '@/app/actions/user';
import { ChevronRight, Clock, DollarSign, MessageSquare, Users } from 'lucide-react';
import Link from 'next/link';
import StatCard from './StatCard';

export default function TutorOverview({ stats }: { stats: UnifiedTutorStats }) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDay = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Tutor Dashboard</h2>
                </div>
                <p className="text-gray-500">Overview of your teaching business and performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Students"
                    value={stats.totalStudents}
                    icon={Users}
                    variant="blue"
                />
                <StatCard
                    title="Hours Taught"
                    value={stats.hoursTaught}
                    icon={Clock}
                    variant="purple"
                />
                <StatCard
                    title="Total Earnings"
                    value={`$${stats.totalEarnings.toLocaleString()}`}
                    icon={DollarSign}
                    variant="emerald"
                />
                <StatCard
                    title="Average Rating"
                    value={stats.averageRating}
                    icon={MessageSquare}
                    variant="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Sessions */}
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
                        <Link href="/dashboard/bookings" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                            Full Schedule <ChevronRight size={14} />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {stats.upcomingSessions.length > 0 ? (
                            stats.upcomingSessions.map((session) => (
                                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl group hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center font-bold text-blue-600">
                                            {getInitials(session.studentName)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-900">{session.studentName}</h4>
                                            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Confirmed Session</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-gray-900">{formatDate(session.startTime)}</p>
                                        <p className="text-[10px] text-gray-400 font-bold">{formatDay(session.startTime)}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-400 italic">
                                No upcoming sessions scheduled.
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Performance */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-20 transition-opacity" />
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 relative z-10 transition-transform group-hover:scale-110 duration-500">
                        <Users size={40} />
                    </div>
                    <h4 className="font-black text-gray-900 mb-2 relative z-10">Profile Visibility</h4>
                    <p className="text-sm text-gray-500 mb-8 max-w-[200px] relative z-10">Your profile is active and visible to all students.</p>
                    <Link
                        href="/dashboard/profile"
                        className="w-full py-4 bg-gray-900 text-white rounded-xl font-black text-sm hover:bg-black transition-all shadow-xl shadow-gray-200 hover:shadow-gray-300 relative z-10 active:scale-95"
                    >
                        Update Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
