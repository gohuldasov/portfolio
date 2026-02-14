import React, { useEffect, useRef } from 'react';
import { Form, Input, Button, ConfigProvider, theme } from 'antd';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const [form] = Form.useForm();
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "bottom bottom",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(headerRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
                .from(formRef.current, {
                    x: -50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.5")
                .from(cardRef.current, {
                    x: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.8");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#a3e635',
                    colorBgContainer: '#111111',
                    colorBorder: 'rgba(255, 255, 255, 0.1)',
                    colorText: '#ffffff',
                    colorTextPlaceholder: 'rgba(255, 255, 255, 0.3)',
                    controlHeight: 50,
                    borderRadius: 12,
                },
                components: {
                    Input: {
                        activeBorderColor: '#a3e635',
                        hoverBorderColor: '#a3e635',
                    },
                    Button: {
                        defaultGhostColor: '#ffffff',
                        defaultGhostBorderColor: '#ffffff',
                    }
                }
            }}
        >
            <section id="contact" ref={sectionRef} className="min-h-screen bg-black text-white py-20 px-6 flex items-center overflow-hidden">
                <div className="max-w-6xl mx-auto w-full">
                    {/* Header */}
                    <div ref={headerRef} className="mb-12">
                        <div className="flex items-center gap-2 mb-6">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#a3e635]">
                                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-[#a3e635] text-sm font-bold tracking-widest uppercase">Connect with me</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                            Let's start a project <br />
                            together
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Left Column: Form using Ant Design */}
                        <div ref={formRef}>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                className="space-y-4"
                                size="large"
                            >
                                <Form.Item
                                    name="name"
                                    label={<span className="text-gray-300">Full Name</span>}
                                    rules={[{ required: true, message: 'Please input your name!' }]}
                                >
                                    <Input placeholder="" className="!bg-[#111111] border-white/10" />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label={<span className="text-gray-300">Email</span>}
                                    rules={[
                                        { required: true, message: 'Please input your email!' },
                                        { type: 'email', message: 'Please enter a valid email!' }
                                    ]}
                                >
                                    <Input placeholder="" className="!bg-[#111111] border-white/10" />
                                </Form.Item>

                                <Form.Item
                                    name="message"
                                    label={<span className="text-gray-300">Message</span>}
                                    rules={[{ required: true, message: 'Please input your message!' }]}
                                >
                                    <Input.TextArea rows={6} placeholder="" className="!bg-[#111111] border-white/10" />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="default"
                                        htmlType="submit"
                                        className="!bg-transparent !text-white !border-white hover:!bg-white hover:!text-black hover:!border-white rounded-full px-8 h-12 font-medium transition-all"
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>

                        {/* Right Column: Profile Card */}
                        <div ref={cardRef} className="bg-[#0f0f11] p-8 md:p-10 rounded-[2rem] flex flex-col gap-8 h-fit border border-white/5">
                            {/* Status Badge */}
                            <div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                    <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"></span>
                                    <span className="text-xs font-medium text-gray-300">Available for work</span>
                                </span>
                            </div>

                            {/* Avatar */}
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10">
                                {/* Using a placeholder avatar that looks professional */}
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <p className="text-gray-400 leading-relaxed text-lg">
                                    My inbox is always open. Whether you have a project or just want to say Hi. I would love to hear from you. Feel free to contact me and I'll get back to you.
                                </p>
                            </div>

                            {/* Social Icons */}
                            <div className="flex items-center gap-6 text-gray-400">
                                <a href="#" className="hover:text-white transition-colors">
                                    {/* LinkedIn */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                </a>
                                <a href="#" className="hover:text-white transition-colors">
                                    {/* GitHub */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                </a>
                                <a href="#" className="hover:text-white transition-colors">
                                    {/* Instagram */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="#" className="hover:text-white transition-colors">
                                    {/* Email / Envelope */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </a>
                                <a href="#" className="hover:text-white transition-colors">
                                    {/* Twitter */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ConfigProvider>
    );
};

export default Contact;
