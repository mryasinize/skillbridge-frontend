import { getUserAction } from '@/app/actions/auth';
import ChangePasswordForm from '@/app/components/ChangePasswordForm';
import { redirect } from 'next/navigation';

export default async function ChangePasswordPage() {
    const user = await getUserAction();
    if (!user) {
        redirect('/login');
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <div className="w-full">
                <ChangePasswordForm />
            </div>
        </div>
    );
}
