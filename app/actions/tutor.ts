'use server';

import { ApiResponse, Category } from "@/app/types/intex";

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