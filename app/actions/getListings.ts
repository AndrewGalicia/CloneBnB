import prisma from "@/app/libs/prismadb"

export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAT: 'desc'
            } 
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAT.toISOString(),
        })) ;
        return safeListings
    } catch (error:any) {
        throw new Error(error);
    }
    
}