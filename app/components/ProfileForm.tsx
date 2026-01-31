'use client';

import { updateProfileAction, updateTutorProfileAction } from '@/app/actions/user';
import { Category, User } from '@/app/types/intex';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { SubmitButton } from './SubmitButton';

interface ProfileFormProps {
    user: User;
    categories: Category[];
}

export default function ProfileForm({ user, categories }: ProfileFormProps) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [bio, setBio] = useState(user.tutorProfile?.bio || '');
    const [hourlyRate, setHourlyRate] = useState(user.tutorProfile?.hourlyRate || 0);
    const [categoryId, setCategoryId] = useState(user.tutorProfile?.categoryId || '');

    const [generalState, generalAction] = useActionState(updateProfileAction, null);
    const [tutorState, tutorAction] = useActionState(updateTutorProfileAction, null);

    useEffect(() => {
        if (generalState?.success) {
            toast.success(generalState.message);
        } else if (generalState?.error) {
            toast.error(generalState.error);
        }
    }, [generalState]);

    useEffect(() => {
        if (tutorState?.success) {
            toast.success(tutorState.message);
        } else if (tutorState?.error) {
            toast.error(tutorState.error);
        }
    }, [tutorState]);

    return (
        <>
            {/* General Information */}
            <form action={generalAction} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">General Information</h3>
                    <p className="text-sm text-gray-500 italic">Manage your account details.</p>
                </div>

                {generalState?.error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                        <p className="text-sm text-red-700 font-medium">{generalState.error}</p>
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Display Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <SubmitButton text="Save Changes" loadingText="Updating..." className="w-full sm:w-auto px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-none" />
                </div>
            </form>

            {/* Tutor Specific Information */}
            {user.role === 'TUTOR' && (
                <form action={tutorAction} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Tutor Profile</h3>
                        <p className="text-sm text-gray-500 italic">Configure your public tutor appearance.</p>
                    </div>

                    {tutorState?.error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                            <p className="text-sm text-red-700 font-medium">{tutorState.error}</p>
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Professional Bio</label>
                            <textarea
                                name="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={4}
                                required
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium resize-none"
                                placeholder="Describe your expertise, teaching style, and experience..."
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Hourly Rate ($)</label>
                                <input
                                    type="number"
                                    name="hourlyRate"
                                    value={hourlyRate}
                                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                                    min="0"
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Expertise Category</label>
                                <select
                                    name="categoryId"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium appearance-none"
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <SubmitButton text="Update Tutor Profile" loadingText="Updating..." className="w-full sm:w-auto px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-none" />
                    </div>
                </form>
            )}
        </>
    );
}
