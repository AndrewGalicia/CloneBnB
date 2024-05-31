import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ReservationClient from "./ReservationClient";
import { SafeReservation, SafeUser } from "@/app/Types";

const Reservation = async () => {
    const currentUser: SafeUser | null = await getCurrentUser();

    console.log('Current User:', currentUser);

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        );
    }

    const reservations: SafeReservation[] = await getReservations({
        authorId: currentUser.id,
    });

    console.log('Reservations:', reservations);

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservations found"
                    subtitle="Looks like you have no reservations, or caves"
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ReservationClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default Reservation;
