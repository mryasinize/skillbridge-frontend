export default function HomeAdvantageSkeleton() {
    return (
        <section className="py-32 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-blue-600 rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-2xl shadow-blue-200">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="max-w-xl w-full">
                            <div className="h-4 w-32 bg-white/20 rounded-full mb-6 animate-pulse" />
                            <div className="h-16 w-3/4 bg-white/20 rounded-2xl mb-10 animate-pulse" />

                            <div className="space-y-10">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="w-16 h-16 bg-white/10 rounded-3xl flex-shrink-0 animate-pulse" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-6 w-40 bg-white/20 rounded animate-pulse" />
                                            <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] h-40 w-40 flex flex-col items-center justify-center gap-2">
                                    <div className="h-10 w-16 bg-white/20 rounded animate-pulse" />
                                    <div className="h-3 w-24 bg-white/10 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
