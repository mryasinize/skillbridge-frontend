export default function HomeCategoriesSkeleton() {
    return (
        <section className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-pulse">
                    <div className="h-4 w-40 bg-blue-100 rounded-full mx-auto mb-4" />
                    <div className="h-10 w-80 bg-gray-200 rounded-xl mx-auto mb-2" />
                    <div className="h-4 w-64 bg-gray-100 rounded-full mx-auto mt-4" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-32 flex flex-col items-center justify-center gap-3">
                            <div className="h-6 w-24 bg-gray-200 rounded-lg animate-pulse" />
                            <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
