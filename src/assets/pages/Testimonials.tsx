import { useState } from 'react';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: "Samiksha Pawar",
            role: "Software Engineer @Conexao Technology Solutions",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
            text: "Devraj is a very artistic person. We have worked as graphic designers for a regional event. He is amazing at designing as well as web designing. I surely recommend him to everyone who needs these services."
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

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="testimonials" className="min-h-screen bg-black text-white py-20 px-6 flex items-center">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Column: Info */}
                <div className="space-y-8">
                    {/* Label */}
                    <div className="flex items-center gap-2 mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#a3e635]">
                            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#a3e635] text-sm font-bold tracking-widest uppercase">Testimonials</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                        What others <br /> say
                    </h2>

                    <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                        I've worked with some amazing people over the years, here is what they have to say about me.
                    </p>

                    <div className="pt-8">
                        <a href="#" className="inline-flex items-center gap-2 text-white border-b border-white pb-1 hover:text-[#a3e635] hover:border-[#a3e635] transition-colors group">
                            Check it out on Linkedin
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Right Column: Carousel */}
                <div className="relative">
                    {/* Card */}
                    <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-[2.5rem] relative min-h-[400px] flex flex-col justify-center transition-all duration-500">
                        {/* Avatar & Info */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10">
                                <img
                                    src={testimonials[currentIndex].image}
                                    alt={testimonials[currentIndex].name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white">{testimonials[currentIndex].name}</h4>
                                <p className="text-gray-500 text-sm">{testimonials[currentIndex].role}</p>
                            </div>
                        </div>

                        {/* Quote */}
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                            "{testimonials[currentIndex].text}"
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-end gap-6 mt-8">
                        {/* Prev Button */}
                        <button
                            onClick={prevTestimonial}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>

                        {/* Counter */}
                        <span className="text-gray-500 font-mono">
                            {currentIndex + 1} / {testimonials.length}
                        </span>

                        {/* Next Button */}
                        <button
                            onClick={nextTestimonial}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
