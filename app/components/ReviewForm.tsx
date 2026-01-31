'use client';

import { submitReviewAction } from '@/app/actions/booking';
import { MessageSquare, Star, X } from 'lucide-react';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

export default function ReviewForm({
    tutorProfileId,
    onSuccess,
    onCancel
}: {
    tutorProfileId: string;
    onSuccess: () => void;
    onCancel: () => void;
}) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleSubmit = async (formData: FormData) => {
        const result = await submitReviewAction(null, formData);
        if (result.success) {
            toast.success(result.message);
            onSuccess();
        } else {
            toast.error(result.error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xl animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-gray-900">Leave a Review</h3>
                <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20} />
                </button>
            </div>

            <form action={handleSubmit} className="space-y-6">
                <input type="hidden" name="tutorProfileId" value={tutorProfileId} />
                <input type="hidden" name="rating" value={rating} />

                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${star <= rating
                                    ? 'bg-yellow-50 text-yellow-500 shadow-sm'
                                    : 'bg-gray-50 text-gray-300 hover:bg-gray-100'
                                    }`}
                            >
                                <Star size={20} fill={star <= rating ? "currentColor" : "none"} />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Your Feedback</label>
                    <textarea
                        name="comment"
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="How was your session? Share your experience..."
                        className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-medium"
                    />
                </div>

                <SubmitButton />
            </form>
        </div>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-black text-sm hover:bg-black transition-all shadow-xl shadow-gray-200 hover:shadow-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {pending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <>
                    <MessageSquare size={18} />
                    Post Review
                </>
            )}
        </button>
    );
}
