import React, { useRef, useState } from "react";
import type { EducationItemData } from "./educationData";
import { EducationCounter } from "./EducationCounter";

interface EducationCardProps {
    data: EducationItemData;
    index: number;
    totalCards: number;
    isActive: boolean;
}

const DegreeTypeIcon: React.FC<{ type: string }> = ({ type }) => {
    if (type === "Degree") {
        return (
            <svg className="w-4 h-4 text-[var(--primary)] group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
        );
    }
    if (type === "Specialization") {
        return (
            <svg className="w-4 h-4 text-[var(--primary)] group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="M7 21h10" />
                <path d="M12 3v18" />
                <path d="M3 7h18" />
            </svg>
        );
    }
    if (type === "Certification") {
        return (
            <svg className="w-4 h-4 text-[var(--primary)] group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
        );
    }
    return (
        <svg className="w-4 h-4 text-[var(--primary)] group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            <path d="M12 6v6" />
            <path d="M9 9h6" />
        </svg>
    );
};

const MapPinIcon: React.FC = () => (
    <svg className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const TrophyIcon: React.FC = () => (
    <svg className="w-3.5 h-3.5 text-[var(--primary)] shrink-0 group-hover/achieve:scale-110 group-hover/achieve:rotate-6 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
);

export const EducationCard: React.FC<EducationCardProps> = ({
    data,
    index: _index,
    totalCards,
    isActive,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePos({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
    };

    // Calculate subtle 3D Tilt
    const tiltX = isHovered ? (mousePos.y - 0.5) * -5 : 0;
    const tiltY = isHovered ? (mousePos.x - 0.5) * 5 : 0;

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                transition: isHovered ? "transform 0.15s ease-out" : "transform 0.5s ease-out",
                background: "var(--surface)",
                border: "none",
                boxShadow: "none",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
            className="group relative w-full max-w-[700px] rounded-[24px] p-5 sm:p-6 lg:p-7 overflow-hidden cursor-default transition-all duration-500 border-0 ml-auto mr-0 lg:translate-x-4 shadow-none text-[var(--text)]"
        >
            {/* Mouse Spot Glow Effect */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(500px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0, 0, 0, 0.04), transparent 50%)`,
                }}
            />

            {/* Light Sweep Anim Effect Across Card */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[24px]">
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-black/5 to-transparent -skew-x-12 -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
            </div>

            {/* Main Content Layout (Desktop: 2 columns, Mobile: 1 column) */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">

                {/* LEFT SIDE (Cols 1-5): Degree Meta, Institution, CGPA Counter */}
                <div
                    className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r pb-4 lg:pb-0 lg:pr-6"
                    style={{ borderColor: "rgba(0, 0, 0, 0.08)" }}
                >
                    <div>
                        {/* Top Meta Badges: Index, Type & Period */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                            <div className="flex items-center gap-2">
                                {/* Number Badge */}
                                <span
                                    className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-md tracking-wider flex items-center justify-center select-none"
                                    style={{
                                        background: "rgba(0, 0, 0, 0.06)",
                                        border: "none",
                                        color: "var(--text)",
                                    }}
                                >
                                    {data.number} / 0{totalCards}
                                </span>
                                {/* Degree Type Badge */}
                                <span
                                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1"
                                    style={{
                                        background: "rgba(0, 0, 0, 0.04)",
                                        border: "none",
                                        color: "var(--text-muted)",
                                    }}
                                >
                                    <DegreeTypeIcon type={data.type} />
                                    {data.type}
                                </span>
                            </div>

                            {/* Period Badge */}
                            <span
                                className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                                style={{
                                    background: "rgba(0, 0, 0, 0.05)",
                                    border: "none",
                                    color: "var(--text)",
                                }}
                            >
                                {data.period}
                            </span>
                        </div>

                        {/* Institution Name & Location */}
                        <div className="mb-3">
                            <div className="flex items-center gap-1.5 mb-1">
                                <MapPinIcon />
                                <span
                                    className="text-[11px] font-semibold tracking-wide uppercase"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    {data.location}
                                </span>
                            </div>
                            <span
                                className="block text-[11px] font-bold tracking-wide"
                                style={{ color: "var(--primary)" }}
                            >
                                @{data.institution}
                            </span>
                        </div>

                        {/* Degree Title */}
                        <h3
                            className="text-xl sm:text-2xl font-bold leading-snug tracking-tight mb-4 transition-colors duration-300"
                            style={{ color: "var(--text)" }}
                        >
                            {data.degree}
                        </h3>
                    </div>

                    {/* Grade / CGPA Counter Card */}
                    <div
                        className="p-3 rounded-xl flex items-center justify-between gap-3 transition-colors duration-300"
                        style={{
                            background: "rgba(0, 0, 0, 0.04)",
                            border: "none",
                        }}
                    >
                        <div>
                            <span
                                className="block text-[9px] font-mono uppercase tracking-widest mb-0.5"
                                style={{ color: "var(--text-muted)" }}
                            >
                                Performance Index
                            </span>
                            <div
                                className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-baseline gap-1"
                                style={{ color: "var(--text)" }}
                            >
                                <EducationCounter
                                    target={data.gradeVal}
                                    prefix={data.gradePrefix}
                                    suffix={data.gradeSuffix}
                                    decimals={data.gradeVal % 1 === 0 ? 0 : 1}
                                    isActive={isActive}
                                />
                            </div>
                        </div>
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-[11px]"
                            style={{
                                background: "rgba(0, 0, 0, 0.06)",
                                border: "none",
                                color: "var(--text)",
                            }}
                        >
                            {data.gradeVal >= 90 || data.gradeVal <= 10 ? "A+" : "DIST"}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE (Cols 6-12): Description, Skills, Tech & Achievements */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    <div>
                        {/* Description */}
                        <p
                            className="text-xs sm:text-sm font-light leading-relaxed mb-4"
                            style={{ color: "var(--text-muted)" }}
                        >
                            {data.description}
                        </p>

                        {/* Relevant Coursework & Skills Learned */}
                        <div className="mb-4">
                            <span
                                className="block text-[10px] font-bold uppercase tracking-widest mb-2"
                                style={{ color: "var(--text-muted)" }}
                            >
                                Coursework & Skills
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {data.coursework.map((course) => (
                                    <span
                                        key={course}
                                        className="px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider transition-all duration-300"
                                        style={{
                                            background: "rgba(0, 0, 0, 0.04)",
                                            border: "none",
                                            color: "var(--text)",
                                        }}
                                    >
                                        {course}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Mastered Technologies */}
                        <div className="mb-4">
                            <span
                                className="block text-[10px] font-bold uppercase tracking-widest mb-2"
                                style={{ color: "var(--text-muted)" }}
                            >
                                Key Technologies
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {data.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5"
                                        style={{
                                            background: "rgba(0, 0, 0, 0.06)",
                                            border: "none",
                                            color: "var(--text)",
                                        }}
                                    >
                                        <span
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ background: "var(--primary)" }}
                                        />
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Key Achievements */}
                        {data.achievements.length > 0 && (
                            <div>
                                <span
                                    className="block text-[10px] font-bold uppercase tracking-widest mb-2"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    Key Accomplishments
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                    {data.achievements.map((item, i) => (
                                        <div
                                            key={i}
                                            className="group/achieve p-2 rounded-lg flex items-center gap-2 transition-all duration-300"
                                            style={{
                                                background: "rgba(0, 0, 0, 0.03)",
                                                border: "none",
                                            }}
                                        >
                                            <TrophyIcon />
                                            <span
                                                className="text-[11px] font-medium truncate"
                                                style={{ color: "var(--text)" }}
                                            >
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stats Metric Chips Footer */}
                    <div
                        className="pt-3 grid grid-cols-3 gap-2 text-center"
                        style={{ borderTop: "1px solid rgba(0, 0, 0, 0.08)" }}
                    >
                        {data.stats.map((stat, sIdx) => (
                            <div
                                key={sIdx}
                                className="p-1.5 rounded-lg"
                                style={{
                                    background: "rgba(0, 0, 0, 0.03)",
                                    border: "none",
                                }}
                            >
                                <span
                                    className="block text-[9px] font-mono uppercase"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    {stat.label}
                                </span>
                                <span
                                    className="text-xs font-bold font-mono"
                                    style={{ color: "var(--text)" }}
                                >
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
