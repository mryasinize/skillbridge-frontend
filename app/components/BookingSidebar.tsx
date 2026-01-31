'use client';

import { createBookingAction } from '@/app/actions/booking';
import { AvailabilitySlot, TutorProfile } from '@/app/types/intex';
import { Calendar, ChevronRight, Clock, DollarSign, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function BookingSidebar({ tutor }: { tutor: TutorProfile }) {
    const router = useRouter();
    const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
    const [bookingLoading, setBookingLoading] = useState(false);

    const formatDate = (dateStr: string) => {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        }).format(new Date(dateStr));
    };

    const formatTime = (startStr: string, endStr: string) => {
        const fmt = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        return `${fmt.format(new Date(startStr))} - ${fmt.format(new Date(endStr))}`;
    };

    const handleBooking = async () => {
        if (!selectedSlot) {
            toast.error('Please select a time slot');
            return;
        }

        setBookingLoading(true);
        const result = await createBookingAction({
            tutorProfileId: tutor.id,
            categoryId: tutor.categoryId,
            startTime: selectedSlot.startTime,
            endTime: selectedSlot.endTime
        });

        if (result.success) {
            toast.success('Session booked!');
            setSelectedSlot(null);
            router.refresh();
        } else {
            toast.error(result.error || 'Booking failed');
        }
        setBookingLoading(false);
    };

    const availableSlots = tutor.availabilitySlots?.filter(s => !s.isBooked) || [];

    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-24">
            {/* Price */}
            <div className="mb-6">
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-900">${tutor.hourlyRate}</span>
                    <span className="text-gray-400 text-sm">/session</span>
                </div>
            </div>

            {/* Book Button */}
            <button
                onClick={handleBooking}
                disabled={bookingLoading || !selectedSlot}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-3"
            >
                {bookingLoading ? (
                    <Loader2 className="animate-spin" size={18} />
                ) : (
                    <>Book Now <ChevronRight size={18} /></>
                )}
            </button>

            <p className="text-center text-xs text-gray-400 mb-6">
                <Clock size={12} className="inline mr-1" />
                Free cancellation up to 24h
            </p>

            <hr className="border-gray-100 mb-6" />

            {/* Slot Selection */}
            <div className="flex items-center gap-2 mb-2">
                <Calendar size={16} className="text-blue-600" />
                <h4 className="font-bold text-sm text-gray-900">Available Slots</h4>
            </div>
            <p className="text-xs text-gray-400 mb-4">Select a time slot below to book your session</p>

            <div className="space-y-2 max-h-72 overflow-y-auto">
                {availableSlots.length > 0 ? (
                    availableSlots.map(slot => (
                        <button
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${selectedSlot?.id === slot.id
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'bg-gray-50 border-gray-100 hover:border-blue-200 hover:bg-white'
                                }`}
                        >
                            <div className={`text-xs font-bold uppercase tracking-wide mb-1 ${selectedSlot?.id === slot.id ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                {formatDate(slot.startTime)}
                            </div>
                            <div className={`font-bold text-sm ${selectedSlot?.id === slot.id ? 'text-white' : 'text-gray-900'
                                }`}>
                                {formatTime(slot.startTime, slot.endTime)}
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-400 text-sm">No slots available</p>
                    </div>
                )}
            </div>

            {/* Trust Badge */}
            <div className="mt-6 flex items-center gap-2 p-3 bg-emerald-50 rounded-xl">
                <DollarSign size={14} className="text-emerald-600" />
                <p className="text-xs text-emerald-700 font-medium">Secure payments</p>
            </div>
        </div>
    );
}
