import { Calendar, Clock, Layers, LayoutDashboard, UserCircle, Users } from "lucide-react";

export const sharedNavigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'All Bookings', href: '/dashboard/bookings', icon: Calendar },
    { name: 'My Profile', href: '/dashboard/profile', icon: UserCircle }
]

export const navigation = {
    ADMIN: [
        ...sharedNavigation,
        { name: 'User Management', href: '/dashboard/users', icon: Users },
        { name: 'Categories', href: '/dashboard/categories', icon: Layers },
    ],
    STUDENT: [
        ...sharedNavigation
    ],
    TUTOR: [
        ...sharedNavigation,
        { name: 'Availability', href: '/dashboard/availability', icon: Clock },
    ]
};