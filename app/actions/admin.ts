'use server';

import { cookies } from "next/headers";
import { ApiResponse, User } from "@/app/types/intex";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface AdminStats {
    totalStudents: number;
    totalTutors: number;
    totalBookings: number;
}

export async function getAdminAnalytics(): Promise<ApiResponse<AdminStats>> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return { success: false, error: 'Unauthorized' };

        const res = await fetch(`${API_URL}/admin/analytics`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store'
        });

        const data: ApiResponse<AdminStats> = await res.json();
        return data;
    } catch (error) {
        console.error('getAdminAnalytics error:', error);
        return { success: false, error: 'Connection error' };
    }
}

export async function getAdminUsers(): Promise<ApiResponse<User[]>> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return { success: false, error: 'Unauthorized' };

        const res = await fetch(`${API_URL}/admin/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store'
        });

        const data: ApiResponse<User[]> = await res.json();
        return data;
    } catch (error) {
        console.error('getAdminUsers error:', error);
        return { success: false, error: 'Connection error' };
    }
}

export async function moderateUser(userId: string, action: 'BAN' | 'UNBAN'): Promise<ApiResponse<any>> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return { success: false, error: 'Unauthorized' };

        const res = await fetch(`${API_URL}/admin/users/${userId}/moderate?action=${action}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data: ApiResponse<any> = await res.json();
        return data;
    } catch (error) {
        console.error('moderateUser error:', error);
        return { success: false, error: 'Connection error' };
    }
}

export async function createCategoryAction(name: string): Promise<ApiResponse<any>> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return { success: false, error: 'Unauthorized' };

        const res = await fetch(`${API_URL}/admin/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('createCategoryAction error:', error);
        return { success: false, error: 'Connection error' };
    }
}

export async function updateCategoryAction(id: string, name: string): Promise<ApiResponse<any>> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return { success: false, error: 'Unauthorized' };

        const res = await fetch(`${API_URL}/admin/categories/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('updateCategoryAction error:', error);
        return { success: false, error: 'Connection error' };
    }
}

export async function deleteCategoryAction(id: string): Promise<ApiResponse<any>> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) return { success: false, error: 'Unauthorized' };

        const res = await fetch(`${API_URL}/admin/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('deleteCategoryAction error:', error);
        return { success: false, error: 'Connection error' };
    }
}

export async function getCategoriesAction(): Promise<ApiResponse<any[]>> {
    try {
        const res = await fetch(`${API_URL}/categories`, {
            cache: 'no-store'
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('getCategoriesAction error:', error);
        return { success: false, error: 'Connection error' };
    }
}