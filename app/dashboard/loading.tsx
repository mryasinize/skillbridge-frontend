import Spinner from "@/app/components/Spinner";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Spinner message="Loading dashboard..." />
        </div>
    );
}