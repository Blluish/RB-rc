import { Palette } from '../types.ts';

export const INITIAL_PALETTE: Palette = {
  theme: 'HAUTE COUTURE ATELIER',
  direction: 'Timeless Parisian luxury with sensual crimson velvet, noir lacquer, and warm vintage champagne.',
  application: 'High jewelry lookbook, luxury timepiece campaign, and curated gallery vernissage.',
  colors: [
    { name: 'CARMINE LACQUER', hex: '#9E1929', rgb: 'RGB(158, 25, 41)' },
    { name: 'VINTAGE CHAMPAGNE', hex: '#EADCC9', rgb: 'RGB(234, 220, 201)' },
    { name: 'TUXEDO NOIR', hex: '#08080A', rgb: 'RGB(8, 8, 10)' },
  ],
};

export const EDITORIAL_PALETTES: Palette[] = [
  INITIAL_PALETTE,
  {
    theme: 'WARM EDITORIAL ARCHETYPE',
    direction: 'A premium lifestyle publication with warm cinematic grain and tactile typography.',
    application: 'Recommended for luxury hospitality, editorial periodicals, and quiet luxury e-commerce.',
    colors: [
      { name: 'BURNT TERRACOTTA', hex: '#D96C4F', rgb: 'RGB(217, 108, 79)' },
      { name: 'ABYSSAL NAVY', hex: '#1A2B49', rgb: 'RGB(26, 43, 73)' },
      { name: 'CALCIFIED IVORY', hex: '#F3EFE6', rgb: 'RGB(243, 239, 230)' },
    ],
  },
  {
    theme: 'NORDIC ARCHITECTURAL STUDY',
    direction: 'Severe geometric minimalism balanced by raw earthen pigment and brutalist precision.',
    application: 'High-end architecture monographs, spatial audio hardware, and industrial design portfolios.',
    colors: [
      { name: 'DEEP CYPRESS', hex: '#1B3B2B', rgb: 'RGB(27, 59, 43)' },
      { name: 'RAW OCHRE', hex: '#D4A345', rgb: 'RGB(212, 163, 69)' },
      { name: 'GRAPHITE BASALT', hex: '#121316', rgb: 'RGB(18, 19, 22)' },
    ],
  },
  {
    theme: 'NEO-MODERNIST TYPOGRAPHY',
    direction: 'Ultra-crisp international style with striking cobalt tension on unbleached newsprint.',
    application: 'Contemporary design biennial identity, kinetic typography campaigns, and art museum apps.',
    colors: [
      { name: 'KLEIN COBALT', hex: '#0E38B1', rgb: 'RGB(14, 56, 177)' },
      { name: 'VERMILION POP', hex: '#E84A27', rgb: 'RGB(232, 74, 39)' },
      { name: 'BONE PARCHMENT', hex: '#ECEBE4', rgb: 'RGB(236, 235, 228)' },
    ],
  },
  {
    theme: 'JAPANESE TEA CEREMONY',
    direction: 'Quiet meditative balance of oxidized metals, dried matcha leaf, and smoked plum silk.',
    application: 'Artisanal fragrances, fine dining identity, ceramicist monograph, and luxury skincare.',
    colors: [
      { name: 'SMOKED PLUM', hex: '#422835', rgb: 'RGB(66, 40, 53)' },
      { name: 'MATCHA VEIL', hex: '#7E8569', rgb: 'RGB(126, 133, 105)' },
      { name: 'MISTED LINEN', hex: '#E8E6DF', rgb: 'RGB(232, 230, 223)' },
    ],
  },
  {
    theme: 'BERLIN UNDERGROUND CINEMA',
    direction: 'High contrast nocturnal drama with toxic lime puncturing deep velvet shadow.',
    application: 'Experimental music festival, cutting-edge creative agency, and avant-garde fashion lookbook.',
    colors: [
      { name: 'ACID CHARTREUSE', hex: '#C6F208', rgb: 'RGB(198, 242, 8)' },
      { name: 'OBSIDIAN CHARCOAL', hex: '#101014', rgb: 'RGB(16, 16, 20)' },
      { name: 'STEEL ASH', hex: '#878892', rgb: 'RGB(135, 136, 146)' },
    ],
  },
  {
    theme: 'MEDITERRANEAN SUMMER BRUT',
    direction: 'Sun-drenched terracotta tiles against azure sea foam and weathered limestone.',
    application: 'Boutique olive oil brand, summer resort branding, and artisanal culinary packaging.',
    colors: [
      { name: 'AZURE CERULEAN', hex: '#1D6FA5', rgb: 'RGB(29, 111, 165)' },
      { name: 'BAKED SIENNA', hex: '#C75D38', rgb: 'RGB(199, 93, 56)' },
      { name: 'AEGEAN CHALK', hex: '#F7F5F0', rgb: 'RGB(247, 245, 240)' },
    ],
  },
  {
    theme: 'SOLARIS FUTURISM',
    direction: 'Deep celestial indigo grounded by solar amber and clean technical titanium.',
    application: 'Aerospace studio launch, audio synthesizer interface, and sci-fi film title sequence.',
    colors: [
      { name: 'SOLAR FLARE', hex: '#F59E0B', rgb: 'RGB(245, 158, 11)' },
      { name: 'MIDNIGHT ORBIT', hex: '#0F172A', rgb: 'RGB(15, 23, 42)' },
      { name: 'TITANIUM HAZE', hex: '#CBD5E1', rgb: 'RGB(203, 213, 225)' },
    ],
  },
  {
    theme: 'VINTAGE BRUTALIST ARCHIVE',
    direction: 'Raw warm concrete punctuated by safety emergency orange and dense carbon graphite.',
    application: 'Independent record label, design system documentation, and industrial hardware packaging.',
    colors: [
      { name: 'SAFETY TANGERINE', hex: '#FF5722', rgb: 'RGB(255, 87, 34)' },
      { name: 'CONCRETE MONOLITH', hex: '#94A3B8', rgb: 'RGB(148, 163, 184)' },
      { name: 'CARBON SHADOW', hex: '#0F172A', rgb: 'RGB(15, 23, 42)' },
    ],
  },
  {
    theme: 'KYOTO MOSS SANCTUARY',
    direction: 'Ancient cedar bark and damp river stone enveloped by soft illuminated morning mist.',
    application: 'Holistic wellness spa, tea house visual identity, and meditative mobile application.',
    colors: [
      { name: 'FOREST MOSS', hex: '#2D4739', rgb: 'RGB(45, 71, 57)' },
      { name: 'WEATHERED CEDAR', hex: '#8C684E', rgb: 'RGB(140, 104, 78)' },
      { name: 'RIVER SILK', hex: '#EAE5D9', rgb: 'RGB(234, 229, 217)' },
    ],
  },
];

export const FAST_RANDOM_COLORS: { name: string; hex: string; rgb: string }[] = [
  { name: 'CARMINE', hex: '#9E1929', rgb: 'RGB(158, 25, 41)' },
  { name: 'CHAMPAGNE', hex: '#EADCC9', rgb: 'RGB(234, 220, 201)' },
  { name: 'NOIR', hex: '#08080A', rgb: 'RGB(8, 8, 10)' },
  { name: 'TERRACOTTA', hex: '#D96C4F', rgb: 'RGB(217, 108, 79)' },
  { name: 'ABYSSAL NAVY', hex: '#1A2B49', rgb: 'RGB(26, 43, 73)' },
  { name: 'CALCIFIED IVORY', hex: '#F3EFE6', rgb: 'RGB(243, 239, 230)' },
  { name: 'DEEP CYPRESS', hex: '#1B3B2B', rgb: 'RGB(27, 59, 43)' },
  { name: 'RAW OCHRE', hex: '#D4A345', rgb: 'RGB(212, 163, 69)' },
  { name: 'GRAPHITE', hex: '#121316', rgb: 'RGB(18, 19, 22)' },
  { name: 'KLEIN COBALT', hex: '#0E38B1', rgb: 'RGB(14, 56, 177)' },
  { name: 'VERMILION', hex: '#E84A27', rgb: 'RGB(232, 74, 39)' },
  { name: 'ACID CHARTREUSE', hex: '#C6F208', rgb: 'RGB(198, 242, 8)' },
  { name: 'SMOKED PLUM', hex: '#422835', rgb: 'RGB(66, 40, 53)' },
  { name: 'MATCHA VEIL', hex: '#7E8569', rgb: 'RGB(126, 133, 105)' },
  { name: 'AZURE CERULEAN', hex: '#1D6FA5', rgb: 'RGB(29, 111, 165)' },
  { name: 'SOLAR FLARE', hex: '#F59E0B', rgb: 'RGB(245, 158, 11)' },
  { name: 'TITANIUM HAZE', hex: '#CBD5E1', rgb: 'RGB(203, 213, 225)' },
  { name: 'SAFETY TANGERINE', hex: '#FF5722', rgb: 'RGB(255, 87, 34)' },
];
