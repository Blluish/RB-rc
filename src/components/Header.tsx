import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/audio.ts';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="w-full border-b border-zinc-800/80 px-4 py-3 sm:px-8 sm:py-4 flex items-center justify-between z-30 bg-[#09090B]/90 backdrop-blur-md sticky top-0">
      <div className="flex items-center gap-3">
        {/* Rubbrief Monogram Badge */}
        <div className="w-8 h-8 bg-white text-black font-['Syne',sans-serif] font-black text-sm flex items-center justify-center tracking-tighter select-none shadow-[2px_2px_0px_#3f3f46]">
          RB
        </div>
        <div className="flex items-center gap-2">
          <span className="font-['Syne',sans-serif] font-extrabold tracking-tight text-white text-sm sm:text-base">
            RUBBRIEF
          </span>
          <span className="text-zinc-600 text-xs select-none">/</span>
          <span className="font-mono text-[10px] sm:text-xs text-zinc-400 tracking-widest uppercase">
            COLOR SLOT™
          </span>
        </div>
      </div>

      {/* Right audio control */}
      <div className="flex items-center gap-3">
        <button
          id="sound-toggle-btn"
          onClick={() => {
            const next = !soundEnabled;
            soundEngine.enabled = next;
            soundEngine.playToggleSound(next);
            onToggleSound();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer select-none"
          title={soundEnabled ? 'Mute audio clicks' : 'Enable audio clicks'}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline text-[11px]">AUDIO ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
              <span className="hidden sm:inline text-[11px] text-zinc-500">AUDIO OFF</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
