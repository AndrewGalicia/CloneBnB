'use client';
import React from 'react'

export default function Container({children}:any) {
    return (
        <div
            className='
                max-w=[2520px]
                mx-auto
                xl:px-20
                md:px-2
                sm:px-2
                px-4
            '
            >
            {children}
        </div>
    )
}