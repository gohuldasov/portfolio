import { useState } from 'react';
// using a placeholder for now since image generation failed
const workspaceImg = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";

const Expertise = () => {
    const [activeTab, setActiveTab] = useState(0);

    const expertiseItems = [
        {
            title: "Development",
            description: "I build scalable, high-performance web applications using modern technologies like React, TypeScript, and Node.js. I focus on clean code and efficient architecture."
        },
        {
            title: "UI/UX Design",
            description: "I design intuitive and visually appealing user interfaces. My approach combines aesthetics with usability to create seamless digital experiences."
        },
        {
            title: "Branding",
            description: "I help brands establish a strong identity through logo design, color typography, and visual storytelling that resonates with their target audience."
        }
    ];

    const techStack = [
        { name: "MongoDB", icon: "🍃" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "Cypress", icon: "🧪" },
        { name: "Docker", icon: "🐳" },
        { name: "Firebase", icon: "🔥" },
        { name: "AWS", icon: "☁️" },
        { name: "GSAP", icon: "🎭" },
        { name: "Framer Motion", icon: "🚀" },
        { name: "Figma", icon: "🎨" },
    ];

    return (
        <section id="expertise" className="min-h-screen  text-white py-20 px-12">
            <div className=" mx-auto">

                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#a3e635]">
                            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#a3e635] text-sm font-bold tracking-widest uppercase">Speciality</span>
                    </div>
                    <h2 className="ttext-2xl md:text-4xl font-bold mb-6">Areas of Expertise</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    <div className="space-y-4">
                        {expertiseItems.map((item, index) => (
                            <div
                                key={index}
                                className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border ${activeTab === index ? 'bg-zinc-900 border-zinc-800' : 'bg-transparent border-transparent hover:bg-zinc-900/50'}`}
                                onClick={() => setActiveTab(index)}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className={`text-2xl font-semibold flex items-center gap-3 ${activeTab === index ? 'text-white' : 'text-gray-400'}`}>
                                        {index === 0 && <span className="text-purple-400">{'</>'}</span>}
                                        {index === 1 && <span className="text-pink-400">✎</span>}
                                        {index === 2 && <span className="text-blue-400">❄</span>}
                                        {item.title}
                                    </h3>
                                    <div className={`transform transition-transform duration-300 ${activeTab === index ? 'rotate-180 text-white' : 'rotate-0 text-gray-500'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>
                                <div className={`grid transition-all duration-300 ease-in-out ${activeTab === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <p className="text-gray-400 leading-relaxed overflow-hidden">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="relative rounded-[2.5rem] overflow-hidden h-[500px] border border-zinc-800 hidden lg:block">
                        <img
                            src={workspaceImg}
                            alt="Developer Workspace"
                            className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                        />

                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,6px_100%]"></div>
                    </div>
                </div>






                <div className="mt-20 pt-10 ">

                    <div className="relative flex overflow-x-hidden group">

                        <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-[#09090b] to-transparent pointer-events-none"></div>
                        <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-[#09090b] to-transparent pointer-events-none"></div>

                        <div className="flex animate-infinite-scroll whitespace-nowrap hover:[animation-play-state:paused] ">

                            {techStack.map((tech, index) => (
                                <div key={`tech-${index}`} className="mx-4 flex items-center gap-2 px-2 py-1 bg-zinc-900/50 rounded-full border border-zinc-800 hover:border-[#a3e635]/30 hover:bg-zinc-900 transition-colors cursor-pointer select-none">
                                    <span className="text-2xl">{tech.icon}</span>
                                    <span className="text-sm font-medium text-gray-400">{tech.name}</span>
                                </div>
                            ))}

                            {techStack.map((tech, index) => (
                                <div key={`tech-duplicate-${index}`} className="mx-4 flex items-center gap-2 px-2 py-1 bg-zinc-900/50 rounded-full border border-zinc-800 hover:border-[#a3e635]/30 hover:bg-zinc-900 transition-colors cursor-pointer select-none">
                                    <span className="text-2xl">{tech.icon}</span>
                                    <span className="text-sm font-medium text-gray-400">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Expertise;
