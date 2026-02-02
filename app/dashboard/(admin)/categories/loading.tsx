export default function Loading() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <div className="w-48 h-8 bg-gray-200 rounded-lg animate-pulse mb-2" />
                    <div className="w-64 h-5 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="w-32 h-10 bg-gray-900/10 rounded-xl animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl animate-pulse shrink-0" />
                        <div className="flex-grow space-y-2">
                            <div className="w-24 h-5 bg-gray-100 rounded animate-pulse" />
                            <div className="w-16 h-3 bg-gray-50 rounded animate-pulse" />
                        </div>
                        <div className="flex gap-2">
                            <div className="w-8 h-8 bg-gray-50 rounded-lg animate-pulse" />
                            <div className="w-8 h-8 bg-gray-50 rounded-lg animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
