import { Search } from 'lucide-react';
import Link from 'next/link';
import { getCategories, getTutors } from '../actions/tutor';
import TutorCard from '../components/TutorCard';
import TutorFilters from '../components/TutorFilters';

interface PageProps {
    searchParams: Promise<{
        searchTerm?: string;
        categoryId?: string;
        minPrice?: string;
        maxPrice?: string;
    }>;
}

export default async function TutorsPage({ searchParams }: PageProps) {
    const params = await searchParams;

    const [categories, tutors] = await Promise.all([
        getCategories(),
        getTutors({
            categoryId: params.categoryId,
            searchTerm: params.searchTerm,
            minPrice: params.minPrice ? Number(params.minPrice) : undefined,
            maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
        })
    ]);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col lg:flex-row gap-8">
                <TutorFilters categories={categories} />

                <div className="flex-grow">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-gray-900 mb-1">Our Specialized Tutors</h1>
                        <p className="text-gray-500">
                            {tutors.length} {tutors.length === 1 ? 'expert' : 'experts'} available
                        </p>
                    </div>

                    {tutors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {tutors.map(tutor => (
                                <TutorCard key={tutor.id} tutor={tutor} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                            <Search size={32} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                            <p className="text-gray-500 mb-6">Try adjusting your filters</p>
                            <Link
                                href="/tutors"
                                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all"
                            >
                                Clear Filters
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
