import React from "react";

export const EducationBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent">
            {/* Ambient Soft Orbs Matching White and Black Theme */}
            <div
                className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-40 animate-pulse pointer-events-none"
                style={{
                    background: "radial-gradient(circle, var(--orb1) 0%, transparent 70%)",
                    animationDuration: "12s"
                }}
            />
            <div
                className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] opacity-35 animate-pulse pointer-events-none"
                style={{
                    background: "radial-gradient(circle, var(--orb2) 0%, transparent 70%)",
                    animationDuration: "16s",
                    animationDelay: "4s"
                }}
            />
            <div
                className="absolute top-2/3 left-1/3 w-[400px] h-[400px] rounded-full blur-[110px] opacity-30 pointer-events-none"
                style={{
                    background: "radial-gradient(circle, var(--orb3) 0%, transparent 70%)"
                }}
            />

            {/* Floating Subtle Geometric Accents (No Grids) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                {/* Floating Ring 1 */}
                <div
                    className="absolute top-[15%] left-[8%] w-44 h-44 rounded-full border border-[var(--primary)]/30 border-dashed animate-[spin_40s_linear_infinite]"
                    style={{ transform: "rotateX(60deg) rotateY(20deg)" }}
                />
                {/* Floating Ring 2 */}
                <div
                    className="absolute bottom-[20%] right-[10%] w-64 h-64 rounded-full border border-[var(--secondary)]/30 animate-[spin_55s_linear_infinite_reverse]"
                    style={{ transform: "rotateX(45deg) rotateY(-30deg)" }}
                />
                {/* Geometric Diamond */}
                <div
                    className="absolute top-[60%] left-[5%] w-16 h-16 border border-[var(--primary)]/30 rotate-45 animate-bounce"
                    style={{ animationDuration: "8s" }}
                />
            </div>
        </div>
    );
};
