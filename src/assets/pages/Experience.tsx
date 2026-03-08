import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const allExperiences = [
    {
        role: "Software Engineer",
        company: "@OneShield Software",
        period: "2022 — Present",
        description: "Leading frontend initiatives and building enterprise-grade insurance software solutions."
    },
    {
        role: "Founder",
        company: "@Design and Code",
        period: "2021 — Present",
        description: "Empowering developers through high-quality educational content and design systems."
    },
    {
        role: "Design Engineer",
        company: "@BlackboxAI",
        period: "Feb — Mar 2025",
        description: "Bridging the gap between engineering and aesthetics for next-gen AI interfaces."
    },
    {
        role: "UI/UX Designer",
        company: "@Social3",
        period: "2022 — 2023",
        description: "Designed core components for a Web3 social ecosystem focusing on usability."
    },
    {
        role: "Frontend Developer",
        company: "@TechNova",
        period: "2020 — 2020",
        description: "Developed responsive web applications using React and state management libraries."
    },
    {
        role: "Product Designer",
        company: "@InnoLabs",
        period: "2019 — 2019",
        description: "Created modular design systems and interactive prototypes for startup clients."
    }
];

const Experience = () => {
    const container = useRef<HTMLElement>(null);
    const [showAll, setShowAll] = useState(false);

    const displayedExperiences = showAll ? allExperiences : allExperiences.slice(0, 4);

    useGSAP(() => {
        gsap.fromTo(".exp-row", 
            {
                x: 100,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 70%",
                    onEnter: () => ScrollTrigger.refresh()
                }
            }
        );
    }, { scope: container, dependencies: [displayedExperiences] });

    return (
        <section id="experience" ref={container} className="relative py-32 px-6 md:px-24 bg-[#09090b] text-white">
            <div className="flex flex-col lg:flex-row gap-24">
                <div className="lg:w-1/3">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-[var(--primary)]"></div>
                        <span className="text-[var(--primary)] text-xs font-bold tracking-[0.4em] uppercase">Career Path</span>
                    </div>
                    <h2 className="text-7xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.8] mb-8">
                        Experience <br /> <span className="text-gray-800 italic">History</span>
                    </h2>
                    <p className="text-gray-500 text-xl font-light leading-relaxed max-w-sm lowercase">
                        Partnering with industry leaders to build products that define the digital landscape.
                    </p>
                </div>

                <div className="lg:w-2/3 exp-list w-full space-y-4">
                    {displayedExperiences.map((exp, index) => (
                        <div
                            key={index}
                            className="exp-row group relative flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-zinc-900 hover:px-8 cursor-default"
                        >
                            <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10"></div>
                            
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest uppercase">
                                    {exp.period}
                                </span>
                                <h3 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-[var(--primary)] transition-colors duration-300">
                                    {exp.role}
                                </h3>
                                <p className="text-gray-500 font-medium text-lg italic">
                                    {exp.company}
                                </p>
                            </div>
                            
                            <div className="mt-6 md:mt-0 md:text-right max-w-xs">
                                <p className="text-gray-600 text-sm font-light leading-relaxed lowercase">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}

                    <div className="mt-20 flex justify-end">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="group flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase hover:text-[var(--primary)] transition-all"
                        >
                            <span className="border-b border-gray-800 pb-1 group-hover:border-[var(--primary)] transition-colors">
                                {showAll ? "Show Less" : "Explore All History"}
                            </span>
                            <div className={`w-10 h-10 rounded-full glass flex items-center justify-center transition-transform duration-500 ${showAll ? 'rotate-180' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
