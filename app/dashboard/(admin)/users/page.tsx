import { getAdminUsers } from "@/app/actions/admin";
import UserModerationTable from "@/app/components/UserModerationTable";

export default async function UsersPage() {
    const res = await getAdminUsers();
    const users = res.success ? res.data : [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <UserModerationTable initialUsers={users} />
        </div>
    );
}