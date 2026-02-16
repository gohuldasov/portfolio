import { useRef,  useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const allExperiences = [
    {
        role: "Software Engineer",
        company: "@OneShield Software",
        period: "Aug 2022 — Present",
        logo: "https://images.unsplash.com/photo-1599305090748-394e48ef141b?w=100&h=100&fit=crop", // Placeholder
        bgColor: "bg-white",
        textColor: "text-blue-600"
    },
    {
        role: "Founder",
        company: "@Design and Code",
        period: "Jan 2021 — Present",
        logo: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=100&h=100&fit=crop", // Placeholder
        bgColor: "bg-black border border-cyan-500",
        textColor: "text-cyan-500"
    },
    {
        role: "Design Engineer",
        company: "@BlackboxAI",
        period: "Feb 2025 — Mar 2025",
        logo: "https://images.unsplash.com/photo-1557683316-973673baf926?w=100&h=100&fit=crop", // Placeholder
        bgColor: "bg-gray-800",
        textColor: "text-white"
    },
    {
        role: "UI/UX Designer",
        company: "@Social3",
        period: "Aug 2022 — Sep 2023",
        logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop", // Placeholder
        bgColor: "bg-blue-500",
        textColor: "text-white"
    },
    {
        role: "Frontend Developer",
        company: "@TechNova",
        period: "Jan 2020 — Dec 2020",
        logo: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=100&h=100&fit=crop", // Placeholder
        bgColor: "bg-purple-600",
        textColor: "text-white"
    },
    {
        role: "Product Designer",
        company: "@InnoLabs",
        period: "Jun 2019 — Dec 2019",
        logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bde2?w=100&h=100&fit=crop", // Placeholder
        bgColor: "bg-orange-500",
        textColor: "text-white"
    }
];

const Experience = () => {
    const sectionRef = useRef(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [showAll, setShowAll] = useState(false);

    const displayedExperiences = showAll ? allExperiences : allExperiences.slice(0, 4);

    // useEffect(() => {
    //     const ctx = gsap.context(() => {
    //         if (listRef.current) {
    //             gsap.from(listRef.current.children, {
    //                 y: 30,
    //                 opacity: 0,
    //                 stagger: 0.1,
    //                 duration: 0.8,
    //                 ease: "power3.out",
    //                 scrollTrigger: {
    //                     trigger: listRef.current,
    //                     start: "top 85%",
    //                     toggleActions: "play none none none"
    //                 }
    //             });
    //         }
    //     }, sectionRef);

    //     return () => ctx.revert();
    // }, [showAll]);

    return (
        <section ref={sectionRef} id="experience" className="py-24 px-6 md:px-12 lg:px-24 text-white border-4 border-red-500">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
                {/* Left Column */}
                <div className="lg:w-1/3 flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#a3e635]">
                            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#a3e635] text-sm font-bold tracking-widest uppercase">Work History</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Experience</h2>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-sm">
                        I have worked with some of the most innovative industry leaders to help build their top-notch products.
                    </p>
                </div>

                {/* Right Column */}
                <div className="lg:w-2/3 w-full" ref={listRef}>
                    {displayedExperiences.map((exp, index) => (
                        <div
                            key={`${exp.company}-${index}`}
                            className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-white/10 transition-all hover:border-[#a3e635]/30"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center overflow-hidden shrink-0 transition-transform group-hover:scale-110 duration-500 ${exp.bgColor}`}>
                                    <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover p-2" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-bold group-hover:text-[#a3e635] transition-colors duration-300">
                                        {exp.role}
                                    </h3>
                                    <p className="text-gray-400 font-medium">
                                        {exp.company}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 md:text-right">
                                <span className="text-gray-500 font-medium text-sm tracking-wide">
                                    {exp.period}
                                </span>
                            </div>
                        </div>
                    ))}

                    <div className="mt-12 flex justify-center lg:justify-end">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="group flex items-center gap-2 text-white hover:text-[#a3e635] font-bold text-sm tracking-widest uppercase transition-all duration-300 border-b-2 border-transparent hover:border-[#a3e635] pb-1"
                        >
                            {showAll ? "Show Less" : "Show More"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
