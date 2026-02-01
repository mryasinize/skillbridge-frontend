'use client';

import Link from 'next/link';
import { TutorProfile } from '../types/intex';
import { Star, MapPin, ArrowRight } from 'lucide-react';

interface TutorCardProps {
    tutor: TutorProfile;
}

export default function TutorCard({ tutor }: TutorCardProps) {
    const averageRating = tutor.reviews && tutor.reviews.length > 0
        ? (tutor.reviews.reduce((acc, rev) => acc + rev.rating, 0) / tutor.reviews.length).toFixed(1)
        : '0.0';

    return (
        <Link
            href={`/tutors/${tutor.id}`}
            className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 group relative overflow-hidden flex flex-col h-full"
        >
            <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-2xl font-black text-white">
                    {tutor.user.name.charAt(0)}
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-gray-900 leading-tight">${tutor.hourlyRate}</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">/hour</span>
                </div>
            </div>

            <div className="relative z-10 mb-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 inline-block ${tutor.category ? 'bg-blue-50 text-blue-600' : 'bg-red-50 italic text-red-600'}`}>
                    {tutor.category?.name || "(Category removed)"}
                </span>
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight">
                    {tutor.user.name}
                </h3>
            </div>

            <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-8 relative z-10 leading-relaxed">
                {tutor.bio}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto relative z-10">
                <div className="flex items-center gap-4">
                    <div className="flex items-center text-amber-500 gap-1">
                        <Star size={16} fill={Number(averageRating) > 0 ? "currentColor" : "none"} />
                        <span className="text-gray-900 font-black text-sm">{averageRating}</span>
                    </div>
                    <div className="flex items-center text-gray-400 gap-1.5 font-bold text-xs">
                        <MapPin size={12} /> Remote
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 font-black text-xs uppercase tracking-widest group-hover:gap-2.5 transition-all">
                    Profile <ArrowRight size={16} />
                </div>
            </div>
        </Link>
    );
}
