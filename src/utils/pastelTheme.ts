export type PastelColor = 'merah' | 'kuning' | 'hijau' | 'biru' | 'coklat';

export interface PastelConfig {
  name: string;
  cardBg: string;
  cardBorder: string;
  badgeBg: string;
  badgeText: string;
  headerBg: string;
  headerText: string;
  accentText: string;
  buttonBg: string;
  buttonHover: string;
  buttonText: string;
  tagBg: string;
  tagText: string;
  illustrationBadge: string;
}

export const PASTEL_THEMES: Record<PastelColor, PastelConfig> = {
  merah: {
    name: 'Merah Pastel',
    cardBg: 'bg-[#FFF1F2]', // rose pastel
    cardBorder: 'border-[#FECDD3]',
    badgeBg: 'bg-[#FFE4E6]',
    badgeText: 'text-[#9F1239]',
    headerBg: 'from-[#FDA4AF] via-[#FB7185] to-[#F43F5E]',
    headerText: 'text-white',
    accentText: 'text-[#BE123C]',
    buttonBg: 'bg-[#F43F5E]',
    buttonHover: 'hover:bg-[#E11D48]',
    buttonText: 'text-white',
    tagBg: 'bg-[#FFF1F2]',
    tagText: 'text-[#9F1239]',
    illustrationBadge: 'bg-[#FECDD3] text-[#9F1239]',
  },
  kuning: {
    name: 'Kuning Pastel',
    cardBg: 'bg-[#FFFBEB]', // warm butter pastel
    cardBorder: 'border-[#FDE68A]',
    badgeBg: 'bg-[#FEF3C7]',
    badgeText: 'text-[#92400E]',
    headerBg: 'from-[#FDE68A] via-[#FBBF24] to-[#F59E0B]',
    headerText: 'text-slate-900',
    accentText: 'text-[#B45309]',
    buttonBg: 'bg-[#F59E0B]',
    buttonHover: 'hover:bg-[#D97706]',
    buttonText: 'text-white',
    tagBg: 'bg-[#FFFBEB]',
    tagText: 'text-[#92400E]',
    illustrationBadge: 'bg-[#FDE68A] text-[#92400E]',
  },
  hijau: {
    name: 'Hijau Pastel',
    cardBg: 'bg-[#F0FDF4]', // soft mint / sage pastel
    cardBorder: 'border-[#BBF7D0]',
    badgeBg: 'bg-[#DCFCE7]',
    badgeText: 'text-[#166534]',
    headerBg: 'from-[#86EFAC] via-[#4ADE80] to-[#22C55E]',
    headerText: 'text-slate-900',
    accentText: 'text-[#15803D]',
    buttonBg: 'bg-[#16A34A]',
    buttonHover: 'hover:bg-[#15803D]',
    buttonText: 'text-white',
    tagBg: 'bg-[#F0FDF4]',
    tagText: 'text-[#166534]',
    illustrationBadge: 'bg-[#BBF7D0] text-[#166534]',
  },
  biru: {
    name: 'Biru Pastel',
    cardBg: 'bg-[#F0F9FF]', // sky / baby blue pastel
    cardBorder: 'border-[#BAE6FD]',
    badgeBg: 'bg-[#E0F2FE]',
    badgeText: 'text-[#075985]',
    headerBg: 'from-[#7DD3FC] via-[#38BDF8] to-[#0284C7]',
    headerText: 'text-white',
    accentText: 'text-[#0369A1]',
    buttonBg: 'bg-[#0284C7]',
    buttonHover: 'hover:bg-[#0369A1]',
    buttonText: 'text-white',
    tagBg: 'bg-[#F0F9FF]',
    tagText: 'text-[#075985]',
    illustrationBadge: 'bg-[#BAE6FD] text-[#075985]',
  },
  coklat: {
    name: 'Coklat Pastel',
    cardBg: 'bg-[#FAF5EE]', // warm biscuit / mocha / latte pastel
    cardBorder: 'border-[#EADCC9]',
    badgeBg: 'bg-[#F0E5D4]',
    badgeText: 'text-[#6F4E37]',
    headerBg: 'from-[#E6CCB2] via-[#DDB892] to-[#B08968]',
    headerText: 'text-slate-900',
    accentText: 'text-[#7F5539]',
    buttonBg: 'bg-[#7F5539]',
    buttonHover: 'hover:bg-[#6A472E]',
    buttonText: 'text-white',
    tagBg: 'bg-[#FAF5EE]',
    tagText: 'text-[#6F4E37]',
    illustrationBadge: 'bg-[#EADCC9] text-[#6F4E37]',
  },
};
