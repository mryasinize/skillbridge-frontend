import Link from 'next/link';
import {
    Calendar,
    ChevronRight,
    ShieldCheck
} from 'lucide-react';
import TutorCard from './TutorCard';
import { getHomeStatsAction } from '@/app/actions/user';

export default async function HomeContent() {
    const stats = await getHomeStatsAction();
    const { categories, featuredTutors, totalStudents, totalTutors } = stats;

    return (
        <>
            {/* Categories Section */}
            <section className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] block mb-4">Discovery Center</span>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Browse by Category</h2>
                        <p className="text-gray-400 font-medium mt-2 italic">Find the perfect expert for your learning journey</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/tutors?categoryId=${category.id}`}
                                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group text-center"
                            >
                                <h3 className="text-lg font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{category.name}</h3>
                                <p className="text-gray-400 font-black text-[9px] uppercase tracking-widest">
                                    EXPLORE
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Tutors Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] block mb-4">Elite Mentors</span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Featured Tutors</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {featuredTutors.slice(0, 3).map((tutor) => (
                            <TutorCard key={tutor.id} tutor={tutor} />
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <Link href="/tutors" className="inline-flex items-center gap-2 bg-gray-900 text-white px-12 py-5 rounded-4xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl active:scale-95">
                            Browse All Experts <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Advantage Section */}
            <section className="py-32 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-blue-600 rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-2xl shadow-blue-200">
                        <div className="absolute top-0 right-0 w-160 h-160 bg-black/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                            <div className="max-w-xl text-white">
                                <span className="text-white/60 font-black text-[10px] uppercase tracking-[0.3em] block mb-6">The Advantage</span>
                                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-[0.9] tracking-tighter">Why learn with SkillBridge?</h2>
                                <div className="space-y-10">
                                    {[
                                        { title: "Verified Experts", desc: "Every tutor undergoes a rigorous vetting process.", icon: ShieldCheck },
                                        { title: "Flexible Scheduling", desc: "Book sessions that fit your life, instantly.", icon: Calendar }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-6">
                                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center shrink-0 border border-white/20">
                                                <item.icon size={28} />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-xl mb-1">{item.title}</h4>
                                                <p className="text-blue-50 font-medium opacity-80">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                                {[
                                    { val: totalStudents, label: "ACTIVE STUDENTS" },
                                    { val: totalTutors, label: "EXPERT TUTORS" },
                                    { val: "99%", label: "SATISFACTION" },
                                    { val: "24/7", label: "SUPPORT" }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] text-center text-white">
                                        <div className="text-4xl font-black mb-1">{stat.val}</div>
                                        <div className="text-[10px] font-black opacity-60 tracking-[0.2em]">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
