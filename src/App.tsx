import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SlotCard } from './components/SlotCard.tsx';
import { INITIAL_PALETTE, EDITORIAL_PALETTES, FAST_RANDOM_COLORS } from './data/palettes.ts';
import { Palette, ColorItem } from './types.ts';
import { soundEngine } from './utils/audio.ts';
import { RefreshCw } from 'lucide-react';

export default function App() {
  const [currentPalette, setCurrentPalette] = useState<Palette>(INITIAL_PALETTE);
  const [studyNumber, setStudyNumber] = useState<number>(55);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  // Display colors for the 3 slots (can be cycling random colors during spin)
  const [displayedColors, setDisplayedColors] = useState<[ColorItem, ColorItem, ColorItem]>([
    INITIAL_PALETTE.colors[0],
    INITIAL_PALETTE.colors[1],
    INITIAL_PALETTE.colors[2],
  ]);

  const spinIntervals = useRef<(number | NodeJS.Timeout)[]>([]);
  const soundInterval = useRef<number | NodeJS.Timeout | null>(null);

  const triggerSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    const newStudyNumber = studyNumber + 1;
    setStudyNumber(newStudyNumber);

    // Pick target palette from curated list (distinct from current if possible)
    const availablePalettes = EDITORIAL_PALETTES.filter((p) => p.theme !== currentPalette.theme);
    const targetPalette = availablePalettes[Math.floor(Math.random() * availablePalettes.length)] || EDITORIAL_PALETTES[0];

    // Sound effect clicking loop
    soundInterval.current = setInterval(() => {
      soundEngine.playClick(280 + Math.random() * 260, 'triangle', 0.025);
    }, 55);

    // Staggered stop delays: Slot 0 at 1.25s, Slot 1 at 2.5s, Slot 2 at 3.75s (1.25s intervals)
    const stopTimes = [1250, 2500, 3750];

    [0, 1, 2].forEach((slotIndex) => {
      // Fast cycling random colors
      spinIntervals.current[slotIndex] = setInterval(() => {
        const rand = FAST_RANDOM_COLORS[Math.floor(Math.random() * FAST_RANDOM_COLORS.length)];
        setDisplayedColors((prev) => {
          const updated = [...prev] as [ColorItem, ColorItem, ColorItem];
          updated[slotIndex] = {
            name: 'CYCLING...',
            hex: rand.hex,
            rgb: rand.rgb,
          };
          return updated;
        });
      }, 55 + slotIndex * 15);

      // Timeout to lock in the target color
      setTimeout(() => {
        if (spinIntervals.current[slotIndex]) {
          clearInterval(spinIntervals.current[slotIndex] as number);
        }

        const resolvedColor = targetPalette.colors[slotIndex];
        setDisplayedColors((prev) => {
          const updated = [...prev] as [ColorItem, ColorItem, ColorItem];
          updated[slotIndex] = resolvedColor;
          return updated;
        });

        // Tactile bass thump when each reel hits its mark
        soundEngine.playLockThud(130 - slotIndex * 20);

        if (slotIndex === 2) {
          if (soundInterval.current) {
            clearInterval(soundInterval.current as number);
          }

          setCurrentPalette(targetPalette);
          setIsSpinning(false);
        }
      }, stopTimes[slotIndex]);
    });
  }, [isSpinning, studyNumber, currentPalette]);

  // Keyboard shortcut: Spacebar to trigger spin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          triggerSpin();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerSpin]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      spinIntervals.current.forEach((interval) => {
        if (interval) clearInterval(interval as number);
      });
      if (soundInterval.current) {
        clearInterval(soundInterval.current as number);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-200 font-['Space_Grotesk',sans-serif] flex flex-col items-center justify-center selection:bg-white selection:text-black noise-bg relative overflow-x-hidden p-4 sm:p-8">
      {/* Main Viewport: The Slot Machine Interface */}
      <main className="max-w-4xl w-full flex flex-col justify-center items-center my-auto">
        {/* The 3-Column Slot Machine Frame */}
        <div className="w-full bg-zinc-950 border-2 border-zinc-800 p-3 sm:p-5 shadow-2xl relative">
          {/* Studio Frame Marks (Top & Bottom Corner Crosshairs) */}
          <div className="absolute -top-2.5 -left-2.5 font-mono text-[11px] text-zinc-500 select-none pointer-events-none font-bold">
            +
          </div>
          <div className="absolute -top-2.5 -right-2.5 font-mono text-[11px] text-zinc-500 select-none pointer-events-none font-bold">
            +
          </div>
          <div className="absolute -bottom-2.5 -left-2.5 font-mono text-[11px] text-zinc-500 select-none pointer-events-none font-bold">
            +
          </div>
          <div className="absolute -bottom-2.5 -right-2.5 font-mono text-[11px] text-zinc-500 select-none pointer-events-none font-bold">
            +
          </div>

          {/* Mechanical Center Guide Markers (Left & Right Tick Notches) */}
          <div className="hidden sm:block absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none z-30">
            <div className="w-1.5 h-7 bg-white shadow-sm border border-black" />
          </div>
          <div className="hidden sm:block absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none z-30">
            <div className="w-1.5 h-7 bg-white shadow-sm border border-black" />
          </div>

          {/* 3 Reel Columns on desktop, Horizontal Stack on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 relative">
            <SlotCard
              index={0}
              roleLabel="DOMINANT"
              color={displayedColors[0]}
              isSpinning={isSpinning}
            />
            <SlotCard
              index={1}
              roleLabel="SECONDARY"
              color={displayedColors[1]}
              isSpinning={isSpinning}
            />
            <SlotCard
              index={2}
              roleLabel="ACCENT / TENSION"
              color={displayedColors[2]}
              isSpinning={isSpinning}
            />
          </div>

          {/* Bottom Controls & Trigger Bar */}
          <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-center">
            {/* Center Tactile Spin Button */}
            <button
              id="spin-button"
              onClick={triggerSpin}
              disabled={isSpinning}
              className={`spin-btn w-full sm:w-auto px-12 sm:px-16 py-3.5 sm:py-4 bg-white hover:bg-zinc-100 text-black font-['Syne',sans-serif] font-black text-sm sm:text-base tracking-widest uppercase transition-all duration-150 flex items-center justify-center gap-3 select-none cursor-pointer shadow-[4px_4px_0px_#27272a] hover:shadow-[2px_2px_0px_#27272a] ${
                isSpinning ? 'opacity-80 cursor-wait' : ''
              }`}
            >
              {isSpinning && <RefreshCw className="w-4 h-4 animate-spin text-black" />}
              <span id="spin-btn-label">
                {isSpinning ? 'SPINNING...' : 'SPIN'}
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
