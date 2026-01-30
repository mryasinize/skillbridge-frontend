import Spinner from "@/app/components/Spinner";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-full">
            <Spinner message="Loading dashboard..." />
        </div>
    );
}