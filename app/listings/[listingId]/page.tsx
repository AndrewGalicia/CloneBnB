import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly"
import ListingClient from "./ListingClient"

interface IParams {
    listingId?: string
}

const ListingPage = async({params}: { params: IParams}) => {    
    
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser();
    return (
        <ClientOnly>
            <ListingClient
            listing={listing}
            currentUser={currentUser}>

            </ListingClient>
        </ClientOnly>
    )
}

export default ListingPage