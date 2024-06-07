import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: any) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const body = await request.json();
        const { listingId, startDate, endDate, totalPrice } = body;

        if (!listingId || !startDate || !endDate || !totalPrice) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const listingAndReservation = await prisma.listing.update({
            where: { id: listingId },
            data: {
                reservations: {
                    create: {
                        userId: currentUser.id,
                        startDate: new Date(startDate),
                        endDate: new Date(endDate),
                        totalPrice
                    }
                }
            }
        });

        return NextResponse.json(listingAndReservation);
    } catch (error) {
        console.error('Error creating reservation:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
