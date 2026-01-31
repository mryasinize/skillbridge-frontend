import Spinner from "@/app/components/Spinner";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-[50vh]">
            <Spinner message="Loading tutor profile..." />
        </div>
    );
}