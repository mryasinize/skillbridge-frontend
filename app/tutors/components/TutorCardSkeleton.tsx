export default function TutorCardSkeleton() {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm h-full flex flex-col">
            <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl animate-pulse" />
                <div className="flex flex-col items-end gap-1">
                    <div className="w-16 h-8 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="w-10 h-3 bg-gray-100 rounded-sm animate-pulse" />
                </div>
            </div>

            <div className="mb-6">
                <div className="w-24 h-5 bg-blue-50 rounded-full animate-pulse mb-3" />
                <div className="w-48 h-8 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            <div className="space-y-2 mb-8">
                <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
                <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
                <div className="w-2/3 h-4 bg-gray-100 rounded animate-pulse" />
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-5 bg-gray-100 rounded animate-pulse" />
                    <div className="w-16 h-4 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="w-20 h-4 bg-gray-100 rounded animate-pulse" />
            </div>
        </div>
    );
}

export function TutorGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
            {[...Array(4)].map((_, i) => (
                <TutorCardSkeleton key={i} />
            ))}
        </div>
    );
}
