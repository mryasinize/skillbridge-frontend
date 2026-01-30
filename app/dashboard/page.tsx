import Link from "next/link";
import { getUserAction } from "../actions/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const user = await getUserAction();
    if (!user) {
        redirect('/login')
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}! 👋</h1>
                    <p className="text-gray-600 mt-2">Manage your learning journey and track your upcoming sessions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-2 text-blue-600">Upcoming Bookings</h3>
                        <p className="text-gray-500 text-sm">You have no upcoming sessions scheduled.</p>
                        <Link href="/tutors" className="mt-4 inline-block text-blue-600 font-semibold hover:underline">
                            Browse Tutors →
                        </Link>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-2 text-green-600">Completed Sessions</h3>
                        <p className="text-gray-500 text-sm">You haven't completed any sessions yet.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-2 text-purple-600">Profile Status</h3>
                        <p className="text-gray-600 text-sm">Role: <span className="font-medium text-gray-900">{user.role}</span></p>
                        <p className="text-gray-600 text-sm">Email: <span className="font-medium text-gray-900">{user.email}</span></p>
                    </div>
                </div>
            </main>
        </div>
    );
}
