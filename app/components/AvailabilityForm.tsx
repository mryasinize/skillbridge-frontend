'use client';

import { addAvailabilityAction } from '@/app/actions/tutor';
import { Calendar, Clock, Plus } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { SubmitButton } from './SubmitButton';

export default function AvailabilityForm() {
    const [state, action] = useActionState(addAvailabilityAction, null);

    const handleAction = (formData: FormData) => {
        const startTime = formData.get('startTime') as string;
        const endTime = formData.get('endTime') as string;

        if (!startTime || !endTime) {
            toast.error("Start and end times are required");
            return;
        }

        if (new Date(startTime) >= new Date(endTime)) {
            toast.error("Start time must be before end time");
            return;
        }

        formData.set('startTime', new Date(startTime).toISOString());
        formData.set('endTime', new Date(endTime).toISOString());

        action(formData);
    }

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message);
        } else if (state?.error) {
            toast.error(state.error);
        }
    }, [state]);

    return (
        <form action={handleAction} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <Calendar size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">Add Availability</h3>
                    <p className="text-sm text-gray-500 italic">Open a new slot for students.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                        <Clock size={12} /> Start Time
                    </label>
                    <input
                        type="datetime-local"
                        name="startTime"
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    />
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                        <Clock size={12} /> End Time
                    </label>
                    <input
                        type="datetime-local"
                        name="endTime"
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    />
                </div>
            </div>

            <div className="pt-2">
                <SubmitButton
                    loadingText="Adding Slot..."
                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-none flex items-center justify-center gap-2"
                >
                    <Plus size={18} />
                    Add Availability Slot
                </SubmitButton>
            </div>
        </form>
    );
}
