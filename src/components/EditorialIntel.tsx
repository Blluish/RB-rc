import React, { useState } from 'react';
import { Copy, Check, Share2, Sparkles, Compass } from 'lucide-react';
import { Palette } from '../types.ts';
import { soundEngine } from '../utils/audio.ts';

interface EditorialIntelProps {
  palette: Palette;
  onOpenReelsCard: () => void;
}

export const EditorialIntel: React.FC<EditorialIntelProps> = ({
  palette,
  onOpenReelsCard,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAll = () => {
    const formatted = palette.colors
      .map((c) => `${c.name}: ${c.hex} (${c.rgb})`)
      .join('\n');
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    soundEngine.playClick(520, 'sine', 0.05);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mt-6 border border-zinc-800/90 bg-zinc-950/80 p-4 sm:p-6 backdrop-blur-sm shadow-xl">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider">
            CREATIVE DIRECTION RATIONALE
          </span>
        </div>
        <div className="px-2.5 py-0.5 bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-200 tracking-wider uppercase font-semibold">
          {palette.theme}
        </div>
      </div>

      {/* Editorial Narrative */}
      <div className="py-4 space-y-3">
        <blockquote className="text-sm sm:text-base md:text-lg font-['Instrument_Serif',serif] italic text-zinc-200 leading-relaxed">
          &ldquo;{palette.direction}&rdquo;
        </blockquote>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="text-zinc-500 uppercase text-[10px]">APPLICATION:</span>
          <span className="text-zinc-300">{palette.application}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            id="copy-palette-btn"
            onClick={handleCopyAll}
            className={`px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
              copied
                ? 'border-emerald-500 text-emerald-400'
                : 'border-zinc-700 text-zinc-200 hover:text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>COPIED TO CLIPBOARD!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>COPY PALETTE HEX</span>
              </>
            )}
          </button>

          <button
            id="export-card-btn"
            onClick={onOpenReelsCard}
            className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:border-zinc-500"
          >
            <Share2 className="w-3.5 h-3.5 text-zinc-400" />
            <span>REELS CARD MODE</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
          <span className="hidden sm:inline">TRIGGER:</span>
          <span className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px]">
            SPACEBAR
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400">STUDIO SPEC</span>
        </div>
      </div>
    </div>
  );
};
