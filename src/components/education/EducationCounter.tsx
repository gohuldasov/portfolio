import React, { useEffect, useState, useRef } from "react";

interface CounterProps {
    target: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
    isActive?: boolean;
}

export const EducationCounter: React.FC<CounterProps> = ({
    target,
    prefix = "",
    suffix = "",
    decimals = 1,
    duration = 1500,
    isActive = true,
}) => {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isActive) return;
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out quad
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const currentVal = easeProgress * target;
            setCount(currentVal);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setCount(target);
            }
        };

        window.requestAnimationFrame(step);
    }, [isActive, target, duration]);

    return (
        <span className="font-mono tracking-tight">
            {prefix}
            {count.toFixed(decimals % 1 === 0 && target % 1 === 0 ? 0 : decimals)}
            {suffix}
        </span>
    );
};
