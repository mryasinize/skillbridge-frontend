export default function Loading() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <div className="w-48 h-8 bg-gray-200 rounded-lg animate-pulse mb-2" />
                    <div className="w-64 h-5 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="w-32 h-10 bg-gray-800/10 rounded-xl animate-pulse" />
            </div>
            <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-48 h-32 bg-gray-100 rounded-xl animate-pulse shrink-0" />
                        <div className="flex-grow space-y-3">
                            <div className="flex justify-between">
                                <div className="w-32 h-6 bg-gray-100 rounded animate-pulse" />
                                <div className="w-20 h-6 bg-blue-50 rounded animate-pulse" />
                            </div>
                            <div className="w-64 h-5 bg-gray-50 rounded animate-pulse" />
                            <div className="w-full h-4 bg-gray-50 rounded animate-pulse" />
                            <div className="pt-2 flex gap-3">
                                <div className="w-24 h-8 bg-gray-100 rounded-lg animate-pulse" />
                                <div className="w-24 h-8 bg-gray-100 rounded-lg animate-pulse" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
