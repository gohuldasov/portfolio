

const Projects = () => {
    return (
        <section id="projects" className="min-h-screen px-12  text-white py-20 ">
            <div className="">

                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#a3e635]">
                            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#a3e635] text-sm font-bold tracking-widest uppercase">My Work</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-3">Selected Projects</h2>
                    <p className="text-gray-400 text-md ">
                        Here's a curated selection showcasing my expertise and the achieved results.
                    </p>
                </div>


                <div className="columns-1 md:columns-2 gap-8 space-y-8">


                    <div className="break-inside-avoid relative group">
                        <div className="bg-[#fdfba4] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden min-h-[600px] flex flex-col justify-end">

                            <div className="absolute top-12 inset-x-0 flex justify-center items-start transition-transform duration-500 group-hover:scale-105">

                                <div className="relative border-gray-900 bg-gray-900 border-[12px] rounded-[3rem] h-[550px] w-[300px] shadow-2xl flex flex-col overflow-hidden">

                                    <div className="h-8 bg-gray-900 w-full absolute top-0 left-0 z-20 flex justify-center">
                                        <div className="h-4 w-32 bg-black rounded-b-xl"></div>
                                    </div>


                                    <div className="flex-1 bg-gray-800 relative w-full overflow-hidden">

                                        <div className="bg-gray-900 p-6 pt-12 flex justify-between items-center text-white">
                                            <div className="font-bold flex items-center gap-1">
                                                <span className="text-purple-400">⚡</span> Aora
                                            </div>
                                        </div>


                                        <div className="p-4 space-y-4">
                                            <div className="bg-gray-700 h-32 rounded-xl w-full animate-pulse"></div>
                                            <div className="space-y-2">
                                                <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                                                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 mt-4">
                                                <div className="bg-gray-700 h-24 rounded-lg"></div>
                                                <div className="bg-gray-700 h-24 rounded-lg"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                          
                            <div className="relative z-10 pt-[400px] pointer-events-none">
                              
                            </div>
                        </div>
                    </div>

                   
                    <div className="break-inside-avoid relative group">
                        <div className="bg-[#ffcddf] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden min-h-[600px] flex flex-col justify-center items-center">
                           
                            <div className="w-full max-w-lg transition-transform duration-500 group-hover:scale-105">
                                <div className="bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-gray-800">
                                  
                                    <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                        <div className="ml-4 text-xs text-gray-400 font-mono">Untitled</div>
                                    </div>

                                  
                                    <div className="p-6 font-mono text-sm leading-relaxed text-gray-300">
                                        <div className="flex">
                                            <span className="text-gray-600 select-none mr-4">1</span>
                                            <span className="text-pink-400">include</span> <span className="text-yellow-300">&lt;stdio.h&gt;</span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-gray-600 select-none mr-4">2</span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-gray-600 select-none mr-4">3</span>
                                            <span className="text-blue-400">int</span> <span className="text-yellow-300">main</span>() {'{'}
                                        </div>
                                        <div className="flex">
                                            <span className="text-gray-600 select-none mr-4">4</span>
                                            <span className="pl-4"><span className="text-purple-400">for</span> (<span className="text-blue-400">int</span> i = <span className="text-orange-400">1</span>; i &lt;= <span className="text-orange-400">100</span>; i++) {'{'}</span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-gray-600 select-none mr-4">5</span>
                                            <span className="pl-8"><span className="text-purple-400">if</span> (i % <span className="text-orange-400">15</span> == <span className="text-orange-400">0</span>) </span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-gray-600 select-none mr-4">6</span>
                                            <span className="pl-12">printf(<span className="text-green-300">"FizzBuzz\n"</span>);</span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-gray-600 select-none mr-4">7</span>
                                            <span className="pl-8">{'}'}</span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-gray-600 select-none mr-4">8</span>
                                            <span className="pl-4"><span className="text-purple-400">return</span> <span className="text-orange-400">0</span>;</span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-gray-600 select-none mr-4">9</span>
                                            <span>{'}'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 mx-auto w-3/4 bg-[#1e1e1e] rounded-full p-2 flex justify-between items-center px-6 border border-gray-700 shadow-xl">
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <div className="w-10 h-2 rounded-full bg-gray-700"></div>
                                    </div>
                                    <div className="w-16 h-2 rounded-full bg-gray-700"></div>
                                    <div className="w-8 h-4 rounded-md bg-white/10"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Projects;
