import { User } from "@prisma/client";

export type SafeUser = OMit<
User,
"createdAT"| "updatedAT" | "emailVerified"> & 
{
    createdAT:string;
    updatedAT: string;
    emailVerieid: string | null;
};

