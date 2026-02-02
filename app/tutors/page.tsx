import { Suspense } from 'react';
import { getCategories } from '../actions/tutor';
import { TutorGridSkeleton } from './components/TutorCardSkeleton';
import TutorFilters from './components/TutorFilters';
import TutorList from './components/TutorList';

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
    const categories = await getCategories()

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col lg:flex-row gap-8">
                <TutorFilters categories={categories} />

                <div className="flex-grow">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-gray-900 mb-1">Our Specialized Tutors</h1>
                        <p className="text-gray-500">
                            Find the perfect expert for your needs
                        </p>
                    </div>
                    <Suspense key={JSON.stringify(params)} fallback={<TutorGridSkeleton />}>
                        <TutorList searchParams={searchParams} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
