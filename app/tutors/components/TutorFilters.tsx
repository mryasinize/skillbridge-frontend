'use client';

import { ChevronDown, DollarSign, Filter, Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Category } from '../../types/intex';

interface TutorFiltersProps {
    categories: Category[];
}

export default function TutorFilters({ categories }: TutorFiltersProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoryId') || '');
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
    const [isPending, startTransition] = useTransition();

    const handleFilter = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('searchTerm', searchTerm);
        if (selectedCategory) params.set('categoryId', selectedCategory);
        if (minPrice) params.set('minPrice', minPrice);
        if (maxPrice) params.set('maxPrice', maxPrice);
        startTransition(() => {
            router.push(`/tutors?${params.toString()}`);
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        startTransition(() => {
            router.push('/tutors');
        });
    };

    return (
        <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                    <Filter size={18} className="text-blue-600" />
                    <h2 className="text-lg font-black text-gray-900">Filters</h2>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Search</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Name, skill..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Category</label>
                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer text-sm"
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Price Range</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="w-full pl-7 pr-2 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                                <DollarSign size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-full pl-7 pr-2 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                                <DollarSign size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 space-y-2">
                        <button
                            disabled={isPending}
                            onClick={handleFilter}
                            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending &&
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            }
                            Apply Filters
                        </button>
                        <button
                            onClick={clearFilters}
                            className="w-full text-gray-400 py-2 text-xs font-bold uppercase tracking-wide hover:text-gray-600 transition-colors flex items-center justify-center gap-1"
                        >
                            <X size={12} /> Clear
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
