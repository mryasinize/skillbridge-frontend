'use server';

import { ApiResponse, Category, TutorProfile } from "@/app/types/intex";
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${API_URL}/categories`, {
            cache: 'no-store'
        });
        const data: ApiResponse<Category[]> = await res.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function getTutors(params?: {
    categoryId?: string,
    minPrice?: number,
    maxPrice?: number,
    searchTerm?: string
}): Promise<TutorProfile[]> {
    try {
        const queryParams = new URLSearchParams();
        if (params?.categoryId) queryParams.append('categoryId', params.categoryId);
        if (params?.minPrice) queryParams.append('minPrice', params.minPrice.toString());
        if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
        if (params?.searchTerm) queryParams.append('searchTerm', params.searchTerm);

        const url = `${API_URL}/tutors${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const res = await fetch(url, {
            cache: 'no-store'
        });
        const data: ApiResponse<TutorProfile[]> = await res.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data.data;
    } catch (error) {
        console.error('Error fetching tutors:', error);
        return [];
    }
}

export async function addAvailabilityAction(prevState: any, formData: FormData) {
    const startTime = formData.get('startTime') as string;
    const endTime = formData.get('endTime') as string;

    if (!startTime || !endTime) {
        return { success: false, error: 'Start and end times are required' };
    }

    if (new Date(startTime) >= new Date(endTime)) {
        return { success: false, error: 'Start time must be before end time' };
    }

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return { success: false, error: 'Unauthorized' };

        const res = await fetch(`${API_URL}/tutor/availability`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ startTime, endTime })
        });

        const result = await res.json();
        if (!res.ok) return { success: false, error: result.message || 'Failed to add slot' };

        revalidatePath('/dashboard/availability');
        return { success: true, message: 'Slot added successfully' };
    } catch (error) {
        return { success: false, error: 'Connection error' };
    }
}

export async function deleteAvailabilityAction(formData: FormData) {
    const slotId = formData.get('slotId') as string;
    if (!slotId) return { success: false, error: 'Slot ID is required' };

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return { success: false, error: 'Unauthorized' };

        const res = await fetch(`${API_URL}/tutor/availability/${slotId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const result = await res.json();
        if (!res.ok) return { success: false, error: result.message || 'Failed to delete slot' };

        revalidatePath('/dashboard/availability');
        return { success: true, message: 'Slot deleted' };
    } catch (error) {
        return { success: false, error: 'Connection error' };
    }
}

export async function getTutorById(id: string): Promise<TutorProfile | null> {
    try {
        const res = await fetch(`${API_URL}/tutors/${id}`, {
            cache: 'no-store'
        });
        const data: ApiResponse<TutorProfile> = await res.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data.data;
    } catch (error) {
        console.error('Error fetching tutor by id:', error);
        return null;
    }
}
