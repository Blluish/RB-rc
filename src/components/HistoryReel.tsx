import React from 'react';
import { HistoryEntry, Palette } from '../types.ts';
import { soundEngine } from '../utils/audio.ts';

interface HistoryReelProps {
  history: HistoryEntry[];
  onSelectPalette: (palette: Palette) => void;
}

export const HistoryReel: React.FC<HistoryReelProps> = ({
  history,
  onSelectPalette,
}) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mt-6">
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-2 px-1">
        <span className="tracking-wider uppercase">SESSION REEL HISTORY</span>
        <span className="text-zinc-600 text-[10px]">
          {history.length} GENERATED RECENTLY · CLICK TO RESTORE
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {history.slice(0, 4).map((item, idx) => {
          const firstColorName = item.palette.colors[0].name.split(' ')[0];
          return (
            <button
              key={`${item.studyNumber}-${idx}`}
              onClick={() => {
                soundEngine.playLockThud(150);
                onSelectPalette(item.palette);
              }}
              className="border border-zinc-800/80 hover:border-zinc-500 p-2.5 bg-zinc-950/80 hover:bg-zinc-900/90 flex items-center justify-between text-[10px] font-mono text-zinc-300 transition-all cursor-pointer text-left group shadow-sm"
              title={`Restore Study #${item.studyNumber}: ${item.palette.theme}`}
            >
              <div className="flex items-center gap-1.5">
                {item.palette.colors.map((c, cIdx) => (
                  <span
                    key={cIdx}
                    className="w-3 h-3 border border-black/30 shadow-xs inline-block"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
              <span className="text-zinc-400 group-hover:text-white transition-colors truncate max-w-[90px]">
                #{item.studyNumber} {firstColorName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
