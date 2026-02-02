export default function Loading() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <div className="w-48 h-8 bg-gray-200 rounded-lg animate-pulse mb-2" />
                    <div className="w-64 h-5 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="w-32 h-10 bg-gray-800/10 rounded-xl animate-pulse" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-24 h-24 bg-gray-100 rounded-2xl animate-pulse" />
                        <div className="space-y-2">
                            <div className="w-32 h-4 bg-gray-100 rounded animate-pulse" />
                            <div className="w-48 h-3 bg-gray-50 rounded animate-pulse" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2 h-12 bg-gray-50 rounded-xl animate-pulse" />
                        <div className="h-12 bg-gray-50 rounded-xl animate-pulse" />
                        <div className="h-12 bg-gray-50 rounded-xl animate-pulse" />
                        <div className="col-span-2 h-32 bg-gray-50 rounded-xl animate-pulse" />
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="h-64 bg-indigo-50 rounded-3xl animate-pulse" />
                    <div className="h-32 bg-gray-50 rounded-3xl animate-pulse" />
                </div>
            </div>
        </div>
    );
}
