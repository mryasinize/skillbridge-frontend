import { TutorGridSkeleton } from "./components/TutorCardSkeleton";


export default function Loading() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="w-full lg:w-80 flex-shrink-0">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                            <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
                        </div>

                        <div className="space-y-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i}>
                                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mb-2" />
                                    <div className="w-full h-12 bg-gray-50 rounded-xl animate-pulse" />
                                </div>
                            ))}
                            <div className="pt-2 space-y-2">
                                <div className="w-full h-12 bg-blue-50 rounded-xl animate-pulse" />
                                <div className="w-full h-8 bg-gray-50 rounded-xl animate-pulse" />
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="flex-grow">
                    <div className="mb-8">
                        <div className="w-64 h-10 bg-gray-200 rounded-lg animate-pulse mb-2" />
                        <div className="w-32 h-5 bg-gray-100 rounded animate-pulse" />
                    </div>

                    <TutorGridSkeleton />
                </div>
            </div>
        </main>
    );
}