import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please Login"
                />
            </ClientOnly>
        );
    }

    const reservations = await getReservations({
        userId: currentUser.id
    });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Trips Found"
                    subtitle="You have no upcoming trips."
                />
            </ClientOnly>
        );
    }

    const formattedCurrentUser = currentUser ? {
        ...currentUser,
        createdAT: currentUser.createdAT.toISOString(),
        updatedAT: currentUser.updatedAT,
        emailVerified: currentUser.emailVerified ? currentUser.emailVerified : null
    } : null;

    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={formattedCurrentUser}
            />
        </ClientOnly>
    );
}

export default TripsPage;
