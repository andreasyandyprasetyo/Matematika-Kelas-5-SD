import React from 'react';

// Export path to generated assets
export const PASTEL_BANNER_IMG = '/src/assets/images/math_banner_pastel_1793716551251.jpg';
export const PASTEL_MASCOT_IMG = '/src/assets/images/math_mascot_pastel_1793716550735.jpg';
export const PASTEL_TROPHY_IMG = '/src/assets/images/math_trophy_pastel_1793716569028.jpg';

interface ChapterIllustrationProps {
  chapterNumber: number;
  pastelColor: 'merah' | 'kuning' | 'hijau' | 'biru' | 'coklat';
}

export const ChapterIllustration: React.FC<ChapterIllustrationProps> = ({
  chapterNumber,
  pastelColor,
}) => {
  // Return tailored cute SVG vector illustrations for each chapter matching the pastel palette
  switch (chapterNumber) {
    case 1: // Bilangan Cacah 100.000 (Biru Pastel)
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-xs">
          <rect x="10" y="15" width="80" height="70" rx="16" fill="#BAE6FD" />
          <rect x="18" y="23" width="64" height="54" rx="12" fill="#F0F9FF" />
          <text x="50" y="46" textAnchor="middle" fill="#0284C7" fontSize="16" fontWeight="bold">100k</text>
          <text x="50" y="65" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="bold">1 2 3 4 5</text>
          <circle cx="26" cy="30" r="3" fill="#F43F5E" />
          <circle cx="74" cy="30" r="3" fill="#F59E0B" />
        </svg>
      );
    case 2: // KPK dan FPB (Hijau Pastel)
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-xs">
          <circle cx="50" cy="50" r="42" fill="#BBF7D0" />
          <circle cx="36" cy="48" r="22" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.5" />
          <circle cx="64" cy="48" r="22" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.5" />
          <text x="50" y="52" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="black">FPB</text>
          <text x="50" y="80" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="extrabold">KPK</text>
          <path d="M42 22 L50 14 L58 22" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 3: // Bilangan Pecahan (Kuning Pastel)
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-xs">
          <circle cx="50" cy="50" r="40" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="3" />
          {/* Pizza / Pie slice 1/4 */}
          <path d="M 50 50 L 50 10 A 40 40 0 0 1 90 50 Z" fill="#F59E0B" />
          {/* Eyes and mouth */}
          <circle cx="38" cy="46" r="3" fill="#92400E" />
          <circle cx="48" cy="62" r="3" fill="#92400E" />
          <path d="M40 70 Q 48 76 56 70" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
          <text x="72" y="36" textAnchor="middle" fill="#FFFBEB" fontSize="12" fontWeight="bold">1/4</text>
        </svg>
      );
    case 4: // Keliling Bangun Datar (Hijau Pastel)
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-xs">
          <rect x="15" y="20" width="70" height="60" rx="14" fill="#F0FDF4" stroke="#4ADE80" strokeWidth="3.5" strokeDasharray="6 3" />
          <circle cx="15" cy="20" r="4" fill="#16A34A" />
          <circle cx="85" cy="20" r="4" fill="#16A34A" />
          <circle cx="85" cy="80" r="4" fill="#16A34A" />
          <circle cx="15" cy="80" r="4" fill="#16A34A" />
          <text x="50" y="46" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">Keliling</text>
          <text x="50" y="62" textAnchor="middle" fill="#15803D" fontSize="13" fontWeight="black">K = 4 × s</text>
        </svg>
      );
    case 5: // Luas Daerah Bangun Datar (Merah Pastel)
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-xs">
          {/* Triangle with grid pattern */}
          <polygon points="50,15 88,82 12,82" fill="#FECDD3" stroke="#F43F5E" strokeWidth="3" />
          <line x1="50" y1="15" x2="50" y2="82" stroke="#BE123C" strokeWidth="2" strokeDasharray="3 2" />
          <text x="50" y="60" textAnchor="middle" fill="#9F1239" fontSize="11" fontWeight="extrabold">Luas</text>
          <text x="50" y="74" textAnchor="middle" fill="#BE123C" fontSize="9" fontWeight="bold">1/2×a×t</text>
          <circle cx="50" cy="15" r="4" fill="#F43F5E" />
        </svg>
      );
    case 6: // Sudut (Biru Pastel)
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-xs">
          <path d="M 15 75 A 45 45 0 0 1 75 75" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="3" />
          <line x1="20" y1="75" x2="85" y2="75" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="50" y1="75" x2="80" y2="30" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="50" cy="75" r="5" fill="#0369A1" />
          <path d="M 68 75 A 18 18 0 0 0 62 58" fill="none" stroke="#F43F5E" strokeWidth="2.5" />
          <text x="50" y="32" textAnchor="middle" fill="#075985" fontSize="12" fontWeight="black">60°</text>
        </svg>
      );
    case 7: // Membandingkan Ciri Bangun Datar (Merah Pastel)
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-xs">
          <rect x="14" y="25" width="34" height="34" rx="8" fill="#FFE4E6" stroke="#FB7185" strokeWidth="2.5" />
          <polygon points="72,25 90,59 54,59" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.5" />
          <line x1="14" y1="75" x2="86" y2="75" stroke="#FDA4AF" strokeWidth="3" strokeDasharray="4 2" />
          <text x="50" y="88" textAnchor="middle" fill="#9F1239" fontSize="10" fontWeight="extrabold">Simetri & Ciri</text>
        </svg>
      );
    case 8: // Data (Kuning Pastel)
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-xs">
          <rect x="12" y="16" width="76" height="68" rx="12" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />
          {/* Bar charts with cute colors */}
          <rect x="22" y="52" width="12" height="24" rx="4" fill="#38BDF8" />
          <rect x="38" y="38" width="12" height="38" rx="4" fill="#F43F5E" />
          <rect x="54" y="30" width="12" height="46" rx="4" fill="#4ADE80" />
          <rect x="70" y="44" width="12" height="32" rx="4" fill="#FBBF24" />
          {/* Trend line */}
          <path d="M28 50 L 44 36 L 60 28 L 76 42" fill="none" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 9: // Bilangan Cacah 1 Juta & Uang (Coklat Pastel)
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-xs">
          <rect x="12" y="20" width="76" height="52" rx="10" fill="#FAF5EE" stroke="#DDB892" strokeWidth="3" />
          <circle cx="50" cy="46" r="15" fill="#E6CCB2" stroke="#7F5539" strokeWidth="2" />
          <text x="50" y="51" textAnchor="middle" fill="#6F4E37" fontSize="10" fontWeight="black">Rp 1jt</text>
          <circle cx="24" cy="32" r="3" fill="#DDB892" />
          <circle cx="76" cy="32" r="3" fill="#DDB892" />
          <text x="50" y="86" textAnchor="middle" fill="#7F5539" fontSize="10" fontWeight="bold">1.000.000</text>
        </svg>
      );
    default:
      return null;
  }
};
