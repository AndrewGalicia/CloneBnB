'use client'

import {toast} from "react-hot-toast"
import axios from "axios"
import {useCallback, useState} from "react"
import {useRouter} from "next/navigation"

import {SafeReservation, SafeUser} from "../types"

import Heading from "../components/Heading"
import Container from "../components/Container/Container"
import ListingCard from "../components/listings/ListingCard"


export default function ReservationClient() {
    return(
        <Container>
            <Heading
                title="Reservations"
                subtitle="Booking on your properties"
            />
                
        </Container>
    );
}