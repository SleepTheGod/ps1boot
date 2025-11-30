import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import { StartupSequence } from './components/StartupSequence';
import { BiosMenu } from './components/BiosMenu';
import { ControllerOverlay } from './components/ControllerOverlay';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.POWER_OFF);
  
  // Handle the transition from Startup -> Black Screen -> Menu
  const handleStartupComplete = () => {
    setAppState(AppState.BLACK_SCREEN);
    
    // Simulate the "Check for Disk" pause (Black Screen)
    // If there was a disk, the PS logo would show here.
    // Without a disk, it lingers on black then goes to menu.
    setTimeout(() => {
      setAppState(AppState.BIOS_MENU);
    }, 2500);
  };

  const handlePowerOn = () => {
    setAppState(AppState.STARTUP_LOGO);
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center scanlines crt-flicker">
      
      {/* Aspect Ratio Container: PS1 outputs 4:3 typically */}
      <div className="relative w-full h-full max-w-[calc(100vh*1.33)] aspect-[4/3] bg-black shadow-2xl overflow-hidden border-x-8 border-[#111]">
        
        {appState === AppState.POWER_OFF && (
           <div className="flex flex-col items-center justify-center h-full text-white space-y-8">
             <div className="w-64 h-40 bg-gray-800 rounded-lg shadow-inner flex items-center justify-center border-b-8 border-gray-900">
                <div className="w-48 h-48 rounded-full bg-gray-900 border-4 border-gray-700 flex items-center justify-center transform -translate-y-12">
                   {/* Power Button Simulation */}
                   <button 
                    onClick={handlePowerOn}
                    className="w-32 h-32 rounded-full bg-gray-300 border-4 border-gray-400 shadow-xl active:translate-y-1 active:shadow-none flex items-center justify-center transition-transform hover:scale-105 group"
                   >
                     <div className="text-gray-500 font-bold text-xl group-hover:text-green-600">POWER</div>
                   </button>
                </div>
             </div>
             <p className="text-gray-500 font-mono animate-pulse">PRESS POWER BUTTON</p>
           </div>
        )}

        {appState === AppState.STARTUP_LOGO && (
          <StartupSequence onComplete={handleStartupComplete} />
        )}

        {appState === AppState.BLACK_SCREEN && (
          <div className="w-full h-full bg-black" />
        )}

        {(appState === AppState.BIOS_MENU || appState === AppState.MEMORY_CARD || appState === AppState.CD_PLAYER) && (
          <BiosMenu onStateChange={setAppState} />
        )}

        {/* Overlay controls always available for mobile when powered on */}
        {appState !== AppState.POWER_OFF && <ControllerOverlay />}

      </div>
    </div>
  );
};

export default App;