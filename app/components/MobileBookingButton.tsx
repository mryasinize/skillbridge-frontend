'use client';

import { TutorProfile } from '@/app/types/intex';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import BookingSidebar from './BookingSidebar';

export default function MobileBookingButton({ tutor }: { tutor: TutorProfile }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent lg:hidden z-50">
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                >
                    <Calendar size={18} />
                    Book Session · ${tutor.hourlyRate}
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
                        <div className="sticky top-0 bg-white pt-3 pb-2 px-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto" />
                        </div>
                        <div className="p-4">
                            <BookingSidebar tutor={tutor} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
