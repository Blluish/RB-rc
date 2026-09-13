import { Palette, ColorItem } from '../types.ts';

/**
 * Converts HSL color values to a clean HEX string (#RRGGBB).
 * h in [0, 360), s in [0, 100], l in [0, 100]
 */
export function hslToHex(h: number, s: number, l: number): string {
  const normH = ((h % 360) + 360) % 360;
  const normS = Math.min(100, Math.max(0, s)) / 100;
  const normL = Math.min(100, Math.max(0, l)) / 100;

  const c = (1 - Math.abs(2 * normL - 1)) * normS;
  const x = c * (1 - Math.abs(((normH / 60) % 2) - 1));
  const m = normL - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (normH >= 0 && normH < 60) {
    r = c; g = x; b = 0;
  } else if (normH >= 60 && normH < 120) {
    r = x; g = c; b = 0;
  } else if (normH >= 120 && normH < 180) {
    r = 0; g = c; b = x;
  } else if (normH >= 180 && normH < 240) {
    r = 0; g = x; b = c;
  } else if (normH >= 240 && normH < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  const red = Math.round((r + m) * 255);
  const green = Math.round((g + m) * 255);
  const blue = Math.round((b + m) * 255);

  const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

export function hexToRgbString(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  return `RGB(${r}, ${g}, ${b})`;
}

/**
 * Intelligent Chromatic Namer based on HSL color coordinates.
 * Generates natural, editorial design names for any computed color.
 */
export function getIntelligentColorName(h: number, s: number, l: number): string {
  const normH = ((h % 360) + 360) % 360;

  // Ultra-low saturation = Neutrals / Monochrome
  if (s < 12) {
    if (l < 15) return 'Obsidian Black';
    if (l < 25) return 'Charcoal';
    if (l < 40) return 'Graphite';
    if (l < 60) return 'Concrete Grey';
    if (l < 75) return 'Silver Sand';
    if (l < 88) return 'Alabaster';
    return 'Chalk White';
  }

  // Low saturation = Muted / Earth / Dusty tones
  if (s < 30) {
    if (l < 25) return 'Smoked Iron';
    if (normH < 40) return l > 65 ? 'Warm Linen' : 'Raw Taupe';
    if (normH < 80) return l > 65 ? 'Oatmeal' : 'Khaki Stone';
    if (normH < 165) return l > 65 ? 'Sage Frost' : 'Olive Bark';
    if (normH < 220) return l > 65 ? 'Misted Slate' : 'Nordic Slate';
    if (normH < 280) return l > 65 ? 'Lavender Haze' : 'Storm Shadow';
    return l > 65 ? 'Dusty Blush' : 'Smoked Plum';
  }

  // Determine base hue category
  let baseName = 'Chroma';
  if (normH >= 355 || normH < 12) {
    baseName = l < 35 ? 'Crimson' : l > 70 ? 'Blush' : 'Scarlet';
  } else if (normH < 28) {
    baseName = l < 35 ? 'Rust' : l > 70 ? 'Peach' : 'Vermilion';
  } else if (normH < 45) {
    baseName = l < 35 ? 'Sienna' : l > 70 ? 'Apricot' : 'Amber';
  } else if (normH < 65) {
    baseName = l < 35 ? 'Ochre' : l > 70 ? 'Buttercream' : 'Saffron';
  } else if (normH < 90) {
    baseName = l < 35 ? 'Chartreuse' : l > 70 ? 'Lime Sherbet' : 'Citron';
  } else if (normH < 150) {
    baseName = l < 35 ? 'Forest Pine' : l > 70 ? 'Celadon' : 'Emerald';
  } else if (normH < 185) {
    baseName = l < 35 ? 'Deep Teal' : l > 70 ? 'Seafoam' : 'Turquoise';
  } else if (normH < 215) {
    baseName = l < 35 ? 'Midnight Wave' : l > 70 ? 'Glacier' : 'Cerulean';
  } else if (normH < 245) {
    baseName = l < 35 ? 'Navy' : l > 70 ? 'Sky Mist' : 'Cobalt';
  } else if (normH < 275) {
    baseName = l < 35 ? 'Ultramarine' : l > 70 ? 'Periwinkle' : 'Indigo';
  } else if (normH < 310) {
    baseName = l < 35 ? 'Deep Violet' : l > 70 ? 'Wisteria' : 'Amethyst';
  } else if (normH < 335) {
    baseName = l < 35 ? 'Blackberry' : l > 70 ? 'Orchid' : 'Magenta';
  } else {
    baseName = l < 35 ? 'Cabernet' : l > 70 ? 'Rosewater' : 'Ruby';
  }

  // Prefix descriptor based on vibrancy and brightness
  if (l > 80) return `Pale ${baseName}`;
  if (l < 22) return `Abyssal ${baseName}`;
  if (s > 80 && l >= 45 && l <= 65) return `Vibrant ${baseName}`;
  if (s > 75 && l > 65) return `Electric ${baseName}`;
  if (s < 45) return `Muted ${baseName}`;

  return baseName;
}

const THEME_PREFIXES = [
  'Bauhaus', 'Nordic', 'Brutalist', 'Kyoto', 'Solstice', 'Chromatic',
  'Aegean', 'Analog', 'Hyper', 'Velvet', 'Monolith', 'Kinetic',
  'Tokyo', 'Editorial', 'Sovereign', 'Metropolis', 'Subtle', 'Prism'
];

const THEME_SUFFIXES = [
  'Harmony', 'Spectrum', 'Synthesis', 'Study', 'Nocturne', 'Horizon',
  'Minimalism', 'Drift', 'Tension', 'Cadence', 'Form', 'Matrix',
  'Aesthetic', 'Dialogue', 'Equation', 'Echo', 'Frequency'
];

const DIRECTIONS = [
  'High-Contrast Geometric Identity',
  'Editorial Typographic Print',
  'Modern Scandinavian Exhibition',
  'Analog Cybernetic Hardware',
  'Brutalist Architecture & Form',
  'Contemporary Gallery Monograph',
  'Organic Minimalist Packaging',
  'Chromatic Screen Printing'
];

const APPLICATIONS = [
  'Editorial Spread / Book Cover',
  'Luxury Spatial Identity',
  'Digital Product Interface',
  'Exhibition Monograph',
  'Kinetic Identity & Posters',
  'Brand Heritage Guidelines',
  'Packaging & Print Finish'
];

/**
 * Generates an infinite variety of mathematically harmonic 3-color palettes
 * based on proven color theories:
 * 1. Split-Complementary
 * 2. Triadic Harmony (120° offsets)
 * 3. Analogous with Vibrancy Pop (30° adjacent + complementary accent)
 * 4. Complementary with Tonal Contrast
 * 5. Warm / Cool Dynamic Balance
 */
export function generateHarmonicPalette(): Palette {
  const baseHue = Math.floor(Math.random() * 360);
  const harmonyType = Math.floor(Math.random() * 5);

  let h1 = baseHue;
  let s1 = 60 + Math.random() * 35;
  let l1 = 20 + Math.random() * 60;

  let h2 = (baseHue + 120) % 360;
  let s2 = 45 + Math.random() * 45;
  let l2 = 30 + Math.random() * 50;

  let h3 = (baseHue + 240) % 360;
  let s3 = 70 + Math.random() * 30;
  let l3 = 45 + Math.random() * 40;

  switch (harmonyType) {
    case 0: {
      // Split-Complementary: Primary, then +150° and +210°
      h2 = (baseHue + 150 + (Math.random() * 20 - 10)) % 360;
      h3 = (baseHue + 210 + (Math.random() * 20 - 10)) % 360;
      // Contrast: 1 deep/medium, 1 soft/neutral, 1 radiant accent
      l1 = 22 + Math.random() * 25; // Rich dominant
      l2 = 65 + Math.random() * 25; // High lightness supporting
      s2 = 25 + Math.random() * 40;
      l3 = 50 + Math.random() * 25; // Punchy accent
      s3 = 80 + Math.random() * 20;
      break;
    }
    case 1: {
      // Triadic Harmony (Balanced 120° angles)
      h2 = (baseHue + 120) % 360;
      h3 = (baseHue + 240) % 360;
      // Ensure one color is ground, one medium, one bright pop
      l1 = 18 + Math.random() * 30;
      l2 = 45 + Math.random() * 35;
      l3 = 75 + Math.random() * 20;
      break;
    }
    case 2: {
      // Analogous + Contrast Accent (Adjacent + Opposite Pop)
      h2 = (baseHue + 35 + Math.random() * 20) % 360;
      h3 = (baseHue + 180 + (Math.random() * 30 - 15)) % 360; // Complementary pop
      s1 = 40 + Math.random() * 45;
      l1 = 25 + Math.random() * 40;
      s2 = 35 + Math.random() * 40;
      l2 = 60 + Math.random() * 25;
      s3 = 85 + Math.random() * 15; // High saturation accent
      l3 = 48 + Math.random() * 25;
      break;
    }
    case 3: {
      // Warm & Cool Dynamic
      const isBaseWarm = baseHue < 70 || baseHue > 320;
      const coolHue = 180 + Math.random() * 70; // Blues/Cyans/Teals
      const warmHue = (Math.random() * 60) % 360; // Warm Ambers/Reds/Oranges

      h1 = isBaseWarm ? warmHue : coolHue;
      h2 = isBaseWarm ? coolHue : warmHue;
      h3 = (h2 + 150) % 360;

      l1 = 20 + Math.random() * 25;
      l2 = 68 + Math.random() * 20;
      l3 = 52 + Math.random() * 25;
      break;
    }
    case 4:
    default: {
      // Complementary Contrast with Tint/Shade
      h1 = baseHue;
      h2 = (baseHue + (Math.random() > 0.5 ? 30 : -30)) % 360;
      h3 = (baseHue + 180) % 360; // Strong complement
      s1 = 55 + Math.random() * 40;
      l1 = 18 + Math.random() * 25; // Dark anchor
      s2 = 30 + Math.random() * 45;
      l2 = 72 + Math.random() * 18; // Light atmospheric
      s3 = 85 + Math.random() * 15;
      l3 = 50 + Math.random() * 20; // Saturated pop
      break;
    }
  }

  // Build color objects
  const hex1 = hslToHex(h1, s1, l1);
  const hex2 = hslToHex(h2, s2, l2);
  const hex3 = hslToHex(h3, s3, l3);

  const c1: ColorItem = {
    name: getIntelligentColorName(h1, s1, l1),
    hex: hex1,
    rgb: hexToRgbString(hex1),
  };

  const c2: ColorItem = {
    name: getIntelligentColorName(h2, s2, l2),
    hex: hex2,
    rgb: hexToRgbString(hex2),
  };

  const c3: ColorItem = {
    name: getIntelligentColorName(h3, s3, l3),
    hex: hex3,
    rgb: hexToRgbString(hex3),
  };

  const prefix = THEME_PREFIXES[Math.floor(Math.random() * THEME_PREFIXES.length)];
  const suffix = THEME_SUFFIXES[Math.floor(Math.random() * THEME_SUFFIXES.length)];
  const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  const application = APPLICATIONS[Math.floor(Math.random() * APPLICATIONS.length)];

  return {
    theme: `${prefix} ${suffix}`,
    direction,
    application,
    colors: [c1, c2, c3],
  };
}
