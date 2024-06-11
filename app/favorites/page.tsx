import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"

import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoriteListings"
import FavoritesClient from "./FavoritesClient"

const ListingPage = async() => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

     // Convert createdAt field to string
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

    if (formattedListings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Favorites found"
                    subtitle="Looks like you have no fav listings"/>
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <FavoritesClient
                listings={formattedListings}
                currentUser={formattedCurrentUser}/>
        </ClientOnly>
    )
}

export default ListingPage;