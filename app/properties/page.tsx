import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
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

    const listings = await getListings({
        userId: currentUser.id
    });

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Caves Found"
                    subtitle="You have no upcoming properties."
                />
            </ClientOnly>
        );
    }

    const formattedListings = listings.map(listing => ({
        ...listing,
        createdAT: listing.createdAT.toISOString() // Convert Date to ISO string
    }));

    const formattedCurrentUser = currentUser ? {
        ...currentUser,
        createdAT: currentUser.createdAT.toISOString(),
        updatedAT: currentUser.updatedAT,
        emailVerified: currentUser.emailVerified ? currentUser.emailVerified : null
    } : null;

    return (
        <ClientOnly>
            <PropertiesClient
                listings={formattedListings}
                currentUser={formattedCurrentUser}
            />
        </ClientOnly>
    );
}

export default PropertiesPage;
