import { getCategoriesAction } from "@/app/actions/admin";
import CategoryManager from "@/app/components/CategoryManager";
import { AlertCircle } from "lucide-react";
import { getUserAction } from "@/app/actions/auth";
import { redirect } from "next/navigation";

export default async function CategoriesPage() {
    const user = await getUserAction();
    if (!user || user.role !== "ADMIN") {
        return redirect("/login");
    }

    const res = await getCategoriesAction();

    if (!res.success) {
        return (
            <div className="p-8 bg-red-50 rounded-3xl border border-red-100 flex items-center gap-4 text-red-600">
                <AlertCircle />
                <p className="font-bold">{res.error || "Failed to load categories"}</p>
            </div>
        );
    }

    return (
        <div>
            <CategoryManager initialCategories={res.data || []} />
        </div>
    );
}