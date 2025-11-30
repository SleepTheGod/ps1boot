import React from 'react';

// Emulates key presses for mobile/mouse users
export const ControllerOverlay: React.FC = () => {
  const triggerKey = (key: string) => {
    const event = new KeyboardEvent('keydown', { key });
    window.dispatchEvent(event);
  };

  return (
    <div className="absolute bottom-4 left-4 right-4 z-50 flex justify-between pointer-events-none md:hidden opacity-50 hover:opacity-100 transition-opacity">
      {/* D-Pad */}
      <div className="pointer-events-auto bg-gray-800/50 p-4 rounded-full backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2">
           <button className="w-12 h-12 bg-gray-700 rounded active:bg-gray-500" onClick={() => triggerKey('ArrowUp')}>▲</button>
           <div className="flex gap-2">
             <button className="w-12 h-12 bg-gray-700 rounded active:bg-gray-500" onClick={() => triggerKey('ArrowLeft')}>◀</button>
             <button className="w-12 h-12 bg-gray-700 rounded active:bg-gray-500" onClick={() => triggerKey('ArrowDown')}>▼</button>
             <button className="w-12 h-12 bg-gray-700 rounded active:bg-gray-500" onClick={() => triggerKey('ArrowRight')}>▶</button>
           </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pointer-events-auto bg-gray-800/50 p-4 rounded-full backdrop-blur-sm flex items-center justify-center gap-4">
          <button className="w-14 h-14 rounded-full bg-red-800/80 border-2 border-red-500 text-red-200 active:scale-95" onClick={() => triggerKey('Backspace')}>□</button>
          <button className="w-14 h-14 rounded-full bg-blue-800/80 border-2 border-blue-500 text-blue-200 active:scale-95" onClick={() => triggerKey('Enter')}>✕</button>
      </div>
    </div>
  );
};