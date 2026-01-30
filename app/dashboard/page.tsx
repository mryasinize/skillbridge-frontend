import { redirect } from "next/navigation";
import { getUserAction } from "@/app/actions/auth";

export default async function Dashboard() {
    const user = await getUserAction();

    if (!user) {
        redirect('/login')
    }
    return (
        <div>Overview for <b>{user.name} ({user.role})</b></div>
    );
}
