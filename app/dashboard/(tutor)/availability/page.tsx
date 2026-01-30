import { getUserAction } from '@/app/actions/auth';
import { getTutorById, deleteAvailabilityAction } from '@/app/actions/tutor';
import { redirect } from 'next/navigation';
import AvailabilityForm from '@/app/components/AvailabilityForm';
import { Calendar, Clock, Trash2, AlertCircle } from 'lucide-react';
import { SubmitButton } from '@/app/components/SubmitButton';

export default async function AvailabilityPage() {
    const user = await getUserAction();

    if (!user || user.role !== 'TUTOR') {
        redirect('/dashboard');
    }

    const profile = await getTutorById(user.tutorProfile!.id);

    if (!profile) {
        return <div>Error loading profile.</div>;
    }

    const formatDate = (date: string, options: Intl.DateTimeFormatOptions) => {
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    };

    const slots = profile.availabilitySlots
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Availability Management</h2>
                <p className="text-sm text-gray-500 italic">Configure your tutoring schedule.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1">
                    <AvailabilityForm />
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                    <Clock size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Your Schedule</h3>
                            </div>
                            <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-full border border-gray-100">
                                {slots.length} Total Slots
                            </span>
                        </div>

                        {slots.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
                                <Calendar className="mx-auto text-gray-300 mb-4" size={40} />
                                <p className="text-gray-500 font-medium italic">No availability slots found.</p>
                                <p className="text-xs text-gray-400 mt-1">Add some availability using the form.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {slots.map((slot) => (
                                    <div
                                        key={slot.id}
                                        className="flex items-center justify-between p-5 bg-gray-50/50 border border-gray-100 rounded-2xl hover:border-blue-200 transition-all group"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 bg-white border border-gray-100 rounded-xl shadow-xs">
                                                <span className="text-[10px] font-black uppercase text-gray-400 leading-none">
                                                    {formatDate(slot.startTime, { month: 'short' })}
                                                </span>
                                                <span className="text-lg font-black text-gray-900 leading-tight">
                                                    {formatDate(slot.startTime, { day: '2-digit' })}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">
                                                    {formatDate(slot.startTime, { weekday: 'long' })}, {formatDate(slot.startTime, { hour: 'numeric', minute: '2-digit' })} - {formatDate(slot.endTime, { hour: 'numeric', minute: '2-digit' })}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${slot.isBooked ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                                                        {slot.isBooked ? 'Booked' : 'Available'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {!slot.isBooked && (
                                            <form action={async (formData) => {
                                                'use server';
                                                await deleteAvailabilityAction(formData);
                                            }}>
                                                <input type="hidden" name="slotId" value={slot.id} />
                                                <SubmitButton
                                                    loadingText=""
                                                    className="w-10 h-10 flex items-center justify-center bg-white text-gray-400 hover:text-red-600 hover:bg-red-50 border border-gray-100 rounded-xl transition-all shadow-none"
                                                >
                                                    <Trash2 size={18} />
                                                </SubmitButton>
                                            </form>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bg-linear-to-br from-indigo-500 to-blue-600 p-8 rounded-3xl text-white shadow-xs relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="text-lg font-black mb-2 flex items-center gap-2">
                                <AlertCircle size={20} />
                                Scheduling Tip
                            </h4>
                            <p className="text-indigo-50 text-sm leading-relaxed max-w-md">
                                To view or manage your confirmed student sessions, head over to the <span className="underline font-bold">Sessions</span> tab.
                            </p>
                        </div>
                        <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <Calendar size={160} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
