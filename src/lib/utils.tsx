// frontend\src\lib\utils.tsx

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export function formatTimeTo12Hour(time: string) {
    const [hour, minute] = time.split(':');
    const hourNumber = parseInt(hour, 10);
    const period = hourNumber >= 12 ? 'PM' : 'AM';
    const adjustedHour = hourNumber % 12 || 12; // Adjust 0 and 12 to 12
    return `${adjustedHour}:${minute} ${period}`;
}