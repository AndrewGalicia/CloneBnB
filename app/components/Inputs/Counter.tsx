"use client"

import { useCallback } from "react";

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;

}

export default function Counter({title, subtitle, value, onChange}: CounterProps) {
    
        const onAdd = useCallback(() => {
            onChange(value + 1);
        }, [onChange, value])

        const onReduce = useCallback(() => {
            if (value === 1) {
                return;
            }

            onChange(value-1);
        }, [value, onChange])
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-light text-gray-600">
                    {subtitle}
                </div>
            </div>
        </div>
    )
}