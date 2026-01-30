import { getUserAction } from "@/app/actions/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const user = await getUserAction();

    if (user!.role !== "ADMIN") {
        redirect("/dashboard")
    }

    return <div>{children}</div>;
}