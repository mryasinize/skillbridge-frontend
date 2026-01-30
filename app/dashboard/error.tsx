"use client";

import { useRouter } from "next/navigation";

export default function ErrorPage() {
    const router = useRouter();
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Something went wrong</h2>
                    <p className="mt-2 text-sm text-gray-600">Please try again later</p>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={() => router.push('/login')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        </div>
    );
}