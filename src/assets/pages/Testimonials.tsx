import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const container = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const testimonials = [
        {
            name: "Samiksha Pawar",
            role: "Software Engineer @Conexao",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
            text: "Devraj is a very artistic person. His ability to blend aesthetics with engineering is truly rare. An amazing collaborator for any digital product."
        },
        {
            name: "John Doe",
            role: "Product Manager @TechFlow",
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
            text: "An exceptional developer who brings creativity to every project. The attention to detail in animations and interactions is outstanding."
        },
        {
            name: "Jane Smith",
            role: "Creative Director @DesignStudio",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
            text: "One of the best collaborators I've worked with. He understands the balance between aesthetics and functionality perfectly."
        }
    ];

    const { contextSafe } = useGSAP({ scope: container });

    const handleTransition = contextSafe((nextIndex: number) => {
        const tl = gsap.timeline();
        
        tl.to(contentRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                setCurrentIndex(nextIndex);
            }
        })
        .fromTo(contentRef.current, {
            y: -20,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    const next = () => handleTransition((currentIndex + 1) % testimonials.length);
    const prev = () => handleTransition((currentIndex - 1 + testimonials.length) % testimonials.length);

    return (
        <section id="testimonials" ref={container} className="py-32 px-6 md:px-52  text-white">
            <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-px bg-(--primary)"></div>
                    <span className="text-(--primary) text-xs font-bold tracking-[0.4em] uppercase">Kind Words</span>
                    <div className="w-12 h-px bg-(--primary)"></div>
                </div>

                <div 
                    ref={contentRef}
                    className="relative flex flex-col items-center gap-12"
                >
                    <div className="text-7xl md:text-9xl text-(--primary) opacity-10 absolute -top-10 left-1/2 -translate-x-1/2 select-none font-serif">
                        &ldquo;
                    </div>

                    <p className="text-3xl md:text-5xl font-medium tracking-tight leading-tight max-w-4xl lowercase italic text-gray-200">
                        {testimonials[currentIndex].text}
                    </p>

                    <div className="flex flex-col items-center gap-6 mt-12">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-900 p-2 glass">
                            <img
                                src={testimonials[currentIndex].image}
                                alt={testimonials[currentIndex].name}
                                className="w-full h-full object-cover rounded-full grayscale"
                            />
                        </div>
                        <div className="text-center">
                            <h4 className="text-2xl font-bold tracking-tight text-white mb-1 uppercase tracking-widest">{testimonials[currentIndex].name}</h4>
                            <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em]">{testimonials[currentIndex].role}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-24 flex items-center gap-12">
                    <button
                        onClick={prev}
                        className="w-16 h-16 rounded-full border border-zinc-900 flex items-center justify-center hover:bg-(--primary) hover:text-black hover:border-(--primary) transition-all duration-500 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>

                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <div 
                                key={i} 
                                className={`w-2 h-2 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-(--primary)' : 'bg-zinc-800'}`}
                            ></div>
                        ))}
                    </div>

                    <button
                        onClick={next}
                        className="w-16 h-16 rounded-full border border-zinc-900 flex items-center justify-center hover:bg-(--primary) hover:text-black hover:border-(--primary) transition-all duration-500 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
