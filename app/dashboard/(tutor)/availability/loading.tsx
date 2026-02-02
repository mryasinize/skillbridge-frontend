export default function Loading() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div>
                <div className="w-48 h-8 bg-gray-200 rounded-lg animate-pulse mb-2" />
                <div className="w-64 h-5 bg-gray-100 rounded animate-pulse" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <div className="w-32 h-6 bg-gray-100 rounded animate-pulse" />
                        <div className="space-y-4">
                            <div className="h-12 bg-gray-50 rounded-xl animate-pulse" />
                            <div className="h-12 bg-gray-50 rounded-xl animate-pulse" />
                            <div className="h-12 bg-gray-50 rounded-xl animate-pulse" />
                            <div className="h-12 bg-gray-200 rounded-xl animate-pulse mt-4" />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl animate-pulse" />
                                <div className="w-32 h-6 bg-gray-100 rounded animate-pulse" />
                            </div>
                            <div className="w-24 h-6 bg-gray-50 rounded-full animate-pulse" />
                        </div>
                        <div className="space-y-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-20 bg-gray-50 rounded-2xl animate-pulse border border-gray-100" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
