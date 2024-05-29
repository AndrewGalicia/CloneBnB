import {Listing, User } from "@prisma/client";

export type SafeListing = Omit<
Listing,
"createdAT"
> & {
    createdAT: String
}
export type SafeUser = Omit<
User,
"createdAT"| "updatedAT" | "emailVerified"> & 
{
    createdAT:string;
    updatedAT: string;
    emailVerieid: string | null;
};

