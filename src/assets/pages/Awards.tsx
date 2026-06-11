import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const awards = [
    {
        title: "Star Performer of the Year",
        date: "2021",
        issuer: "OneShield Software",
        icon: "⭐"
    },
    {
        title: "Best Beginner Hack",
        date: "2021",
        issuer: "MLH Hackathon",
        icon: "🏆"
    },
    {
        title: "Sketch Webpage Contest Winner",
        date: "2020",
        issuer: "Design Collective",
        icon: "🎨"
    },
    {
        title: "Best Space App Winner",
        date: "2021",
        issuer: "NASA Space Apps Challenge",
        icon: "🚀"
    },
    {
        title: "Top 10 UI Designer",
        date: "2022",
        issuer: "Dribbble Community",
        icon: "🎯"
    },
    {
        title: "Open Source Contributor Award",
        date: "2023",
        issuer: "GitHub Stars Program",
        icon: "💻"
    },
    {
        title: "Innovative Product Design",
        date: "2022",
        issuer: "ProductHunt",
        icon: "🔥"
    },
    {
        title: "Excellence in Frontend Engineering",
        date: "2023",
        issuer: "Dev.to Community",
        icon: "⚡"
    },
];

const Awards = () => {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Animate the header
        gsap.fromTo(".awards-header-content",
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

        // Animate each award card
        gsap.fromTo(".award-item",
            { y: 60, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".awards-grid",
                    start: "top 80%",
                }
            }
        );
    }, { scope: container });

    return (
        <section id="awards" ref={container} className="py-32 px-6 md:px-16 lg:px-24 xl:px-40 text-white bg-(--background)">
            {/* Header */}
            <div className="awards-header-content mb-20">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-(--primary)" />
                    <span className="text-(--primary) text-xs font-bold tracking-[0.4em] uppercase">Recognition</span>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter uppercase leading-[0.85]">
                        Awards &<br />
                        <span className="text-gray-800 italic">Honors</span>
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-md lowercase lg:text-right">
                        Recognition from industry leaders, design communities, and global competitions for excellence in engineering and creativity.
                    </p>
                </div>
            </div>

            {/* Awards Grid */}
            <div className="awards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {awards.map((award, index) => (
                    <div
                        key={index}
                        className="award-item group relative p-8 rounded-3xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-(--primary)/40 transition-all duration-500 cursor-default flex flex-col justify-between min-h-60 overflow-hidden"
                    >
                        {/* Background glow on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(var(--primary-rgb, 255,255,255),0.05), transparent 70%)' }}
                        />

                        {/* Top row */}
                        <div className="flex items-start justify-between gap-2">
                            <span className="text-2xl">{award.icon}</span>
                            <span className="text-white/30 font-bold text-xs uppercase tracking-widest">{award.date}</span>
                        </div>

                        {/* Award title */}
                        <div className="flex flex-col gap-3 mt-4">
                            <h3 className="text-xl font-bold tracking-tight leading-snug group-hover:text-(--primary) transition-colors duration-300">
                                {award.title}
                            </h3>
                            <div className="w-8 h-px bg-white/15 group-hover:w-16 group-hover:bg-(--primary) transition-all duration-500" />
                        </div>

                        {/* Bottom issuer */}
                        <div className="pt-6 mt-auto">
                            <p className="text-white/40 font-medium text-[10px] uppercase tracking-[0.25em]">
                                Issued by{" "}
                                <span className="text-white/70 not-italic font-bold">{award.issuer}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Awards;
