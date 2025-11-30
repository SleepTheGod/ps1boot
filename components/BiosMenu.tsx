import React, { useState, useEffect, useCallback } from 'react';
import { AppState } from '../types';
import { playMenuMoveSound, playMenuSelectSound } from '../utils/sound';

interface BiosMenuProps {
  onStateChange: (state: AppState) => void;
}

export const BiosMenu: React.FC<BiosMenuProps> = ({ onStateChange }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  // 0: Memory Card, 1: CD Player
  const items = [
    { id: 'mem', label: 'Memory Card', state: AppState.MEMORY_CARD },
    { id: 'cd', label: 'CD Player', state: AppState.CD_PLAYER },
  ];

  const handleMove = useCallback((direction: 'left' | 'right') => {
    playMenuMoveSound();
    if (direction === 'left') setSelectedIdx(0);
    if (direction === 'right') setSelectedIdx(1);
  }, []);

  const handleSelect = useCallback(() => {
    playMenuSelectSound();
    // In a full app, we would transition to sub-states. 
    // For this visual demo, we just animate/acknowledge.
    console.log("Selected:", items[selectedIdx].label);
  }, [items, selectedIdx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleMove('left');
      if (e.key === 'ArrowRight') handleMove('right');
      if (e.key === 'Enter' || e.key === ' ') handleSelect();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove, handleSelect]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black text-white font-mono">
      {/* Background Gradient - Dark Blue Gradients matching PS1 Bios */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, #2a2a6e 0%, #1a1a4e 40%, #000 100%),
            repeating-linear-gradient(transparent 0, transparent 2px, rgba(0,0,0,0.5) 3px)
          `
        }}
      >
        {/* The Spheres in the background */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-800 opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-900 opacity-20 blur-3xl"></div>
      </div>

      {/* Grid Floor Effect */}
      <div className="absolute bottom-0 w-full h-1/2 opacity-30 pointer-events-none" 
           style={{
             background: 'linear-gradient(to bottom, transparent, #444 1px, transparent 1px), linear-gradient(to right, transparent, #444 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)',
             transformOrigin: 'bottom'
           }}>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
        
        {/* Title */}
        <div className="absolute top-12 text-center w-full">
           <h1 className="text-4xl tracking-[0.2em] text-gray-300 drop-shadow-md opacity-80" style={{ textShadow: '2px 2px 0px #000' }}>
             System Configuration
           </h1>
        </div>

        {/* Menu Items Container */}
        <div className="flex justify-center items-center gap-16 md:gap-32 mt-12 w-full max-w-4xl">
          
          {/* Memory Card Option */}
          <div 
            className={`flex flex-col items-center transition-transform duration-200 ${selectedIdx === 0 ? 'scale-110' : 'scale-90 opacity-60'}`}
            onClick={() => { setSelectedIdx(0); handleSelect(); }}
          >
            {/* Retro Memory Card Icon CSS */}
            <div className="w-32 h-24 bg-gray-400 border-b-8 border-gray-600 rounded-t-lg relative shadow-xl overflow-hidden mb-4">
              <div className="absolute top-0 left-0 right-0 h-4 bg-gray-300"></div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-12 bg-gray-300 border-2 border-gray-500"></div>
            </div>
            <span className={`text-2xl tracking-widest ${selectedIdx === 0 ? 'text-yellow-300' : 'text-gray-400'}`}>
              MEMORY CARD
            </span>
          </div>

          {/* CD Player Option */}
          <div 
            className={`flex flex-col items-center transition-transform duration-200 ${selectedIdx === 1 ? 'scale-110' : 'scale-90 opacity-60'}`}
            onClick={() => { setSelectedIdx(1); handleSelect(); }}
          >
             {/* Retro CD Icon CSS */}
             <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-gray-300 to-gray-100 border-4 border-gray-400 relative shadow-xl mb-4 flex items-center justify-center">
               <div className="w-8 h-8 rounded-full bg-black border-2 border-gray-500"></div>
               <div className="absolute inset-0 rounded-full border border-white opacity-50"></div>
               {/* Shine */}
               <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-b from-transparent via-white to-transparent opacity-30 rotate-45"></div>
             </div>
             <span className={`text-2xl tracking-widest ${selectedIdx === 1 ? 'text-yellow-300' : 'text-gray-400'}`}>
               CD PLAYER
             </span>
          </div>

        </div>

        {/* Cursor - The Iconic Rainbow Grid Cursor */}
        {/* We absolutely position it based on selection, or just use simpler flex logic above with highlighted text. 
            The PS1 cursor is actually a block behind the text or a specific pointer. 
            Standard memory card menu actually uses a rainbow highlight on the text or a box. 
            Let's simulate the rainbow text effect for selected item.
        */}

        {/* Footer Hints */}
        <div className="absolute bottom-12 w-full px-12 flex justify-between text-xl text-gray-400 tracking-wider">
           <div className="flex gap-4">
              <span className="text-white">✕</span> Select
              <span className="text-white ml-4">○</span> Back
           </div>
        </div>

      </div>
    </div>
  );
};