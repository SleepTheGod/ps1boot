import React, { useEffect, useState } from 'react';
import { AppState } from '../types';
import { playStartupSound } from '../utils/sound';

interface StartupSequenceProps {
  onComplete: () => void;
}

export const StartupSequence: React.FC<StartupSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'logo' | 'text' | 'fadeout'>('logo');

  useEffect(() => {
    // Start sequence
    playStartupSound();
    
    // Phase 1: Logo appears immediately, Text follows
    const textTimer = setTimeout(() => {
      setPhase('text');
    }, 1000);

    // Phase 2: Fade out to black (transition to no-disk check)
    // The actual PS1 boot is about 5-8 seconds on white screen.
    const fadeTimer = setTimeout(() => {
      setPhase('fadeout');
    }, 6000);

    // Phase 3: Complete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 7500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`w-full h-full bg-white flex flex-col items-center justify-center transition-opacity duration-[1500ms] ${phase === 'fadeout' ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* The Golden/Orange Diamond */}
      <div className="relative w-48 h-48 mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF8C00] transform rotate-45 shadow-xl border border-yellow-600">
           {/* Inner shine for 3D effect */}
           <div className="absolute top-0 left-0 w-full h-1/2 bg-white opacity-20"></div>
        </div>
      </div>

      {/* Sony Computer Entertainment Text */}
      <div className={`flex flex-col items-center transition-opacity duration-1000 ${phase === 'logo' ? 'opacity-0' : 'opacity-100'}`}>
         {/* Using a font stack that mimics the serif-like corporate logo, though standard sans/serif is close enough for CSS */}
         <h1 className="text-5xl font-bold tracking-widest text-[#333] scale-y-110" style={{ fontFamily: 'Times New Roman, serif' }}>
           Sony
         </h1>
         <h2 className="text-3xl font-bold tracking-widest text-[#333] mt-2 scale-y-90 opacity-90" style={{ fontFamily: 'Times New Roman, serif' }}>
           Computer Entertainment
         </h2>
      </div>
    </div>
  );
};