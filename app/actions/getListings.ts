import prisma from "@/app/libs/prismadb"

export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAT: 'desc'
            } 
        });

        return listings;

    } catch (error:any) {
        throw new Error(error);
    }
    
}