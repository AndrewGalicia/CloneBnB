import prisma from "@/app/libs/prismadb"
import { SafeReservation } from "@/app/Types";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(
    params: IParams
): Promise<SafeReservation[]> {
    try {
        const { listingId, userId, authorId } = params;

        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = {
                userId: authorId
            };
        }

        console.log('Query:', query);  // Add logging to track the query

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        console.log('Reservations:', reservations);  // Add logging to track the reservations

        const safeReservations: SafeReservation[] = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAT: reservation.listing.createdAT.toISOString()
            }
        }));

        return safeReservations;
    } catch (error: any) {
        console.error('Error fetching reservations:', error);  // Add logging for errors
        throw new Error(error.message);  // Ensure the error message is properly thrown
    }
}
