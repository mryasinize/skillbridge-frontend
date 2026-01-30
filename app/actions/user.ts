'use server';

import { cookies } from "next/headers";
import { ApiResponse } from "../types/intex";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface UnifiedTutorStats {
    totalStudents: number;
    hoursTaught: number;
    totalEarnings: number;
    averageRating: number;
    upcomingSessions: Array<{
        id: string;
        studentName: string;
        startTime: string;
        endTime: string;
    }>;
}

export interface UnifiedStudentStats {
    activeBookings: number;
    completedHours: number;
    learningPoints: number;
    nextSession: {
        id: string;
        title: string;
        tutorName: string;
        startTime: string;
        endTime: string;
    } | null;
}

export type UserStats = UnifiedTutorStats | UnifiedStudentStats;

export async function getUserStatsAction(): Promise<ApiResponse<{ stats: UserStats }>> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return { success: false, error: 'Unauthorized' };

        const res = await fetch(`${API_URL}/user/stats`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store'
        });

        const data: ApiResponse<{ stats: UserStats }> = await res.json();
        return data;
    } catch (error) {
        console.error('getUserStatsAction error:', error);
        return { success: false, error: 'Connection error' };
    }
}

export async function updateProfileAction(prevState: any, formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return { success: false, error: 'Unauthorized' };

        const res = await fetch(`${API_URL}/user/profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, email })
        });

        const data = await res.json();
        if (!res.ok) return { success: false, error: data.message || 'Failed to update profile' };

        return { success: true, message: 'Profile updated successfully' };
    } catch (error) {
        return { success: false, error: 'Connection error' };
    }
}

export async function updateTutorProfileAction(prevState: any, formData: FormData) {
    const bio = formData.get('bio');
    const hourlyRate = Number(formData.get('hourlyRate'));
    const categoryId = formData.get('categoryId');

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return { success: false, error: 'Unauthorized' };

        const res = await fetch(`${API_URL}/tutor/profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ bio, hourlyRate, categoryId })
        });

        const data = await res.json();
        if (!res.ok) return { success: false, error: data.message || 'Failed to update tutor profile' };

        return { success: true, message: 'Tutor profile updated successfully' };
    } catch (error) {
        return { success: false, error: 'Connection error' };
    }
}
