import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const awards = [
    {
        title: "Star Performer of the Year",
        date: "2021",
        issuer: "OneShield"
    },
    {
        title: "Best Beginner Hack",
        date: "2021",
        issuer: "MLH Hackathon"
    },
    {
        title: "Sketch Webpage Contest Winner",
        date: "2020",
        issuer: "Design Collective"
    },
    {
        title: "Best Space App Winner",
        date: "2021",
        issuer: "NASA Challenge"
    },
];

const Awards = () => {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".award-item", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
            }
        });
    }, { scope: container });

    return (
        <section id="awards" ref={container} className="py-32 px-6 md:px-24 bg-[#09090b] text-white">
            <div className="flex flex-col lg:flex-row gap-24">
                <div className="lg:w-1/3">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-[var(--primary)]"></div>
                        <span className="text-[var(--primary)] text-xs font-bold tracking-[0.4em] uppercase">Recognition</span>
                    </div>
                    <h2 className="text-7xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.8] mb-8">
                        Awards & <br /> <span className="text-gray-800 italic">Honors</span>
                    </h2>
                </div>

                <div className="lg:w-2/3 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    {awards.map((award, index) => (
                        <div
                            key={index}
                            className="award-item group p-10 glass rounded-[2.5rem] flex flex-col justify-between min-h-[300px] border border-zinc-900 hover:border-[var(--primary)]/30 transition-all duration-500"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <span className="text-[var(--primary)] text-xs font-bold tracking-[0.2em]">#{index + 1}</span>
                                    <span className="text-gray-700 font-bold text-xs uppercase tracking-widest">{award.date}</span>
                                </div>
                                <h3 className="text-3xl font-bold tracking-tight group-hover:text-[var(--primary)] transition-colors duration-300">
                                    {award.title}
                                </h3>
                            </div>
                            <div className="pt-8 border-t border-white/5">
                                <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.3em] font-light">
                                    Issued by <span className="text-white italic">{award.issuer}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Awards;
