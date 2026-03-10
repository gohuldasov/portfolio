import { useRef } from "react";
import { Divider } from "antd";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
    const container = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const socialsRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

        tl.from(".glow-mesh", {
            opacity: 0,
            scale: 0.8,
            duration: 2,
            stagger: 0.2
        })
        .from(titleRef.current, {
            y: 100,
            opacity: 0,
            skewY: 7,
            stagger: 0.1
        }, "-=1.5")
        .from(dividerRef.current, {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1
        }, "-=1")
        .from(contentRef.current, {
            y: 30,
            opacity: 0
        }, "-=0.8")
        .from(".social-link", {
            y: 20,
            opacity: 0,
            stagger: 0.1
        }, "-=0.8")
        .from(buttonRef.current, {
            scale: 0.8,
            opacity: 0
        }, "-=0.6");

        // Magnetic button effect
        const button = buttonRef.current;
        if (button) {
            const handleMouseMove = (e: MouseEvent) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(button, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };

            const handleMouseLeave = () => {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            };

            button.addEventListener("mousemove", handleMouseMove);
            button.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                button.removeEventListener("mousemove", handleMouseMove);
                button.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, { scope: container });

    return (
        <section id="home" ref={container} className="min-h-screen flex flex-col justify-center px-6 md:px-24 relative overflow-hidden pt-20">
            {/* Background elements */}
            <div className="glow-mesh top-[-10%] left-[-10%] opacity-40"></div>
            <div className="glow-mesh bottom-[-10%] right-[-10%] opacity-30" style={{ background: 'radial-gradient(circle, rgba(163, 230, 53, 0.1) 0%, rgba(163, 230, 53, 0) 70%)' }}></div>

            <div className="relative z-10">
                <div className="overflow-hidden mb-8">
                    <h1 ref={titleRef} className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-[0.9] uppercase">
                        Design that <br /> 
                        <span className="text-muted-foreground opacity-30 italic">Reacts</span>
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-12 w-full mt-12">
                    <div ref={dividerRef} className="w-full md:w-1/3">
                        <Divider style={{ borderColor: 'var(--primary)', borderWidth: '2px', margin: 0 }} />
                    </div>

                    <div ref={contentRef} className="w-full md:w-1/2">
                        <p className="text-gray-400 text-xl md:text-2xl leading-tight font-light lowercase">
                            I work with brands globally to build pixel-perfect, engaging, and accessible digital experiences that drive results and achieve business goals.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-12 mt-24">
                    <div ref={socialsRef} className="flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                        {['LinkedIn', 'Github', 'Instagram', 'Gmail'].map((social) => (
                            <a key={social} href="#" className="social-link flex items-center gap-2 hover:text-[#a3e635] transition-colors group">
                                <span>{social}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </a>
                        ))}
                    </div>

                    <div className="relative group">
                        <button 
                            ref={buttonRef} 
                            className="magnetic-button px-10 py-5 rounded-full bg-[#a3e635] text-black font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all duration-300"
                        >
                            Explore My Work
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
                <span className="text-[10px] uppercase tracking-[0.3em] rotate-90 origin-left mb-8">Scroll</span>
                <div className="w-px h-20 bg-linear-to-b from-[#a3e635] to-transparent"></div>
            </div>
        </section>
    );
};

export default Hero;