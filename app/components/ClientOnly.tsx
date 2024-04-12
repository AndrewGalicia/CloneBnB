'use client'
import { useEffect, useState } from "react";

interface ClientOnlyProps {
    children: React.ReactNode;
}

export default function ClientOnly({ children }: ClientOnlyProps) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []); // Only runs once on mount, no dependencies

    if (!hasMounted) {
        return null;
    }

    return (
        <>
            {children}
        </>
    );
}
