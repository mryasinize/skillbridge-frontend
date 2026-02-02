import TutorCardSkeleton from "@/app/tutors/components/TutorCardSkeleton";

export default function HomeFeaturedSkeleton() {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 animate-pulse">
                    <div className="h-4 w-32 bg-blue-100 rounded-full mx-auto mb-4" />
                    <div className="h-12 w-64 bg-gray-200 rounded-xl mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[...Array(3)].map((_, i) => (
                        <TutorCardSkeleton key={i} />
                    ))}
                </div>

                <div className="text-center mt-16 flex justify-center">
                    <div className="h-14 w-56 bg-gray-900/10 rounded-4xl animate-pulse" />
                </div>
            </div>
        </section>
    );
}
