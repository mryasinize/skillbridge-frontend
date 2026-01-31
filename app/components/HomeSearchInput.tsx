"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearchInput() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const params = new URLSearchParams();
            params.set("searchTerm", searchQuery.trim());
            router.push(`/tutors?${params.toString()}`);
        }
    };
    return (
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-10 group">
            <div className="absolute inset-0 bg-blue-600/5 blur-2xl group-focus-within:bg-blue-600/10 transition-all rounded-[2.5rem]"></div>
            <div className="relative flex items-center bg-white border border-gray-100 p-2 rounded-[2.5rem] shadow-xl shadow-blue-900/5 focus-within:border-blue-200 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                <div className="pl-6 text-gray-400">
                    <Search size={24} />
                </div>
                <input
                    type="text"
                    placeholder="Search for any subject (e.g. Photoshop, Calculus, Python)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full outline-none bg-transparent border-none focus:ring-0 px-4 py-4 text-gray-900 font-bold placeholder:text-gray-300 placeholder:font-medium"
                />
                <button type="submit" className="bg-blue-600 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-blue-200">
                    Search
                </button>
            </div>
        </form>
    )
}