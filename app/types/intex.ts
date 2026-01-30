export type ApiResponse<T> =
    | { success: true; data: T; message?: string }
    | { success: false; data?: T; message?: string; error?: string };

export type Category = {
    id: string;
    name: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    isBanned?: boolean;
    tutorProfile?: TutorProfile;
};

export type TutorProfile = {
    id: string;
    bio: string;
    hourlyRate: number;
    categoryId: string;
    userId: string;
    user: User;
    category: Category;
    reviews: Review[];
    availabilitySlots: AvailabilitySlot[];
};

export type Review = {
    id: string;
    rating: number;
    comment: string;
    studentId: string;
    tutorProfileId: string;
    createdAt: string;
};

export type AvailabilitySlot = {
    id: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
};

export type Booking = {
    id: string;
    studentId: string;
    tutorProfileId: string;
    categoryId: string;
    startTime: string;
    endTime: string;
    status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    student?: User;
    tutor?: TutorProfile;
};