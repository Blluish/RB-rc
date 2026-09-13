import React, { useState } from 'react';
import { X, Copy, Check, Sparkles } from 'lucide-react';
import { Palette } from '../types.ts';
import { getContrastColor } from '../utils/colors.ts';
import { soundEngine } from '../utils/audio.ts';

interface ReelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  palette: Palette;
  studyNumber: number;
}

export const ReelsModal: React.FC<ReelsModalProps> = ({
  isOpen,
  onClose,
  palette,
  studyNumber,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = palette.colors
      .map((c, i) => `0${i + 1}. ${c.name} — ${c.hex} (${c.rgb})`)
      .join('\n');
    navigator.clipboard.writeText(`RUBBRIEF / COLOR SLOT™ #${studyNumber}\nTHEME: ${palette.theme}\n\n${text}\n\n"${palette.direction}"`);
    setCopied(true);
    soundEngine.playClick(600, 'sine', 0.05);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-sm w-full aspect-[9/16] max-h-[92vh] bg-[#0E0E10] border-2 border-zinc-700 p-4 sm:p-5 flex flex-col justify-between shadow-2xl relative">
        {/* Top Header */}
        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 border-b border-zinc-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-white text-black font-black text-[9px] font-['Syne',sans-serif]">
              RB
            </span>
            <span className="font-bold text-white tracking-widest uppercase">RUBBRIEF REEL</span>
          </div>
          <div className="flex items-center gap-2">
            <span>STUDY #{String(studyNumber).padStart(3, '0')}</span>
            <button
              onClick={onClose}
              className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Colors Stacked for Instagram Vertical Reel/Story */}
        <div className="flex-1 flex flex-col gap-2 my-3">
          {palette.colors.map((c, idx) => {
            const contrast = getContrastColor(c.hex);
            return (
              <div
                key={idx}
                className="flex-1 p-3 flex flex-col justify-between border border-black/20 shadow-inner relative overflow-hidden transition-transform"
                style={{ backgroundColor: c.hex, color: contrast }}
              >
                <div className="flex justify-between items-center font-mono text-[9px] opacity-80">
                  <span className="font-semibold tracking-wider">COLOR 0{idx + 1}</span>
                  <span>{c.rgb}</span>
                </div>
                <div>
                  <div className="font-['Syne',sans-serif] font-black text-lg sm:text-xl tracking-tight leading-none">
                    {c.name}
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold mt-1 tracking-wider">
                    {c.hex}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Editorial Narrative */}
        <div className="border-t border-zinc-800 pt-2.5 space-y-1">
          <div className="text-white uppercase font-mono text-[10px] font-bold tracking-wider">
            {palette.theme}
          </div>
          <p className="italic font-['Instrument_Serif',serif] text-xs text-zinc-300 leading-tight line-clamp-2">
            &ldquo;{palette.direction}&rdquo;
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-zinc-800/80">
          <button
            onClick={handleCopy}
            className="py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>COPY SPEC</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-3 bg-white hover:bg-zinc-200 text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            CLOSE VIEWER
          </button>
        </div>
      </div>
    </div>
  );
};
