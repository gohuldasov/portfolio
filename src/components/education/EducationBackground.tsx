import React from "react";

export const EducationBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent select-none">
            {/* Hand-Drawn Math Equations & Geometry Watermarks Matching Reference Image */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none text-black font-serif">
                <div className="absolute top-[15%] right-[10%] text-xs space-y-2 -rotate-6">
                    <p className="font-bold text-sm">(a ± b)² = a² ± 2ab + b²</p>
                    <p>lim f(x) = ±∞  |  P = πr²</p>
                    <p>∫ uᵃ du = uᵃ⁺¹/(a+1) + C</p>
                </div>

                <div className="absolute bottom-[20%] left-[6%] text-xs space-y-2 rotate-12">
                    <p className="font-bold text-sm">cos 2X = cos²X - sin²X</p>
                    <p>log_b a = x ⟺ bˣ = a  |  c² = a² + b²</p>
                    <p>S_Δ = √(p(p-a)(p-b)(p-c))</p>
                </div>
            </div>
        </div>
    );
};
