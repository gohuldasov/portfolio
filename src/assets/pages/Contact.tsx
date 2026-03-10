import { useRef } from 'react';
import { Form, Input, ConfigProvider, theme } from 'antd';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
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
        console.log('Success:', values);
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#a3e635',
                    colorBgContainer: 'transparent',
                    colorBorder: 'rgba(255, 255, 255, 0.05)',
                    colorText: '#ffffff',
                    colorTextPlaceholder: 'rgba(255, 255, 255, 0.2)',
                    controlHeight: 60,
                    borderRadius: 24,
                },
                components: {
                    Input: {
                        activeBorderColor: '#a3e635',
                        hoverBorderColor: '#a3e635',
                    }
                }
            }}
        >
            <section id="contact" ref={sectionRef} className="py-32 px-6 md:px-24 bg-[#09090b] text-white overflow-hidden">
                <div ref={containerRef} className="max-w-6xl mx-auto">
                    <div className="contact-element mb-24">
                        <div className="flex items-center gap-4 mb-8 text-center justify-center">
                            <div className="w-12 h-px bg-(--primary)"></div>
                            <span className="text-(--primary) text-xs font-bold tracking-[0.4em] uppercase">Get In Touch</span>
                            <div className="w-12 h-1px bg-(--primary)"></div>
                        </div>
                        <h2 className="text-7xl md:text-[10rem] font-bold tracking-tighter uppercase leading-[0.8] text-center">
                            Let&apos;s build <br /> <span className="text-gray-800 italic">Together</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                        <div className="contact-element space-y-12">
                            <p className="text-2xl md:text-3xl font-light text-gray-400 lowercase leading-tight">
                                my inbox is <span className="text-white italic">always open</span>. whether you have a project idea or just want to say hi, I am here to listen.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-(--primary) mb-4">Email Me</h4>
                                    <a href="mailto:hello@devraj.com" className="text-2xl font-bold hover:text-(--primary) transition-colors inline-block pb-1 border-b border-gray-900 group">
                                        hello@devraj.com
                                    </a>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-(--primary) mb-4">Availability</h4>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-(--primary) animate-pulse shadow-[0_0_10px_#a3e635]"></div>
                                        <span className="text-2xl font-bold">Open for Work</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 pt-12">
                                {['LinkedIn', 'Github', 'Instagram', 'Twitter'].map((social) => (
                                    <a 
                                        key={social} 
                                        href="#" 
                                        className="text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-white transition-all transform hover:-translate-y-1"
                                    >
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="contact-element">
                            <div className="glass p-12 rounded-[4rem] border border-zinc-900 border-white/5 relative">
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    className="space-y-6"
                                    size="large"
                                >
                                    <Form.Item name="name" className="m-0">
                                        <Input placeholder="Full Name" className="glass border-white/5! hover:border-(--primary)/50! focus:border-(--primary)! transition-all px-8 bg-transparent" />
                                    </Form.Item>

                                    <Form.Item name="email" className="m-0">
                                        <Input placeholder="Email Address" className="glass border-white/5! hover:border-(--primary)/50! focus:border-(--primary)! transition-all px-8 bg-transparent" />
                                    </Form.Item>

                                    <Form.Item name="message" className="m-0">
                                        <Input.TextArea rows={5} placeholder="Your Message" className="glass border-white/5! hover:border-(--primary)/50! focus:border-(--primary)! transition-all px-8 py-6 bg-transparent" />
                                    </Form.Item>

                                    <Form.Item className="mt-8">
                                        <button
                                            type="submit"
                                            className="w-full h-20 rounded-4xl bg-(--primary) text-black font-bold text-sm uppercase tracking-[0.3em] hover:scale-[1.02] transition-all duration-300"
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
