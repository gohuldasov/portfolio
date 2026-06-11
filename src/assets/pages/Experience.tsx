import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const allExperiences = [
    {
        role: "Software Engineer",
        company: "OneShield Software",
        period: "2022 — Present",
        description: "Leading frontend initiatives and building enterprise-grade insurance software solutions with React and TypeScript."
    },
    {
        role: "Founder & Lead",
        company: "Design and Code",
        period: "2021 — Present",
        description: "Empowering developers through high-quality educational content, design systems, and open-source contributions."
    },
    {
        role: "Design Engineer",
        company: "BlackboxAI",
        period: "Feb — Mar 2025",
        description: "Bridging the gap between engineering and aesthetics for next-gen AI interfaces with cutting-edge animations."
    },
    {
        role: "UI/UX Designer",
        company: "Social3",
        period: "2022 — 2023",
        description: "Designed core components for a Web3 social ecosystem focusing on usability and accessibility."
    },
    {
        role: "Frontend Developer",
        company: "TechNova",
        period: "2020 — 2021",
        description: "Developed responsive web applications using React, Redux, and modern CSS frameworks."
    },
    {
        role: "Product Designer",
        company: "InnoLabs",
        period: "2019 — 2020",
        description: "Created modular design systems and interactive prototypes for startup clients across various industries."
    }
];

const Experience = () => {
    const container = useRef<HTMLElement>(null);
    const [showAll, setShowAll] = useState(false);

    const displayedExperiences = showAll ? allExperiences : allExperiences.slice(0, 4);

    useGSAP(() => {
        // Animate header
        gsap.fromTo(".exp-header",
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 75%",
                }
            }
        );

        // Animate rows
        gsap.fromTo(".exp-row",
            { x: 60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".exp-list",
                    start: "top 75%",
                }
            }
        );
    }, { scope: container, dependencies: [displayedExperiences] });

    return (
        <section
            id="experience"
            ref={container}
            className="relative py-32 px-6 md:px-16 lg:px-24 xl:px-40 bg-(--background) text-white"
        >
            {/* ── Header ── */}
            <div className="exp-header mb-20 w-full">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-(--primary)" />
                    <span className="text-(--primary) text-xs font-bold tracking-[0.4em] uppercase">Career Path</span>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter uppercase leading-[0.85]">
                        Experience <br />
                        <span className="text-gray-800 italic">History</span>
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-md lowercase lg:text-right">
                        Partnering with industry leaders to build products that define the digital landscape.
                    </p>
                </div>
            </div>

            {/* ── Experience List ── always below header */}
            <div className="exp-list w-full">
                {displayedExperiences.map((exp, index) => (
                    <div
                        key={index}
                        className="exp-row group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-12 border-b border-white/8 hover:px-6 cursor-default transition-all duration-500"
                    >
                        {/* Subtle background on hover */}
                        <div className="absolute inset-0 bg-white/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10" />

                        {/* Left — Role & Company */}
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-bold text-gray-700 tracking-widest uppercase">
                                {exp.period}
                            </span>
                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-(--primary) transition-colors duration-300">
                                {exp.role}
                            </h3>
                            <p className="text-gray-500 font-medium text-base italic">
                                @{exp.company}
                            </p>
                        </div>

                        {/* Right — Description */}
                        <div className="mt-5 md:mt-0 md:text-right md:max-w-xs lg:max-w-sm">
                            <p className="text-gray-600 text-sm font-light leading-relaxed lowercase">
                                {exp.description}
                            </p>
                        </div>
                    </div>
                ))}

                {/* Show more / less toggle */}
                <div className="mt-16 flex justify-end">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="group flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase hover:text-(--primary) transition-all duration-300"
                    >
                        <span className="border-b border-white/10 pb-1 group-hover:border-(--primary) transition-colors duration-300">
                            {showAll ? "Show Less" : "Explore All History"}
                        </span>
                        <div className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:border-(--primary) group-hover:bg-(--primary)/10 ${showAll ? "rotate-180" : ""}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Experience;
