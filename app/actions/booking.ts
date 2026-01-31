'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ApiResponse, Booking } from '../types/intex';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getBookingsAction() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return { success: false, error: 'Authentication required' };
        }

        const res = await fetch(`${API_URL}/bookings`, {
            headers: { 'Authorization': `Bearer ${token}` },
            cache: 'no-store'
        });

        const data: ApiResponse<Booking[]> = await res.json();

        if (!res.ok) {
            return { success: false, error: data.message || 'Failed to fetch bookings' };
        }

        return { success: true, data: data.data };
    } catch (error) {
        console.error('getBookingsAction error:', error);
        return { success: false, error: 'Failed to connect to server' };
    }
}

export async function updateBookingStatusAction(bookingId: string, status: 'CANCELLED' | 'COMPLETED') {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return { success: false, error: 'Authentication required' };
        }

        const res = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, error: data.message || 'Update failed' };
        }

        revalidatePath('/dashboard/bookings');
        revalidatePath('/dashboard');
        return { success: true, message: data.message };
    } catch (error) {
        console.error('updateBookingStatusAction error:', error);
        return { success: false, error: 'Failed to connect to server' };
    }
}

export async function submitReviewAction(prevState: any, formData: FormData) {
    const tutorProfileId = formData.get('tutorProfileId') as string;
    const rating = Number(formData.get('rating'));
    const comment = formData.get('comment') as string;

    if (!tutorProfileId || !rating || !comment) {
        return { success: false, error: 'All fields are required' };
    }

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return { success: false, error: 'Unauthorized' };

        const res = await fetch(`${API_URL}/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ tutorProfileId, rating, comment })
        });

        const data = await res.json();
        if (!res.ok) return { success: false, error: data.message || 'Failed to submit review' };

        revalidatePath('/dashboard/bookings');
        return { success: true, message: 'Review submitted successfully' };
    } catch (error) {
        return { success: false, error: 'Connection error' };
    }
}
export async function deleteReviewAction(reviewId: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return { success: false, error: 'Unauthorized' };

        const res = await fetch(`${API_URL}/review/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (!res.ok) return { success: false, error: data.message || 'Failed to delete review' };

        revalidatePath('/dashboard/bookings');
        return { success: true, message: 'Review deleted successfully' };
    } catch (error) {
        return { success: false, error: 'Connection error' };
    }
}
