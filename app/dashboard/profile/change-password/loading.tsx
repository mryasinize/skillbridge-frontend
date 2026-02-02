export default function Loading() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div className="w-48 h-8 bg-gray-200 rounded-lg animate-pulse mb-2" />
                <div className="space-y-4">
                    <div className="h-12 bg-gray-50 rounded-xl animate-pulse" />
                    <div className="h-12 bg-gray-50 rounded-xl animate-pulse" />
                    <div className="h-12 bg-gray-50 rounded-xl animate-pulse" />
                    <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse mt-4" />
                </div>
            </div>
        </div>
    );
}
