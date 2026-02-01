import { User } from '@/app/types/intex';
import { BookOpen, Calendar, ChevronRight, Clock, GraduationCap, Video } from 'lucide-react';
import Link from 'next/link';
import { UnifiedStudentStats } from '@/app/actions/user';
import StatCard from './StatCard';
import TimeDisplay from './TimeDisplay';

export default function StudentOverview({ user, stats }: { user: User, stats: UnifiedStudentStats }) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Welcome back, {user.name}!</h2>
                </div>
                <p className="text-gray-500">Ready to continue your learning journey?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Active Bookings"
                    value={stats.activeBookings}
                    icon={Calendar}
                    variant="blue"
                />
                <StatCard
                    title="Completed Hours"
                    value={stats.completedHours}
                    icon={Clock}
                    variant="purple"
                />
                <StatCard
                    title="Learning Points"
                    value={stats.learningPoints}
                    icon={GraduationCap}
                    variant="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upcoming Session */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Next Session</h3>
                        <Link href="/dashboard/bookings" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                            View All <ChevronRight size={14} />
                        </Link>
                    </div>

                    {stats.nextSession ? (
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 relative z-10 transition-all hover:bg-blue-100/50">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                                    <Video size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{stats.nextSession.title}</h4>
                                    <p className="text-xs text-gray-500">with {stats.nextSession.tutorName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar size={16} />
                                    <span className="font-medium">
                                        <TimeDisplay
                                            date={stats.nextSession.startTime}
                                            options={{
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric'
                                            }}
                                        />
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock size={16} />
                                    <span className="font-medium">
                                        <TimeDisplay
                                            date={stats.nextSession.startTime}
                                            options={{
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: true
                                            }}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-10 rounded-2xl border border-dashed border-gray-200 text-center relative z-10">
                            <p className="text-gray-400 font-medium italic">No upcoming sessions scheduled.</p>
                            <Link href="/tutors" className="mt-4 inline-block text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">
                                Browse Tutors
                            </Link>
                        </div>
                    )}
                    <BookOpen className="absolute -bottom-8 -right-8 text-gray-50/50 -rotate-12" size={160} />
                </div>

                <div className="bg-gray-900 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full transition-all group-hover:bg-blue-500/20" />

                    <h3 className="text-lg font-bold mb-6 relative z-10">Discovery</h3>
                    <div className="space-y-4 relative z-10">
                        <Link
                            href="/tutors"
                            className="block p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group/item"
                        >
                            <h4 className="font-bold mb-1 group-hover/item:text-blue-400 transition-colors">Browse New Tutors</h4>
                            <p className="text-xs text-gray-400">Explore experts in 20+ specialized categories.</p>
                        </Link>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl transition-all hover:bg-white/10">
                            <h4 className="font-bold mb-1">Learning Goals</h4>
                            <p className="text-xs text-gray-400 text-balance">
                                {stats.completedHours > 0
                                    ? `You've mastered ${stats.completedHours} hours of learning! Keep it up.`
                                    : "Start your first session to begin earning learning points!"}
                            </p>
                            <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${Math.min((stats.learningPoints / 1000) * 100, 100)}%` }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
