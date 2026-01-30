import { getAdminUsers } from "@/app/actions/admin";
import { getUserAction } from "@/app/actions/auth";
import UserModerationTable from "@/app/components/UserModerationTable";
import { redirect } from "next/navigation";

export default async function UsersPage() {
    const user = await getUserAction();

    if (!user) {
        redirect("/login")
    }

    if (user.role !== "ADMIN") {
        redirect("/dashboard")
    }

    const res = await getAdminUsers();
    const users = res.success ? res.data : [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <UserModerationTable initialUsers={users} />
        </div>
    );
}