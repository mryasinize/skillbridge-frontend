'use server';

import { ApiResponse, User } from "@/app/types/intex";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function registerAction(prevState: any, formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const role = formData.get('role');
    const bio = formData.get('bio');
    const hourlyRate = formData.get('hourlyRate');
    const categoryId = formData.get('categoryId');

    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password,
                role,
                tutorProfile: role === 'TUTOR' ? {
                    bio,
                    hourlyRate: Number(hourlyRate),
                    categoryId
                } : undefined
            }),
        });

        const { success, message, data }: ApiResponse<{ token: string, user: User }> = await res.json();

        if (!success) {
            return { success: false, error: message };
        }

        const cookieStore = await cookies();
        cookieStore.set('token', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    } catch (err) {
        return { success: false, error: 'Failed to connect to server' };
    }
    redirect('/dashboard');
}

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const { success, message, data }: ApiResponse<{ token: string, user: User }> = await res.json();

        if (!success) {
            return { error: message || 'Login failed' };
        }

        const cookieStore = await cookies();
        cookieStore.set('token', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    } catch (err) {
        return { error: 'Failed to connect to server' };
    }
    redirect('/dashboard');
}