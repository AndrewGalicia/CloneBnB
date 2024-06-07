import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export default async function getListingById(params: IParams) {
    try {
        const { listingId } = params;

        if (!listingId) {
            throw new Error('No listingId provided');
        }

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });

        if (!listing) {
            return null;
        }

        const createdAt = listing.createdAT ? new Date(listing.createdAT).toISOString() : null;
        const userCreatedAt = listing.user?.createdAT ? new Date(listing.user.createdAT).toISOString() : null;
        const userUpdatedAt = listing.user?.updatedAT ? new Date(listing.user.updatedAT).toISOString() : null;
        const userEmailVerified = listing.user?.emailVerified ? new Date(listing.user.emailVerified).toISOString() : null;

        return {
            ...listing,
            createdAt,
            user: {
                ...listing.user,
                createdAt: userCreatedAt,
                updatedAt: userUpdatedAt,
                emailVerified: userEmailVerified,
            }
        };
    } catch (error: any) {
        console.error('Error in getListingById:', error); // Log the error for debugging
        throw new Error(error.message || 'Failed to fetch listing');
    }
}
