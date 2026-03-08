import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Aora",
        category: "Mobile Design / Development",
        color: "#fdfba4",
        id: "01",
        description: "A premium video sharing platform for creatives."
    },
    {
        title: "FizzBuzz",
        category: "System Design",
        color: "#ffcddf",
        id: "02",
        description: "Optimized algorithm visualization and testing."
    },
    {
        title: "Luma",
        category: "E-commerce Interface",
        color: "#d1fae5",
        id: "03",
        description: "Next-gen shopping experience with AI personalization."
    }
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const { left, top, width, height } = rect;
        const x = (clientX - left - width / 2) * 0.1;
        const y = (clientY - top - height / 2) * 0.1;

        gsap.to(imageRef.current, {
            x: x,
            y: y,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(imageRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    return (
        <div   
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="project-card group relative flex flex-col gap-6 cursor-pointer shrink-0 w-[85vw] md:w-[60vw]"
        >
            <div   
                className="relative aspect-[4/5] md:aspect-[16/9] rounded-[2rem] overflow-hidden bg-[#161618] border border-white/5"
                style={{ backgroundColor: project.color + '10' }} // Subtle tint
            >
                <div   
                    ref={imageRef}
                    className="absolute inset-0 flex items-center justify-center p-12 transition-transform duration-700 group-hover:scale-105"
                >
                    <div className="w-full h-full rounded-2xl glass flex items-center justify-center text-4xl font-bold opacity-20 uppercase tracking-tighter">
                        View Case Study
                    </div>
                </div>
                                                
                <div className="absolute top-8 left-8 flex gap-2">
                    <span className="px-4 py-2 glass rounded-full text-[10px] font-bold tracking-widest uppercase text-white/60">
                        {project.id}
                    </span>
                    <span className="px-4 py-2 glass rounded-full text-[10px] font-bold tracking-widest uppercase text-white/60">
                        {project.category}
                    </span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-4 overflow-hidden">
                <div className="overflow-hidden">
                    <h3 className="project-title text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none group-hover:text-[var(--primary)] transition-colors duration-300">
                        {project.title}
                    </h3>
                </div>
                <p className="text-gray-500 font-light text-sm max-w-[250px] lowercase tracking-wide">
                    {project.description}
                </p>
            </div>
        </div>
    );
};

const Projects = () => {
    const container = useRef<HTMLElement>(null);
    const scrollContainer = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!container.current || !scrollContainer.current) return;

        const totalWidth = scrollContainer.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const xTranslate = -(totalWidth - viewportWidth + (viewportWidth * 0.1));

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                pin: true,
                start: "top top",
                end: () => `+=${totalWidth * 2}`, // Longer scroll for the sequence
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        // Sequence 1: Clear the header
        tl.to(".projects-header", {
            y: "-120%",
            opacity: 0,
            duration: 1,
            ease: "power3.inOut"
        });

        // Sequence 2: Lift and center carousel
        tl.to(".projects-carousel-wrapper", {
            y: "-15vh",
            duration: 1,
            ease: "power2.inOut"
        }, "-=0.8");

        // Sequence 3: Horizontal glide
        tl.to(scrollContainer.current, {
            x: xTranslate,
            ease: "none",
            duration: 4
        }, "-=0.2");

        // Entrance animation for cards
        gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
            gsap.fromTo(card,   
                {   
                    scale: 0.8,   
                    opacity: 0,   
                    y: 100,
                    rotate: 2
                },
                {   
                    scale: 1,   
                    opacity: 1,   
                    y: 0,
                    rotate: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: tl,
                        start: "left 98%",
                        end: "left 60%",
                        scrub: true,
                    }
                }
            );
        });

    }, { scope: container });

    return (
        <section id="projects" ref={container} className="relative bg-[#09090b] text-white overflow-hidden min-h-screen">
            <div className="h-screen flex flex-col justify-start pt-32 pb-20">
                <div className="projects-header mb-12 px-6 md:px-24 shrink-0">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-[1px] bg-[var(--primary)]"></div>
                        <span className="text-[var(--primary)] text-xs font-bold tracking-[0.4em] uppercase">Selected Works</span>
                    </div>
                    <h2 className="text-6xl md:text-[8rem] font-bold tracking-tighter uppercase leading-[0.8]">
                        Featured <br /> <span className="text-gray-800 italic">Projects</span>
                    </h2>
                </div>

                <div className="projects-carousel-wrapper flex-1 flex items-center">
                    <div ref={scrollContainer} className="flex gap-20 px-6 md:px-24 items-center">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                                                                
                        <div className="shrink-0 pl-24 pr-48">
                            <button className="group px-12 py-6 rounded-full border border-white/10 hover:border-[var(--primary)] transition-all flex items-center gap-4">
                                <span className="text-xs font-bold uppercase tracking-widest group-hover:text-[var(--primary)]">View All Projects</span>
                                <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:text-black transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
