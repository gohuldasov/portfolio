const Footer = () => {
    return (
        <footer className="bg-(--background) py-20 px-6 md:px-24 border-t border-white/5">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="text-3xl font-bold tracking-tighter uppercase leading-none">
                        <span className="text-(--primary)">G</span>D
                    </div>
                    <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.4em] text-center md:text-left">
                        © 2026 GOHUL DAS <br /> 
                        <span className="font-light lowercase opacity-50 tracking-widest mt-1 inline-block italic">design & engineering excellence</span>
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-6">
                    <div className="flex items-center gap-8">
                        {['LinkedIn', 'Github', 'Instagram'].map((social) => (
                            <a 
                                key={social} 
                                href="#" 
                                className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-(--primary) transition-colors"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-white/20 text-[8px] uppercase tracking-[0.3em] font-bold">
                        
                        <div className="w-1.5 h-1.5 rounded-full bg-(--primary) animate-pulse shadow-[0_0_8px_#8b5cf6]"></div>
                        <span>Status: Online</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
