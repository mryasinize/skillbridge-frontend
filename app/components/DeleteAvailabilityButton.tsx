'use client';

import { useActionState } from "react";
import { deleteAvailabilityAction } from "../actions/tutor";
import { useEffect } from "react";
import { toast } from "sonner";
import { SubmitButton } from "./SubmitButton";
import { Trash2 } from "lucide-react";

export default function DeleteAvailabilityButton({ slotId }: { slotId: string }) {
    const [state, action] = useActionState(deleteAvailabilityAction, null);

    useEffect(() => {
        if (state?.error) {
            toast.error(state.error);
        }
    }, [state]);
    return (
        <form action={action}>
            <input type="hidden" name="slotId" value={slotId} />
            <SubmitButton
                loadingText="Deleting..."
                className="p-3 flex items-center justify-center text-red-600 bg-red-50 hover:bg-red-100 cursor-pointer border border-gray-100 rounded-xl transition-all shadow-none"
            >
                <Trash2 size={18} />
            </SubmitButton>
        </form>
    )
}