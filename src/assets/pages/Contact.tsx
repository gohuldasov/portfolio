import { useRef } from 'react';
import { Form, Input, ConfigProvider, theme } from 'antd';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {

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
    const [form] = Form.useForm();
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".contact-element", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            }
        });
    }, { scope: sectionRef });

    const onFinish = (values: any) => {
        const { name, email, message } = values;

        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);

        const body = encodeURIComponent(
            `Name: ${name}

            Email: ${email}

            Message:
            ${message}`
        );

        window.location.href = `mailto:[EMAIL_ADDRESS]?subject=${subject}&body=${body}`;
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#000000',
                    colorBgContainer: 'rgba(255, 255, 255, 0.85)',
                    colorBorder: 'rgba(212, 212, 216, 0.85)',
                    colorText: '#09090b',
                    colorTextPlaceholder: '#71717a',
                    controlHeight: 48,
                    borderRadius: 16,
                },
                components: {
                    Input: {
                        activeBorderColor: '#000000',
                        hoverBorderColor: '#000000',
                    }
                }
            }}
        >
            <section id="contact" ref={sectionRef} className="py-32 px-6 md:px-16 lg:px-24 xl:px-40 bg-[var(--background)] text-[var(--text)] overflow-hidden">
                <div ref={containerRef} className="max-w-6xl mx-auto">
                    <div className="contact-element mb-24">
                        <div className="flex items-center gap-4 mb-8 text-center justify-center">
                            <div className="w-12 h-px bg-(--primary)"></div>
                            <span className="text-(--primary) text-xs font-bold tracking-[0.4em] uppercase">Get In Touch</span>
                            <div className="w-12 h-1px bg-(--primary)"></div>
                        </div>
                        <h2 className="text-7xl md:text-[10rem] font-bold tracking-tighter uppercase leading-[0.8] text-center">
                            Let&apos;s build <br /> <span className="text-primary-gradient italic">Together</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                        <div className="contact-element space-y-12">
                            <p className="text-2xl md:text-3xl font-light text-[var(--text-muted)] lowercase leading-tight">
                                my inbox is <span className="text-[var(--primary)] italic font-semibold">always open</span>. whether you have a project idea or just want to say hi, I am here to listen.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--primary)] mb-4">Email Me</h4>
                                    <a href="mailto:gohuldasov@gmail.com" className="text-2xl font-bold hover:text-[var(--primary)] transition-colors inline-block pb-1 border-b border-[var(--glass-border)] group text-[var(--text)]">
                                        gohuldasov@gmail.com
                                    </a>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--primary)] mb-4">Availability</h4>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse shadow-[0_0_15px_var(--primary-glow)]"></div>
                                        <span className="text-2xl font-bold text-[var(--text)]">Open for Work</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 pt-12">
                                <div className="flex items-center gap-8 pt-12">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--primary)] transition-all transform hover:-translate-y-1"
                                        >
                                            {social.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="contact-element">
                            <div className="glass p-8 md:p-10 rounded-3xl border border-[var(--glass-border)] relative">
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    className="space-y-4"
                                    size="middle"
                                >
                                    <Form.Item
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter your name",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Full Name" />
                                    </Form.Item>

                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter your email",
                                            },
                                            {
                                                type: "email",
                                                message: "Please enter a valid email",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Email Address" />
                                    </Form.Item>

                                    <Form.Item
                                        name="message"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter your message",
                                            },
                                        ]}
                                    >
                                        <Input.TextArea rows={4} placeholder="Your Message" />
                                    </Form.Item>

                                    <Form.Item className="mt-6">
                                        <button
                                            type="submit"
                                            className="w-full h-14 rounded-2xl bg-(--primary) text-white font-bold text-xs uppercase tracking-[0.3em] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300 cursor-pointer"
                                        >
                                            Send Message
                                        </button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ConfigProvider>
    );
};

export default Contact;
