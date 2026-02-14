
const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex flex-col justify-center px-12 relative pt-20">

            {/* Intro Tag */}
            <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
                <span className="text-2xl">👋</span>
                <span className="text-gray-300 text-lg font-medium">Hey! It's me Devraj,</span>
            </div>

            {/* Main Heading */}
            <div className="max-w-6xl">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-12">
                    Crafting <span className="text-[#a3e635]">purpose driven</span> <br />
                    experiences that inspire <br />
                    & engage.
                </h1>
            </div>

            {/* Bottom Grid: Description and CTA */}
            <div className="grid md:grid-cols-2 gap-12 items-end mt-8">
                {/* Social Links */}
                <div className="flex items-center gap-8 text-xs font-semibold tracking-widest text-gray-400">
                    {['LINKEDIN', 'GITHUB', 'INSTAGRAM', 'GMAIL'].map((social) => (
                        <a key={social} href="#" className="flex items-center gap-1 hover:text-[#a3e635] transition-colors group">
                            {social}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </a>
                    ))}
                </div>

                {/* Description & CTA */}
                <div className="flex flex-col items-end gap-8">
                    <p className="text-gray-400 text-lg leading-relaxed max-w-md text-right">
                        I work with brands globally to build pixel-perfect, engaging, and accessible digital experiences that drive results and achieve business goals.
                    </p>
                    <div className="flex items-center gap-6">
                        <button className="px-8 py-4 rounded-full border border-white/20 hover:border-[#a3e635] hover:text-[#a3e635] transition-all bg-transparent font-medium">
                            Know me better
                        </button>
                        {/* The circle arrow button from some designs, added for flair if needed, otherwise just the main button */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero