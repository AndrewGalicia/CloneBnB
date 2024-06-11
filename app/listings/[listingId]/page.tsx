import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listings = await getListingById(params);
    const reservations = await getReservations({ listingId: params.listingId });
    const currentUser = await getCurrentUser();
   

    const formattedCurrentUser = currentUser ? {
        ...currentUser,
        createdAT: currentUser.createdAT.toISOString(),
        updatedAT: currentUser.updatedAT,
        emailVerified: currentUser.emailVerified ? currentUser.emailVerified : null
    } : null;
    return (
        <ClientOnly>
            
            <ListingClient
                listing={listings}
                reservations={reservations}
                currentUser={formattedCurrentUser}
            />
        
        </ClientOnly>
    );
};

export default ListingPage;
