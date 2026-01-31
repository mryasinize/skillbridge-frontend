import { getUserAction } from "@/app/actions/auth";
import { getBookingsAction } from "@/app/actions/booking";
import { redirect } from "next/navigation";
import BookingClient from "@/app/components/BookingClient";

export default async function BookingsPage() {
    const user = await getUserAction();
    if (!user) {
        redirect('/login');
    }

    const bookingsRes = await getBookingsAction();
    const bookings = bookingsRes.success ? bookingsRes.data || [] : [];

    return (
        <main>
            <BookingClient
                initialBookings={bookings}
                currentUser={user}
            />
        </main>
    );
}