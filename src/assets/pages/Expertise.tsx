import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
    const [activeTab, setActiveTab] = useState(0);
    const container = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const expertiseItems = [
        {
            title: "Development",
            tag: "Engineering",
            description: "I build scalable, high-performance web applications using modern technologies like React, TypeScript, and Node.js. I focus on clean code and efficient architecture."
        },
        {
            title: "UI/UX Design",
            tag: "Bespoke Design",
            description: "I design intuitive and visually appealing user interfaces. My approach combines aesthetics with usability to create seamless digital experiences."
        },
        {
            title: "Interactive Branding",
            tag: "Visual Identity",
            description: "I help brands establish a strong identity through logo design, color typography, and visual storytelling that resonates with their target audience."
        }
    ];

    const techStack = [
        { name: "Node.js", icon: "🌐" },
        { name: "React", icon: "⚛️" },
        { name: "TypeScript", icon: "TS" },
        { name: "Next.js", icon: "▲" },
        { name: "Tailwind", icon: "🎨" },
        { name: "MongoDB", icon: "🍃" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "Docker", icon: "🐳" },
        { name: "GSAP", icon: "🎭" },
    ];

    useGSAP(() => {
        gsap.from(".expertise-item", {
            x: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".expertise-list",
                start: "top 70%",
            }
        });

        // Parallax for the images
        gsap.to(imageRef.current, {
            y: -100,
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 2
            }
        });
    }, { scope: container });

    return (
        <section id="expertise" ref={container} className="py-32 px-6 md:px-24 bg-[#09090b] text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-[var(--primary)]"></div>
                        <span className="text-[var(--primary)] text-xs font-bold tracking-[0.4em] uppercase">My Speciality</span>
                    </div>
                    <h2 className="text-7xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.8] mb-16">
                        Technical <br /> <span className="text-gray-800 italic">Prowess</span>
                    </h2>

                    <div className="expertise-list space-y-6">
                        {expertiseItems.map((item, index) => (
                            <div
                                key={index}
                                className={`expertise-item group p-8 rounded-[2rem] cursor-pointer transition-all duration-500 border
                                    ${activeTab === index ? 'bg-zinc-900 border-zinc-800 shadow-2xl scale-[1.02]' : 'bg-transparent border-transparent hover:border-zinc-800/50 hover:bg-zinc-900/30'}
                                `}
                                onClick={() => setActiveTab(index)}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${activeTab === index ? 'text-[var(--primary)]' : 'text-gray-600'}`}>
                                            {item.tag}
                                        </span>
                                        <h3 className={`text-3xl md:text-4xl font-bold tracking-tight transition-colors ${activeTab === index ? 'text-white' : 'text-gray-500'}`}>
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-500 ${activeTab === index ? 'rotate-180 bg-[var(--primary)] text-black' : 'text-gray-500'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>
                                <div className={`grid transition-all duration-500 ease-in-out ${activeTab === index ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <p className="text-gray-400 text-lg leading-relaxed overflow-hidden font-light">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative h-[800px] hidden lg:block rounded-[4rem] overflow-hidden border border-zinc-900 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                    <img
                        ref={imageRef}
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                        alt="Workspace"
                        className="w-full h-[120%] object-cover grayscale opacity-40 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent"></div>
                    
                    {/* Tech Stack Overlay */}
                    <div className="absolute bottom-12 inset-x-0 px-12">
                        <div className="flex flex-wrap gap-4">
                            {techStack.map((tech, i) => (
                                <div key={i} className="px-6 py-3 glass rounded-full text-xs font-bold uppercase tracking-widest text-white/50 hover:text-[var(--primary)] transition-colors">
                                    <span className="mr-2 text-sm">{tech.icon}</span>
                                    {tech.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Expertise;
