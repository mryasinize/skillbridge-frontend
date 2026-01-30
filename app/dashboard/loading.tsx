import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
                <p className="text-gray-600 text-lg">Loading dashboard...</p>
            </div>
        </div>
    );
}