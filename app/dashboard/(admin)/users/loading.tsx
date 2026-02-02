export default function Loading() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <div className="w-48 h-8 bg-gray-200 rounded-lg animate-pulse mb-2" />
                <div className="w-64 h-5 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="w-48 h-10 bg-white border border-gray-200 rounded-xl animate-pulse" />
                </div>
                <div>
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="p-5 flex items-center gap-6 border-b last:border-0 border-gray-50">
                            <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse shrink-0" />
                            <div className="flex-1 grid grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <div className="w-32 h-4 bg-gray-100 rounded animate-pulse" />
                                    <div className="w-24 h-3 bg-gray-50 rounded animate-pulse" />
                                </div>
                                <div className="w-24 h-6 bg-blue-50 rounded-full animate-pulse self-center" />
                                <div className="w-20 h-4 bg-gray-100 rounded animate-pulse self-center" />
                                <div className="flex justify-end gap-2">
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
