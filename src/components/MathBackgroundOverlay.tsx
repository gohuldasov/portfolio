import React from "react";

export const MathBackgroundOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-[0.11] text-black">
            {/* Organic, Randomly Scattered Math Formulas & Geometric Drawings Wallpaper */}
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="random-math-doodle-pattern" width="600" height="900" patternUnits="userSpaceOnUse">

                        {/* 1. (a±b)² Formula (Rotated -12deg) */}
                        <g transform="translate(30, 40) rotate(-12)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <text x="0" y="0" fontSize="16" fontFamily="serif" fontWeight="bold">(a ± b)² = a² ± 2ab + b²</text>
                        </g>

                        {/* 2. 3D Wireframe Cube (Rotated 15deg) */}
                        <g transform="translate(260, 20) rotate(15)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <polygon points="0,15 25,0 55,0 30,15" fill="none" stroke="currentColor" strokeWidth="1" />
                            <polygon points="0,15 30,15 30,45 0,45" fill="none" stroke="currentColor" strokeWidth="1" />
                            <polygon points="30,15 55,0 55,30 30,45" fill="none" stroke="currentColor" strokeWidth="1" />
                            <line x1="33" y1="18" x2="52" y2="3" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="33" y1="24" x2="52" y2="9" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="33" y1="30" x2="52" y2="15" stroke="currentColor" strokeWidth="0.5" />
                        </g>

                        {/* 3. P = πr² & Limits (Rotated 8deg) */}
                        <g transform="translate(420, 60) rotate(8)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <text x="0" y="0" fontSize="14" fontFamily="sans-serif">P = πr²</text>
                            <text x="0" y="25" fontSize="13" fontFamily="serif">lim_(x→∞) f(x) = ±∞</text>
                        </g>

                        {/* 4. Sphere with Longitude/Latitude (Rotated -20deg) */}
                        <g transform="translate(70, 140) rotate(-20)" fill="currentColor">
                            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" />
                            <ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" />
                            <ellipse cx="20" cy="20" rx="7" ry="18" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" />
                            <text x="45" y="24" fontSize="12" fontFamily="serif">x² + y² + z² = R²</text>
                        </g>

                        {/* 5. Discriminant D=b²-4ac (Rotated -5deg) */}
                        <g transform="translate(310, 130) rotate(-5)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <text x="0" y="0" fontSize="15" fontFamily="serif">D = b² - 4ac</text>
                            <text x="0" y="26" fontSize="13" fontFamily="serif">x_1,2 = (-b ± √D) / 2a</text>
                        </g>

                        {/* 6. Sine Wave Graph (Rotated 10deg) */}
                        <g transform="translate(450, 160) rotate(10)" fill="currentColor">
                            <line x1="-30" y1="0" x2="50" y2="0" stroke="currentColor" strokeWidth="0.8" />
                            <line x1="0" y1="-25" x2="0" y2="25" stroke="currentColor" strokeWidth="0.8" />
                            <path d="M -30 15 Q -15 -25 0 0 Q 15 25 30 0 Q 45 -25 50 -10" fill="none" stroke="currentColor" strokeWidth="1" />
                            <text x="15" y="-12" fontSize="9" fontFamily="sans-serif">y = sin x</text>
                        </g>

                        {/* 7. e = cos x + tg x (Rotated 18deg) */}
                        <g transform="translate(25, 230) rotate(18)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <text x="0" y="0" fontSize="14" fontFamily="serif">e = cos x + tg x</text>
                        </g>

                        {/* 8. Sequence Formula (Rotated -15deg) */}
                        <g transform="translate(210, 230) rotate(-15)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <text x="0" y="0" fontSize="13" fontFamily="serif">a_n = a_1 + d·(n - 1)</text>
                            <text x="0" y="24" fontSize="12" fontFamily="serif">S_n = (a_1 + a_n)·n / 2</text>
                        </g>

                        {/* 9. Logarithm Property (Rotated 7deg) */}
                        <g transform="translate(420, 250) rotate(7)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <text x="0" y="0" fontSize="13" fontFamily="serif">log_b a = x ⟺ b^x = a</text>
                        </g>

                        {/* 10. 3D Cylinder Diagram (Rotated -8deg) */}
                        <g transform="translate(60, 310) rotate(-8)" fill="currentColor">
                            <ellipse cx="20" cy="8" rx="18" ry="6" fill="none" stroke="currentColor" strokeWidth="1" />
                            <line x1="2" y1="8" x2="2" y2="38" stroke="currentColor" strokeWidth="1" />
                            <line x1="38" y1="8" x2="38" y2="38" stroke="currentColor" strokeWidth="1" />
                            <ellipse cx="20" cy="38" rx="18" ry="6" fill="none" stroke="currentColor" strokeWidth="1" />
                            <text x="48" y="26" fontSize="12" fontFamily="serif">V = πr²h</text>
                        </g>

                        {/* 11. Integral Formula (Rotated 14deg) */}
                        <g transform="translate(260, 320) rotate(14)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <text x="0" y="0" fontSize="15" fontFamily="serif">∫ uᵃ du = uᵃ⁺¹ / (a + 1) + C</text>
                        </g>

                        {/* 12. Trigonometric Identity (Rotated -11deg) */}
                        <g transform="translate(430, 340) rotate(-11)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <text x="0" y="0" fontSize="14" fontFamily="serif">cos 2X = cos²X - sin²X</text>
                            <text x="0" y="24" fontSize="12" fontFamily="serif">tg x = sin X / cos X</text>
                        </g>

                        {/* 13. Right Angle Triangle with Ruler Scale (Rotated 22deg) */}
                        <g transform="translate(30, 420) rotate(22)" fill="currentColor">
                            <polygon points="0,40 50,40 50,0" fill="none" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="0" y1="40" x2="5" y2="38" stroke="currentColor" strokeWidth="0.6" />
                            <line x1="12" y1="30" x2="17" y2="28" stroke="currentColor" strokeWidth="0.6" />
                            <line x1="25" y1="20" x2="30" y2="18" stroke="currentColor" strokeWidth="0.6" />
                            <line x1="37" y1="10" x2="42" y2="8" stroke="currentColor" strokeWidth="0.6" />
                            <text x="10" y="55" fontSize="11" fontFamily="sans-serif">c² = a² + b²</text>
                        </g>

                        {/* 14. Circle with Pie Sectors (Rotated -16deg) */}
                        <g transform="translate(230, 410) rotate(-16)" fill="currentColor">
                            <circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeWidth="1" />
                            <line x1="25" y1="25" x2="25" y2="3" stroke="currentColor" strokeWidth="0.8" />
                            <line x1="25" y1="25" x2="44" y2="14" stroke="currentColor" strokeWidth="0.8" />
                            <line x1="25" y1="25" x2="40" y2="40" stroke="currentColor" strokeWidth="0.8" />
                            <line x1="25" y1="25" x2="5" y2="30" stroke="currentColor" strokeWidth="0.8" />
                            <line x1="25" y1="25" x2="8" y2="12" stroke="currentColor" strokeWidth="0.8" />
                            <line x1="25" y1="25" x2="32" y2="8" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="25" y1="25" x2="38" y2="11" stroke="currentColor" strokeWidth="0.5" />
                        </g>

                        {/* 15. Exponential & Constants (Rotated 9deg) */}
                        <g transform="translate(380, 440) rotate(9)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <text x="0" y="0" fontSize="13" fontFamily="serif">f(x) = 2^(x+1) + 1</text>
                            <text x="0" y="24" fontSize="12" fontFamily="serif">π = 3.14159  |  e = 2.718</text>
                        </g>

                        {/* 16. Summation Formula (Rotated -18deg) */}
                        <g transform="translate(60, 520) rotate(-18)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <text x="0" y="0" fontSize="14" fontFamily="serif">∑_(i=1)ⁿ x_i = n · x̄</text>
                            <text x="0" y="26" fontSize="12" fontFamily="serif">S_Δ = √(p(p-a)(p-b)(p-c))</text>
                        </g>

                        {/* 17. Coordinate Axes with Intersecting Functions (Rotated 13deg) */}
                        <g transform="translate(310, 520) rotate(13)" fill="currentColor">
                            <line x1="-30" y1="0" x2="50" y2="0" stroke="currentColor" strokeWidth="0.9" />
                            <line x1="0" y1="-30" x2="0" y2="30" stroke="currentColor" strokeWidth="0.9" />
                            <line x1="-25" y1="25" x2="45" y2="-25" stroke="currentColor" strokeWidth="1" />
                            <line x1="-20" y1="-20" x2="40" y2="25" stroke="currentColor" strokeWidth="1" />
                            <text x="35" y="-10" fontSize="9" fontFamily="sans-serif">y = ax + b</text>
                        </g>

                        {/* 18. 3D Triangular Pyramid / Polyhedron (Rotated -9deg) */}
                        <g transform="translate(50, 620) rotate(-9)" fill="currentColor">
                            <polygon points="25,0 0,40 50,40" fill="none" stroke="currentColor" strokeWidth="1" />
                            <line x1="25" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" />
                            <line x1="0" y1="40" x2="20" y2="40" stroke="currentColor" strokeWidth="0.8" />
                            <line x1="50" y1="40" x2="20" y2="40" stroke="currentColor" strokeWidth="0.8" />
                            <text x="58" y="25" fontSize="12" fontFamily="serif">V = 1/3 A_b h</text>
                        </g>

                        {/* 19. Limit Fraction Formula (Rotated 16deg) */}
                        <g transform="translate(240, 630) rotate(16)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <text x="0" y="0" fontSize="13" fontFamily="serif">lim_(h→+∞) (√(n³+1) + h) / √(3n+2n-1)</text>
                            <text x="0" y="24" fontSize="12" fontFamily="serif">a/sin A = b/sin B = c/sin C</text>
                        </g>

                        {/* 20. Shaded Cube (Rotated -14deg) */}
                        <g transform="translate(440, 640) rotate(-14)" fill="currentColor">
                            <rect x="0" y="10" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" />
                            <rect x="12" y="0" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" />
                            <line x1="0" y1="10" x2="12" y2="0" stroke="currentColor" strokeWidth="1" />
                            <line x1="28" y1="10" x2="40" y2="0" stroke="currentColor" strokeWidth="1" />
                            <line x1="0" y1="38" x2="12" y2="28" stroke="currentColor" strokeWidth="1" />
                            <line x1="28" y1="38" x2="40" y2="28" stroke="currentColor" strokeWidth="1" />
                        </g>

                        {/* 21. Differential Equation & Sine Identity (Rotated -6deg) */}
                        <g transform="translate(40, 720) rotate(-6)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <text x="0" y="0" fontSize="13" fontFamily="serif">y' = x²y / (2xy)</text>
                            <text x="0" y="24" fontSize="12" fontFamily="serif">x + ay + bc = 0</text>
                        </g>

                        {/* 22. Gaussian Integral & Logarithm (Rotated 11deg) */}
                        <g transform="translate(270, 730) rotate(11)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <text x="0" y="0" fontSize="14" fontFamily="serif">∫_(-∞)^(∞) e^(-x²) dx = √π</text>
                            <text x="0" y="25" fontSize="12" fontFamily="serif">sin²(3X) + 1 = (C') = 0</text>
                        </g>

                        {/* 23. Final Random Formulas (Rotated -17deg) */}
                        <g transform="translate(420, 760) rotate(-17)" fill="currentColor" stroke="currentColor" strokeWidth="0.2">
                            <text x="0" y="0" fontSize="13" fontFamily="serif">L₀ = 2πR</text>
                            <text x="0" y="24" fontSize="12" fontFamily="serif">√(a b) / f = ∑(X - M) / 1</text>
                        </g>

                    </pattern>
                </defs>

                {/* Fill 100% of Width and 100% of Height Seamlessly */}
                <rect width="100%" height="100%" fill="url(#random-math-doodle-pattern)" />
            </svg>
        </div>
    );
};

export default MathBackgroundOverlay;
