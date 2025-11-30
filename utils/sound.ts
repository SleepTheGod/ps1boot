/**
 * Synthesizes a sound approximating the PS1 startup drone and chime.
 * We use a synthesis approach to avoid external asset dependencies.
 */
export const playStartupSound = async () => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();

  // Master Gain
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.setValueAtTime(0.8, ctx.currentTime);

  const t = ctx.currentTime;

  // 1. The Deep Drone (The iconic bass swell)
  const droneOsc = ctx.createOscillator();
  droneOsc.type = 'sawtooth';
  droneOsc.frequency.setValueAtTime(50, t); // Low G/C area
  droneOsc.frequency.exponentialRampToValueAtTime(100, t + 4); 
  
  const droneGain = ctx.createGain();
  droneGain.gain.setValueAtTime(0, t);
  droneGain.gain.linearRampToValueAtTime(0.6, t + 0.5);
  droneGain.gain.exponentialRampToValueAtTime(0.01, t + 6);
  
  // Filter for the drone to make it "washy"
  const droneFilter = ctx.createBiquadFilter();
  droneFilter.type = 'lowpass';
  droneFilter.frequency.setValueAtTime(200, t);
  droneFilter.frequency.linearRampToValueAtTime(1000, t + 3);

  droneOsc.connect(droneFilter);
  droneFilter.connect(droneGain);
  droneGain.connect(masterGain);
  droneOsc.start(t);
  droneOsc.stop(t + 7);

  // 2. The "Chime" (Sparkling high notes)
  // We simulate this with a few high sine waves detuned
  const frequencies = [523.25, 783.99, 1046.50, 1567.98]; // C majorish
  
  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0, t);
    // Stagger entrances slightly
    oscGain.gain.linearRampToValueAtTime(0.1, t + 0.2 + (i * 0.1)); 
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 5);

    osc.connect(oscGain);
    oscGain.connect(masterGain);
    osc.start(t);
    osc.stop(t + 6);
  });

  // 3. White Noise Swoosh (Windy effect)
  const bufferSize = ctx.sampleRate * 5; // 5 seconds
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.Q.value = 1;
  noiseFilter.frequency.setValueAtTime(400, t);
  noiseFilter.frequency.linearRampToValueAtTime(2000, t + 4);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0, t);
  noiseGain.gain.linearRampToValueAtTime(0.1, t + 1);
  noiseGain.gain.linearRampToValueAtTime(0, t + 5);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);
  noise.start(t);

  // Auto close context after sound finishes to save resources
  setTimeout(() => {
    if(ctx.state !== 'closed') ctx.close();
  }, 8000);
};

export const playMenuMoveSound = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
};

export const playMenuSelectSound = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
};