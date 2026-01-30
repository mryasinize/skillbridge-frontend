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
