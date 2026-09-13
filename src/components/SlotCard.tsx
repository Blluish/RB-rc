import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { ColorItem } from '../types.ts';
import { getContrastColor } from '../utils/colors.ts';
import { soundEngine } from '../utils/audio.ts';

interface SlotCardProps {
  index: number;
  roleLabel: string;
  color: ColorItem;
  isSpinning: boolean;
}

export const SlotCard: React.FC<SlotCardProps> = ({
  index,
  roleLabel,
  color,
  isSpinning,
}) => {
  const [copied, setCopied] = useState(false);
  const textColor = getContrastColor(color.hex);

  const handleCardClick = () => {
    if (isSpinning) return;
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    soundEngine.playClick(600, 'sine', 0.04);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Slot Header Label */}
      <div className="flex items-center justify-end text-[10px] sm:text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-1 mb-2 px-0.5">
        <span className="text-zinc-500 tracking-wider uppercase text-[9px] sm:text-[10px]">
          {roleLabel}
        </span>
      </div>

      {/* Main Slot Reel Window - Click to copy */}
      <div
        id={`slot-card-${index}`}
        onClick={handleCardClick}
        className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden transition-all duration-300 select-none group border border-zinc-800 hover:border-zinc-500 cursor-pointer"
        title="Click to copy HEX code"
      >
        {/* Dynamic Color Fill Canvas */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-5 transition-colors duration-200"
          style={{ backgroundColor: color.hex }}
        >
          {/* Center Chromatic Identity: HEX & Color Name */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto py-4">
            <div
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono font-black tracking-tight transition-transform duration-150 group-hover:scale-105"
              style={{ color: textColor }}
            >
              {color.hex}
            </div>
            <div
              className="text-[11px] sm:text-xs md:text-sm font-['Space_Grotesk',sans-serif] font-bold mt-2 uppercase tracking-widest opacity-90 text-center px-1"
              style={{ color: textColor }}
            >
              {color.name}
            </div>
          </div>

          {/* Minimalist Copied Toast / Overlay */}
          {copied && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black font-mono text-xs font-bold tracking-wider uppercase shadow-md">
                <Check className="w-3.5 h-3.5 text-black" />
                <span>COPIED</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
