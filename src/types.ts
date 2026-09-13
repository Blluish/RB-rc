export interface ColorItem {
  name: string;
  hex: string;
  rgb: string;
}

export interface Palette {
  theme: string;
  direction: string;
  application: string;
  colors: [ColorItem, ColorItem, ColorItem];
}

export interface SlotState {
  locked: boolean;
  color: ColorItem;
  isSpinning: boolean;
  displayColor: ColorItem;
}

export interface HistoryEntry {
  studyNumber: number;
  palette: Palette;
  timestamp: string;
}
