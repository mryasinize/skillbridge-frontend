import TutorCard from "@/app/components/TutorCard";
import { getTutors } from "../../actions/tutor";
import { Search } from "lucide-react";
import Link from "next/link";

export default async function TutorList({ searchParams }: { searchParams: Promise<any> }) {
    const params = await searchParams;
    const tutors = await getTutors({
        categoryId: params.categoryId,
        searchTerm: params.searchTerm,
        minPrice: params.minPrice ? Number(params.minPrice) : undefined,
        maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    })
    return tutors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutors.map(tutor => (
                <TutorCard key={tutor.id} tutor={tutor} />
            ))}
        </div>
    ) : (
        <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <Search size={32} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters</p>
            <Link
                href="/tutors"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all"
            >
                Clear Filters
            </Link>
        </div>
    )

}