export default function Loading() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-500">
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-8" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="hidden lg:block lg:col-span-1 lg:order-last">
                    <div className="sticky top-24">
                        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="w-24 h-8 bg-gray-200 rounded-lg animate-pulse" />
                                <div className="w-16 h-4 bg-gray-100 rounded animate-pulse" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-12 bg-gray-50 rounded-xl animate-pulse" />
                                <div className="h-12 bg-gray-50 rounded-xl animate-pulse" />
                            </div>
                            <div className="h-14 bg-blue-50 rounded-xl animate-pulse mt-4" />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                            <div className="w-28 h-28 bg-gray-100 rounded-3xl animate-pulse shrink-0" />
                            <div className="grow space-y-4">
                                <div className="flex gap-2">
                                    <div className="w-20 h-6 bg-blue-50 rounded-full animate-pulse" />
                                    <div className="w-24 h-6 bg-green-50 rounded-full animate-pulse" />
                                </div>
                                <div className="w-64 h-10 bg-gray-200 rounded-lg animate-pulse" />
                                <div className="flex gap-5">
                                    <div className="w-24 h-4 bg-gray-100 rounded animate-pulse" />
                                    <div className="w-24 h-4 bg-gray-100 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl animate-pulse" />
                            <div className="w-32 h-8 bg-gray-200 rounded-lg animate-pulse" />
                        </div>
                        <div className="space-y-3">
                            <div className="w-full h-4 bg-gray-50 rounded animate-pulse" />
                            <div className="w-full h-4 bg-gray-50 rounded animate-pulse" />
                            <div className="w-full h-4 bg-gray-50 rounded animate-pulse" />
                            <div className="w-2/3 h-4 bg-gray-50 rounded animate-pulse" />
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-amber-50 rounded-2xl animate-pulse" />
                                <div className="w-32 h-8 bg-gray-200 rounded-lg animate-pulse" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                                    <div className="flex justify-between mb-3">
                                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                    <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
