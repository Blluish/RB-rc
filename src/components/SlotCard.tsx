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
  isReset?: boolean;
}

export const SlotCard: React.FC<SlotCardProps> = ({
  index,
  roleLabel,
  color,
  isSpinning,
  isReset = false,
}) => {
  const [copied, setCopied] = useState(false);
  const textColor = getContrastColor(color.hex);

  const handleCardClick = () => {
    if (isSpinning || isReset) return;
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    soundEngine.playClick(600, 'sine', 0.04);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Slot Header Label */}
      <div className="flex items-center justify-between sm:justify-end text-[10px] sm:text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-1 mb-1.5 sm:mb-2 px-0.5">
        <span className="text-zinc-500 tracking-wider uppercase text-[9px] sm:text-[10px]">
          {roleLabel}
        </span>
        <span className="text-[9px] font-mono text-zinc-600 sm:hidden">
          REEL 0{index + 1}
        </span>
      </div>

      {/* Main Slot Reel Window - Click to copy */}
      <div
        id={`slot-card-${index}`}
        onClick={handleCardClick}
        className="relative h-24 sm:h-80 md:h-96 w-full overflow-hidden transition-all duration-300 select-none group border border-zinc-800 hover:border-zinc-500"
        title={isReset ? 'Ready to spin' : 'Click to copy HEX code'}
      >
        {/* Dynamic Color Fill Canvas (White when isReset) */}
        <div
          className="absolute inset-0 flex flex-row sm:flex-col items-center justify-center px-5 sm:p-5 transition-colors duration-200"
          style={{ backgroundColor: isReset ? '#FFFFFF' : color.hex }}
        >
          {/* When reset: show white box with centered question mark '?' */}
          {isReset ? (
            <div className="w-full flex items-center justify-center animate-in fade-in duration-200">
              <span className="font-mono font-black text-3xl sm:text-5xl md:text-6xl text-zinc-400 select-none">
                ?
              </span>
            </div>
          ) : (
            /* Chromatic Identity: HEX & Color Name (Only shown when slot has locked in) */
            !isSpinning && (
              <div className="w-full flex flex-row sm:flex-col items-center justify-between sm:justify-center animate-in fade-in zoom-in-95 duration-200">
                <div
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono font-black tracking-tight transition-transform duration-150 group-hover:scale-105"
                  style={{ color: textColor }}
                >
                  {color.hex}
                </div>
                <div
                  className="text-xs sm:text-xs md:text-sm font-['Space_Grotesk',sans-serif] font-bold sm:mt-2 uppercase tracking-wider sm:tracking-widest opacity-90 text-right sm:text-center px-1 max-w-[50%] sm:max-w-none truncate sm:whitespace-normal"
                  style={{ color: textColor }}
                >
                  {color.name}
                </div>
              </div>
            )
          )}

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
