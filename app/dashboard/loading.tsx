export default function Loading() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <div className="w-48 h-8 bg-gray-200 rounded-lg animate-pulse mb-2" />
                <div className="w-64 h-5 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl animate-pulse" />
                            <div className="w-16 h-6 bg-gray-100 rounded-lg animate-pulse" />
                        </div>
                        <div className="w-24 h-8 bg-gray-100 rounded-lg animate-pulse mb-2" />
                        <div className="w-32 h-4 bg-gray-50 rounded animate-pulse" />
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="w-48 h-8 bg-gray-100 rounded-lg animate-pulse" />
                    <div className="w-24 h-8 bg-gray-100 rounded-lg animate-pulse" />
                </div>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 w-full bg-gray-50 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
}