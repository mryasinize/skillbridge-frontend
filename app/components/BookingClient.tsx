'use client';

import { deleteReviewAction, updateBookingStatusAction } from '@/app/actions/booking';
import {
    Calendar,
    CheckCircle2,
    Clock,
    MessageSquare,
    Star,
    Trash2,
    User as UserIcon,
    XCircle
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Booking, User } from '../types/intex';
import ReviewForm from './ReviewForm';
import TimeDisplay from './TimeDisplay';

export default function BookingClient({
    initialBookings,
    currentUser
}: {
    initialBookings: Booking[];
    currentUser: User
}) {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const [reviewBookingId, setReviewBookingId] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    const now = new Date();

    const filteredBookings = initialBookings.filter(b => {
        if (currentUser.role === 'ADMIN') return true;
        if (currentUser.role === 'STUDENT') return b.studentId === currentUser.id;
        if (currentUser.role === 'TUTOR') return b.tutorProfileId === currentUser.tutorProfile?.id;
        return false;
    });

    const upcoming = filteredBookings.filter(b => b.status === 'CONFIRMED' && new Date(b.startTime) > now)
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    const past = filteredBookings.filter(b => b.status !== 'CONFIRMED' || new Date(b.startTime) <= now)
        .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

    const currentList = currentUser.role === 'ADMIN' ? filteredBookings : (activeTab === 'upcoming' ? upcoming : past);

    const handleStatusUpdate = async (bookingId: string, status: 'CANCELLED' | 'COMPLETED') => {
        setIsUpdating(bookingId);
        const result = await updateBookingStatusAction(bookingId, status);
        setIsUpdating(null);
        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.error);
        }
    };

    const handleDeleteReview = async (reviewId: string) => {
        if (!confirm('Are you sure you want to delete your review?')) return;
        setIsUpdating('review-' + reviewId);
        const result = await deleteReviewAction(reviewId);
        setIsUpdating(null);
        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.error);
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'COMPLETED': return 'bg-green-50 text-green-600 border-green-100';
            case 'CANCELLED': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Your Sessions</h2>
                    </div>
                    <p className="text-gray-500 font-medium">Manage your learning journey and teaching schedule.</p>
                </div>

                {currentUser.role !== 'ADMIN' && (
                    <div className="flex p-1 bg-gray-100 rounded-2xl w-fit">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'upcoming'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            Upcoming
                            {upcoming.length > 0 && (
                                <span className="ml-2 px-1.5 py-0.5 bg-blue-500 text-white text-[10px] rounded-md">
                                    {upcoming.length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'past'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            History
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6">
                {currentList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 text-center">
                        <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mb-6">
                            <Calendar size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No sessions found</h3>
                        <p className="text-gray-500 italic max-w-sm px-6">Your {activeTab} sessions list is currently empty. Start booking or managing your availability!</p>
                    </div>
                ) : (
                    currentList.map((booking) => (
                        <div key={booking.id} className="group relative bg-white border border-gray-100 rounded-3xl p-6 md:p-8 hover:border-blue-200 hover:shadow-xl transition-all duration-500">

                            {reviewBookingId === booking.id && (
                                <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center">
                                    <div className="w-full max-w-lg">
                                        <ReviewForm
                                            tutorProfileId={booking.tutorProfileId}
                                            onSuccess={() => setReviewBookingId(null)}
                                            onCancel={() => setReviewBookingId(null)}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${getStatusStyles(booking.status)}`}>
                                                    {booking.status}
                                                </span>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                    ID: {booking.id.slice(0, 8)}
                                                </span>
                                            </div>
                                            <h3 className={`text-xl font-black transition-colors ${booking.category ? 'text-gray-900 group-hover:text-blue-600' : 'text-red-500 italic'}`}>
                                                {booking.category?.name || "(Category removed)"}
                                            </h3>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-50 transition-all">
                                            <Calendar size={20} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                                                <Clock size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Scheduled For</p>
                                                <p className="text-sm font-bold text-gray-900">
                                                    <TimeDisplay
                                                        date={booking.startTime}
                                                        options={{
                                                            weekday: 'short',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: 'numeric',
                                                            minute: '2-digit',
                                                            hour12: true
                                                        }}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                                                <UserIcon size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                    {currentUser.role === 'TUTOR' ? 'Student' : 'Tutor'}
                                                </p>
                                                <p className="text-sm font-bold text-gray-900">
                                                    {currentUser.role === 'TUTOR'
                                                        ? booking.student?.name
                                                        : booking.tutor?.user?.name || 'Tutor'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {(activeTab === 'past' || currentUser.role === 'ADMIN') && (
                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            {(() => {
                                                const review = booking.tutor?.reviews?.find(r => r.studentId === booking.studentId);
                                                return review ? (
                                                    <div className="bg-blue-50/30 p-5 rounded-2xl border border-blue-100/50 group/review relative">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex gap-0.5">
                                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                                        <Star
                                                                            key={s}
                                                                            size={12}
                                                                            fill={s <= (review.rating) ? "currentColor" : "none"}
                                                                            className={s <= (review.rating) ? "text-yellow-500" : "text-gray-300"}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span className="text-xs font-black uppercase tracking-widest text-blue-600">
                                                                    {currentUser.role === 'STUDENT' ? 'Your Feedback' : 'Student Feedback'}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <span className="text-xs font-bold text-gray-400">
                                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                                </span>
                                                                {currentUser.role === 'STUDENT' && (
                                                                    <button
                                                                        disabled={isUpdating === 'review-' + review.id}
                                                                        onClick={() => handleDeleteReview(review.id)}
                                                                        className="p-1.5 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                                        title="Delete review"
                                                                    >
                                                                        {isUpdating === 'review-' + review.id ? <div className="w-3 h-3 border-2 border-red-200 border-t-red-600 rounded-full animate-spin" /> : <Trash2 size={14} />}
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-700 italic font-medium leading-relaxed">
                                                            "{review.comment}"
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-gray-400 italic text-sm font-medium px-2 py-1">
                                                        <MessageSquare size={14} />
                                                        No review submitted for this session yet
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    )}

                                </div>

                                {currentUser.role !== 'ADMIN' && (
                                    <div className="md:w-64 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8 space-y-3">
                                        {isUpdating === booking.id ? (
                                            <div className="flex items-center justify-center py-4 text-gray-400 gap-2 font-bold italic animat-pulse">
                                                <div className="w-4 h-4 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
                                                Updating...
                                            </div>
                                        ) : (
                                            <>
                                                {currentUser.role === 'STUDENT' && (
                                                    <>
                                                        {booking.status === 'CONFIRMED' && new Date(booking.startTime) > now && (
                                                            <button
                                                                onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')}
                                                                className="w-full py-4 bg-red-50 text-red-600 rounded-2xl text-sm font-black hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 border border-red-100"
                                                            >
                                                                <XCircle size={18} />
                                                                Cancel Session
                                                            </button>
                                                        )}
                                                        {booking.status === 'COMPLETED' && (
                                                            <button
                                                                disabled={!!booking.tutor?.reviews?.find(r => r.studentId === booking.studentId)}
                                                                onClick={() => setReviewBookingId(booking.id)}
                                                                className="w-full py-4 bg-yellow-50 text-yellow-600 rounded-2xl text-sm font-black hover:bg-yellow-500 hover:text-white transition-all flex items-center justify-center gap-2 border border-yellow-100 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                                                            >
                                                                <Star size={18} />
                                                                {booking.tutor?.reviews?.find(r => r.studentId === booking.studentId) ? 'Rated' : 'Rate Tutor'}
                                                            </button>
                                                        )}
                                                    </>
                                                )}

                                                {currentUser.role === 'TUTOR' && (
                                                    <button
                                                        disabled={booking.status !== 'CONFIRMED'}
                                                        onClick={() => handleStatusUpdate(booking.id, 'COMPLETED')}
                                                        className="w-full py-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-black hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 border border-emerald-100 shadow-sm shadow-emerald-50 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                                                    >
                                                        <CheckCircle2 size={18} />
                                                        {booking.status === 'COMPLETED' ? 'Completed' : booking.status === 'CANCELLED' ? 'Cancelled' : 'Mark Complete'}
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000 -z-10" />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
