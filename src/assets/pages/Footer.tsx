const Footer = () => {
    const socialLinks = [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/gohuldasov/",
        },
        {
            name: "Github",
            url: "https://github.com/gohuldasov",
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/go__hu_l__/",
        },
    ];

    return (
        <footer className="bg-[var(--background)] py-20 px-6 md:px-24 border-t border-[var(--glass-border)] text-[var(--text)]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="text-3xl font-bold tracking-tighter uppercase leading-none">
                        <span className="text-[var(--primary)]">G</span>D
                    </div>

                    <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-[0.4em] text-center md:text-left">
                        © 2026 GOHUL DAS <br />
                        <span className="font-light lowercase opacity-60 tracking-widest mt-1 inline-block italic">
                            design & engineering excellence
                        </span>
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-6">
                    <div className="flex items-center gap-8">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;