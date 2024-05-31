import {Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<
Listing,
"createdAT"
> & {
    createdAT: String
}

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"> & {
        createdAt: string;
        startDate: string;
        endDate: string;
        listing: SafeListing
    }

export type SafeUser = Omit<
User,
"createdAT"| "updatedAT" | "emailVerified"> & 
{
    createdAT:string;
    updatedAT: string;
    emailVerified: string | null;
};

