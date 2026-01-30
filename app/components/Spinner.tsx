import { Loader2 } from "lucide-react";

export default function Spinner({ message }: { message: string }) {
    return (
        <div className="flex items-center gap-2">
            <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
            <p className="text-gray-600 text-lg">{message || "Loading..."}</p>
        </div>
    );
}