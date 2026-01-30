'use server';

import { ApiResponse, Category, TutorProfile } from "@/app/types/intex";

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