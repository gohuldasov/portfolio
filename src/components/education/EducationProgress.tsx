import React from "react";
import type { EducationItemData } from "./educationData";

interface EducationProgressProps {
    items: EducationItemData[];
    activeId: string;
    progressPercentage: number;
}

export const EducationProgress: React.FC<EducationProgressProps> = ({
    items,
    activeId,
    progressPercentage,
}) => {
    const scrollToMilestone = (id: string) => {
        const el = document.getElementById(`edu-heading-${id}`);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return (
        <aside
            className="hidden lg:flex flex-col gap-6 p-6 rounded-[20px]"
            style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
        >
            {/* Header: Label & Progress % */}
            <div
                className="flex items-center justify-between pb-3"
                style={{ borderBottom: "1px solid var(--glass-border)" }}
            >
                <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                >
                    Section Progress
                </span>
                <span
                    className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                        background: "rgba(2, 132, 199, 0.1)",
                        border: "1px solid rgba(2, 132, 199, 0.2)",
                        color: "var(--primary)",
                    }}
                >
                    {Math.round(progressPercentage)}%
                </span>
            </div>

            {/* Overall Progress Bar Track */}
            <div
                className="relative w-full h-1.5 rounded-full overflow-hidden"
                style={{
                    background: "rgba(2, 132, 199, 0.08)",
                    border: "1px solid var(--glass-border)",
                }}
            >
                <div
                    className="h-full transition-all duration-300 ease-out rounded-full"
                    style={{
                        width: `${progressPercentage}%`,
                        background: "var(--primary)",
                        boxShadow: "0 0 8px var(--primary-glow)",
                    }}
                    role="progressbar"
                    aria-valuenow={Math.round(progressPercentage)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Education section scroll progress"
                />
            </div>

            {/* Interactive Milestone Step Items */}
            <div className="flex flex-col gap-2 pt-1">
                {items.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollToMilestone(item.id)}
                            className="group flex items-center justify-between p-3 rounded-xl text-left transition-all duration-300 focus:outline-none"
                            style={{
                                background: isActive ? "rgba(2, 132, 199, 0.08)" : "transparent",
                                border: isActive ? "1px solid rgba(2, 132, 199, 0.25)" : "1px solid transparent",
                                color: isActive ? "var(--primary)" : "var(--text-muted)",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="text-xs font-bold px-2 py-0.5 rounded-full transition-colors"
                                    style={{
                                        background: isActive ? "var(--primary)" : "var(--glass-bg)",
                                        color: isActive ? "#ffffff" : "var(--text-muted)",
                                        border: isActive ? "none" : "1px solid var(--glass-border)",
                                    }}
                                >
                                    {item.number}
                                </span>
                                <span className="text-xs font-medium truncate max-w-[170px]">
                                    {item.degree}
                                </span>
                            </div>
                            <span
                                className="w-1.5 h-1.5 rounded-full transition-transform duration-300"
                                style={{
                                    background: isActive ? "var(--primary)" : "var(--glass-border)",
                                    transform: isActive ? "scale(1.3)" : "scale(1)",
                                }}
                            />
                        </button>
                    );
                })}
            </div>
        </aside>
    );
};
