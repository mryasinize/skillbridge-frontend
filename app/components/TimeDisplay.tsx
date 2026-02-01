'use client'

import { useEffect, useState } from "react";

export default function TimeDisplay({ date, options }: { date: string, options: Intl.DateTimeFormatOptions }) {
    const [formattedTime, setFormattedTime] = useState("")
    useEffect(() => {
        setFormattedTime(new Intl.DateTimeFormat('en-US', options).format(new Date(date)));
    }, [date, options]);
    return <>{formattedTime}</>;
}