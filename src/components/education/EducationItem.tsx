import React from "react";
import type { EducationItemData } from "./educationData";

interface EducationItemProps {
    data: EducationItemData;
    index: number;
}

const InstitutionLogoSvg: React.FC<{ type: string }> = ({ type }) => {
    if (type === "Degree") {
        return (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
        );
    }
    if (type === "Specialization") {
        return (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="M7 21h10" />
                <path d="M12 3v18" />
                <path d="M3 7h18" />
            </svg>
        );
    }
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            <path d="M12 6v6" />
            <path d="M9 9h6" />
        </svg>
    );
};

const TrophyIcon: React.FC = () => (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
);

export const EducationItem: React.FC<EducationItemProps> = ({ data }) => {
    return (
        <article
            className="edu-milestone-card group relative p-2 sm:p-4 transition-all duration-300 cursor-default"
            style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
            aria-labelledby={`edu-heading-${data.id}`}
        >
            {/* Content Container */}
            <div className="flex flex-col gap-6">

                {/* Header Meta Row: Number Badge, Institution & Logo, Duration & Grade */}
                <div
                    className="flex flex-wrap items-start justify-between gap-4 pb-4"
                    style={{ borderBottom: "1px solid var(--glass-border)" }}
                >
                    {/* Left Meta: Number Badge & Institution Info */}
                    <div className="flex items-center gap-3.5">
                        {/* Number Indicator Badge */}
                        <span
                            className="edu-number-badge font-bold text-xs px-2.5 py-1 rounded-md tracking-wider flex items-center justify-center select-none"
                            style={{
                                background: "rgba(2, 132, 199, 0.1)",
                                border: "1px solid rgba(2, 132, 199, 0.25)",
                                color: "var(--primary)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                            aria-label={`Milestone number ${data.number}`}
                        >
                            {data.number}
                        </span>

                        {/* Institution Logo & Name */}
                        <div className="flex items-center gap-3">
                            <div
                                className="edu-logo-icon w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                                style={{
                                    background: "var(--glass-bg)",
                                    border: "1px solid var(--glass-border)",
                                    color: "var(--primary)",
                                }}
                            >
                                <InstitutionLogoSvg type={data.type} />
                            </div>
                            <div className="flex flex-col">
                                <span
                                    className="text-sm font-semibold transition-colors duration-300"
                                    style={{ color: "var(--text)" }}
                                >
                                    {data.institution}
                                </span>
                                <span
                                    className="text-xs font-medium"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    {data.location}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Meta: Duration & Grade */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span
                            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                            style={{
                                background: "var(--glass-bg)",
                                border: "1px solid var(--glass-border)",
                                color: "var(--text-muted)",
                            }}
                        >
                            {data.period}
                        </span>
                        <span
                            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                            style={{
                                background: "rgba(2, 132, 199, 0.1)",
                                border: "1px solid rgba(2, 132, 199, 0.25)",
                                color: "var(--primary)",
                            }}
                        >
                            {data.grade}
                        </span>
                    </div>
                </div>

                {/* Main Content: Degree & Description */}
                <div>
                    <h3
                        id={`edu-heading-${data.id}`}
                        className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 transition-colors duration-300"
                        style={{ color: "var(--text)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
                    >
                        {data.degree}
                    </h3>
                    <p
                        className="text-base font-light leading-relaxed"
                        style={{ color: "var(--text-muted)", fontSize: "16px" }}
                    >
                        {data.description}
                    </p>
                </div>

                {/* Achievement Badges Row */}
                {data.achievements.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1" aria-label="Key Achievements">
                        {data.achievements.map((achieve, i) => (
                            <span
                                key={i}
                                className="edu-badge-item text-xs font-bold tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 transition-all duration-300"
                                style={{
                                    background: "rgba(2, 132, 199, 0.08)",
                                    border: "1px solid rgba(2, 132, 199, 0.2)",
                                    color: "var(--primary)",
                                }}
                            >
                                <TrophyIcon />
                                <span>{achieve}</span>
                            </span>
                        ))}
                    </div>
                )}

                {/* Coursework & Technologies Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4"
                    style={{ borderTop: "1px solid var(--glass-border)" }}
                >
                    {/* Relevant Coursework */}
                    <div>
                        <span
                            className="block text-[10px] font-bold uppercase tracking-widest mb-2.5"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Relevant Coursework
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {data.coursework.map((course) => (
                                <span
                                    key={course}
                                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                                    style={{
                                        background: "var(--glass-bg)",
                                        border: "1px solid var(--glass-border)",
                                        color: "var(--text-muted)",
                                    }}
                                >
                                    {course}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Technologies Learned */}
                    <div>
                        <span
                            className="block text-[10px] font-bold uppercase tracking-widest mb-2.5"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Technologies Mastered
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {data.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5"
                                    style={{
                                        background: "rgba(2, 132, 199, 0.08)",
                                        border: "1px solid rgba(2, 132, 199, 0.2)",
                                        color: "var(--primary)",
                                    }}
                                >
                                    <span
                                        className="w-1 h-1 rounded-full"
                                        style={{ background: "var(--primary)" }}
                                        aria-hidden="true"
                                    />
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </article>
    );
};
