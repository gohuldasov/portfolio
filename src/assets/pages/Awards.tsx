import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const awards = [
    {
        title: "Star Performer of the Year",
        date: "MAY 2021",
    },
    {
        title: "Best Beginner Hack",
        date: "APR 2021",
    },
    {
        title: "Sketch Webpage Contest Winner",
        date: "NOV 2020",
    },
    {
        title: "Best Space App Winner",
        date: "SEP 2021",
    },
];

const Awards = () => {
    const sectionRef = useRef(null);
    const listRef = useRef<HTMLDivElement>(null);

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
    // }, []);

    return (
        <section ref={sectionRef} id="awards" className="py-24 px-6 md:px-12 lg:px-24 text-white border-4 border-red-500">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
                {/* Left Column: Header */}
                <div className="lg:w-1/3 space-y-6">
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-5 h-5 text-[#a3e635]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"
                            />
                        </svg>
                        <span className="text-[#a3e635] font-bold tracking-widest uppercase text-sm">
                            Awards
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Awards & Recognition</h2>
                </div>

                {/* Right Column: Awards List */}
                <div className="lg:w-2/3 w-full" ref={listRef}>
                    {awards.map((award, index) => (
                        <div
                            key={`${award.title}-${index}`}
                            className="group flex items-center justify-between py-10 border-b border-white/10 transition-all hover:border-[#a3e635]/40"
                        >
                            <h3 className="text-xl md:text-3xl font-bold group-hover:text-[#a3e635] transition-colors duration-300">
                                {award.title}
                            </h3>
                            <span className="text-gray-500 font-medium text-sm tracking-widest uppercase">
                                {award.date}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Awards;
