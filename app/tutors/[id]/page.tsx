import { getTutorById } from '@/app/actions/tutor';
import BookingSidebar from '@/app/components/BookingSidebar';
import {
    ArrowLeft,
    BookOpen,
    CheckCircle,
    Globe,
    GraduationCap,
    MessageSquare,
    ShieldCheck,
    Star,
    User as UserIcon
} from 'lucide-react';
import Link from 'next/link';

export default async function TutorProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const tutor = await getTutorById(id);

    if (!tutor) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <UserIcon size={40} />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2">Profile Not Found</h1>
                    <p className="text-gray-500 mb-8">This tutor may no longer be available.</p>
                    <Link
                        href="/tutors"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all"
                    >
                        <ArrowLeft size={16} /> Back to Tutors
                    </Link>
                </div>
            </div>
        );
    }

    const avgRating = tutor.reviews?.length
        ? (tutor.reviews.reduce((sum, r) => sum + r.rating, 0) / tutor.reviews.length).toFixed(1)
        : null;

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Back Link */}
            <Link href="/tutors" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors font-bold text-xs uppercase tracking-widest mb-8">
                <ArrowLeft size={14} /> Back to Tutors
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Header */}
                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/50 rounded-full -mr-24 -mt-24"></div>

                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                            <div className="w-28 h-28 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[1.5rem] flex items-center justify-center text-4xl font-black text-white flex-shrink-0">
                                {tutor.user.name.charAt(0)}
                            </div>

                            <div className="flex-grow">
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${tutor.category ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600 italic'}`}>
                                        {tutor.category?.name || "(Category removed)"}
                                    </span>
                                    <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                                        <CheckCircle size={12} /> Verified
                                    </span>
                                </div>
                                <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">{tutor.user.name}</h1>
                                <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <Star size={16} fill="currentColor" className="text-amber-400" />
                                        <span className="font-black text-gray-900">{avgRating || '—'}</span>
                                        <span>({tutor.reviews?.length || 0} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Globe size={14} className="text-gray-400" />
                                        <span>English</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <GraduationCap size={14} className="text-gray-400" />
                                        <span>Expert Level</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <BookOpen size={22} />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">About</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                            {tutor.bio}
                        </p>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl">
                                    <MessageSquare size={22} />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Reviews</h2>
                            </div>
                            {avgRating && (
                                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                                    <Star size={16} fill="currentColor" className="text-amber-400" />
                                    <span className="font-black text-gray-900">{avgRating}</span>
                                    <span className="text-gray-400 text-sm">average</span>
                                </div>
                            )}
                        </div>

                        {tutor.reviews && tutor.reviews.length > 0 ? (
                            <div className="space-y-4">
                                {tutor.reviews.map(review => (
                                    <div key={review.id} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        fill={i < review.rating ? "currentColor" : "none"}
                                                        className={i < review.rating ? "text-amber-400" : "text-gray-200"}
                                                    />
                                                ))}
                                            </div>
                                            <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-emerald-600">
                                                <ShieldCheck size={12} /> Verified
                                            </span>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">"{review.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                <MessageSquare size={32} className="mx-auto text-gray-300 mb-4" />
                                <p className="font-bold text-gray-900 mb-1">No reviews yet</p>
                                <p className="text-gray-400 text-sm">Be the first to leave one!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div>
                    <BookingSidebar tutor={tutor} />
                </div>
            </div>
        </main>
    );
}
