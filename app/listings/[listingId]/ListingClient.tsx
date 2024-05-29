'use client'
import { SafeListing, SafeUser } from "@/app/Types";
import Container from "@/app/components/Container/Container";
import { categories } from "@/app/components/NavBar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";
interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;

}

export default function ListingClient({listing, currentUser }: ListingClientProps) {
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category])
    return(
        <Container>
            <div className="flex flex-col gap-7">
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}></ListingHead>
            </div>
            <div className="
            grid
            grid-cols-1
            md:grid-cols-7
            md:gap-10
            mt:6">
                <ListingInfo
                    user={listing.user}
                    category={category}
                    description={listing.description}
                    roomCount={listing.roomCount}
                    guestCount={listing.guestCount}
                    bathroomCount={listing.bathroomCount}
                    locaitonValue={listing.locationValue}/>

                
            </div>
        </Container>
    )
}