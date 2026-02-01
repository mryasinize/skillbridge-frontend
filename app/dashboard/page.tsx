import { redirect } from "next/navigation";
import { getUserAction } from "@/app/actions/auth";
import AdminOverview from "@/app/components/AdminOverview";
import StudentOverview from "@/app/components/StudentOverview";
import TutorOverview from "@/app/components/TutorOverview";
import { getAdminAnalytics } from "@/app/actions/admin";
import { getUserStatsAction, UnifiedStudentStats, UnifiedTutorStats } from "@/app/actions/user";

export default async function DashboardOverview() {
    const user = await getUserAction();

    if (!user) {
        redirect('/login');
    }

    const renderOverview = async () => {
        if (user.role === 'ADMIN') {
            const res = await getAdminAnalytics();
            const stats = res.success ? res.data : { totalStudents: 0, totalTutors: 0, totalBookings: 0 };
            return <AdminOverview stats={stats} />;
        }

        const statsRes = await getUserStatsAction();

        if (user.role === 'TUTOR') {
            const stats = statsRes.success && statsRes.data?.stats
                ? (statsRes.data.stats as UnifiedTutorStats)
                : {
                    totalStudents: 0,
                    hoursTaught: 0,
                    totalEarnings: 0,
                    averageRating: 0,
                    upcomingSessions: []
                };
            return <TutorOverview stats={stats} />;
        }

        if (user.role === 'STUDENT') {
            const stats = statsRes.success && statsRes.data?.stats
                ? (statsRes.data.stats as UnifiedStudentStats)
                : {
                    activeBookings: 0,
                    completedHours: 0,
                    learningPoints: 0,
                    nextSessions: null
                };
            return <StudentOverview user={user} stats={stats} />;
        }
    };

    return (
        <div>
            {await renderOverview()}
        </div>
    );
}
