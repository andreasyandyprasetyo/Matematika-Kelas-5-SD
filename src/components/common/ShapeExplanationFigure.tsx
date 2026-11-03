import React from 'react';

interface ShapeExplanationFigureProps {
  text: string;
  className?: string;
}

export const ShapeExplanationFigure: React.FC<ShapeExplanationFigureProps> = ({
  text,
  className = '',
}) => {
  const lower = text.toLowerCase();

  // Detection logic for shapes
  const isCircle = lower.includes('lingkaran') || lower.includes('jari-jari') || lower.includes('diameter') || lower.includes('roda') || lower.includes('piring bundar');
  const isTrapezoid = lower.includes('trapesium');
  const isParallelogram = lower.includes('jajar genjang');
  const isKite = lower.includes('layang-layang');
  const isRhombus = lower.includes('belah ketupat');
  const isRectangle = lower.includes('persegi panjang');
  const isSquare = (lower.includes('persegi') && !isRectangle) || lower.includes('bujur sangkar');
  const isTriangle = lower.includes('segitiga');
  const isSymmetry = lower.includes('simetri lipat') || lower.includes('simetri putar') || lower.includes('sumbu simetri');
  const isPolygon = lower.includes('segi banyak') || lower.includes('pentagon') || lower.includes('heksagon');

  if (isCircle) {
    return (
      <div className={`flex items-center gap-2 bg-[#E0F2FE] p-2 rounded-xl border border-[#BAE6FD] shrink-0 ${className}`}>
        <svg width="44" height="44" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="17" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
          <circle cx="22" cy="22" r="2" fill="#EF4444" />
          <line x1="22" y1="22" x2="39" y2="22" stroke="#EF4444" strokeWidth="1.5" />
          <line x1="5" y1="22" x2="22" y2="22" stroke="#0284C7" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
        <div className="text-[10px] leading-tight text-[#0369A1] font-bold">
          <div>Lingkaran</div>
          <div className="text-[9px] font-normal text-slate-500">r: jari-jari, d: diameter</div>
        </div>
      </div>
    );
  }

  if (isTrapezoid) {
    return (
      <div className={`flex items-center gap-2 bg-[#DCFCE7] p-2 rounded-xl border border-[#BBF7D0] shrink-0 ${className}`}>
        <svg width="50" height="40" viewBox="0 0 50 40">
          <polygon points="12,8 38,8 46,32 4,32" fill="#BBF7D0" stroke="#16A34A" strokeWidth="2" />
          <line x1="12" y1="8" x2="12" y2="32" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
        <div className="text-[10px] leading-tight text-emerald-900 font-bold">
          <div>Trapesium</div>
          <div className="text-[9px] font-normal text-emerald-700">a, b sejajar; t tinggi</div>
        </div>
      </div>
    );
  }

  if (isParallelogram) {
    return (
      <div className={`flex items-center gap-2 bg-[#FEF3C7] p-2 rounded-xl border border-[#FDE68A] shrink-0 ${className}`}>
        <svg width="50" height="40" viewBox="0 0 50 40">
          <polygon points="14,8 46,8 36,32 4,32" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          <line x1="14" y1="8" x2="14" y2="32" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
        <div className="text-[10px] leading-tight text-amber-900 font-bold">
          <div>Jajar Genjang</div>
          <div className="text-[9px] font-normal text-amber-700">alas a × tinggi t</div>
        </div>
      </div>
    );
  }

  if (isKite) {
    return (
      <div className={`flex items-center gap-2 bg-[#FAF5FF] p-2 rounded-xl border border-[#E9D5FF] shrink-0 ${className}`}>
        <svg width="44" height="44" viewBox="0 0 44 44">
          <polygon points="22,4 38,18 22,40 6,18" fill="#E9D5FF" stroke="#9333EA" strokeWidth="2" />
          <line x1="6" y1="18" x2="38" y2="18" stroke="#2563EB" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="22" y1="4" x2="22" y2="40" stroke="#EA580C" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
        <div className="text-[10px] leading-tight text-purple-900 font-bold">
          <div>Layang-Layang</div>
          <div className="text-[9px] font-normal text-purple-700">1/2 × d1 × d2</div>
        </div>
      </div>
    );
  }

  if (isRhombus) {
    return (
      <div className={`flex items-center gap-2 bg-[#FFE4E6] p-2 rounded-xl border border-[#FECDD3] shrink-0 ${className}`}>
        <svg width="44" height="44" viewBox="0 0 44 44">
          <polygon points="22,4 40,22 22,40 4,22" fill="#FECDD3" stroke="#E11D48" strokeWidth="2" />
          <line x1="4" y1="22" x2="40" y2="22" stroke="#2563EB" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="22" y1="4" x2="22" y2="40" stroke="#16A34A" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
        <div className="text-[10px] leading-tight text-rose-900 font-bold">
          <div>Belah Ketupat</div>
          <div className="text-[9px] font-normal text-rose-700">4 sisi sama panjang</div>
        </div>
      </div>
    );
  }

  if (isRectangle) {
    return (
      <div className={`flex items-center gap-2 bg-[#DCFCE7] p-2 rounded-xl border border-[#BBF7D0] shrink-0 ${className}`}>
        <svg width="50" height="36" viewBox="0 0 50 36">
          <rect x="4" y="8" width="42" height="20" rx="2" fill="#BBF7D0" stroke="#16A34A" strokeWidth="2" />
        </svg>
        <div className="text-[10px] leading-tight text-emerald-900 font-bold">
          <div>Persegi Panjang</div>
          <div className="text-[9px] font-normal text-emerald-700">K = 2(p+l), L = p×l</div>
        </div>
      </div>
    );
  }

  if (isSquare) {
    return (
      <div className={`flex items-center gap-2 bg-[#E0F2FE] p-2 rounded-xl border border-[#BAE6FD] shrink-0 ${className}`}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="6" y="6" width="28" height="28" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
          <line x1="19" y1="4" x2="21" y2="8" stroke="#0284C7" strokeWidth="1.5" />
          <line x1="19" y1="32" x2="21" y2="36" stroke="#0284C7" strokeWidth="1.5" />
        </svg>
        <div className="text-[10px] leading-tight text-[#0369A1] font-bold">
          <div>Persegi (Bujur Sangkar)</div>
          <div className="text-[9px] font-normal text-[#0284C7]">K = 4s, L = s×s</div>
        </div>
      </div>
    );
  }

  if (isTriangle) {
    return (
      <div className={`flex items-center gap-2 bg-[#FFE4E6] p-2 rounded-xl border border-[#FECDD3] shrink-0 ${className}`}>
        <svg width="44" height="40" viewBox="0 0 44 40">
          <polygon points="22,6 40,34 4,34" fill="#FECDD3" stroke="#F43F5E" strokeWidth="2" />
          <line x1="22" y1="6" x2="22" y2="34" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
        <div className="text-[10px] leading-tight text-rose-900 font-bold">
          <div>Segitiga</div>
          <div className="text-[9px] font-normal text-rose-700">L = 1/2 × a × t</div>
        </div>
      </div>
    );
  }

  if (isSymmetry) {
    return (
      <div className={`flex items-center gap-2 bg-[#FAF5EE] p-2 rounded-xl border border-[#EADCC9] shrink-0 ${className}`}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="6" y="6" width="28" height="28" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
          <line x1="20" y1="2" x2="20" y2="38" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="2" y1="20" x2="38" y2="20" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
        <div className="text-[10px] leading-tight text-amber-900 font-bold">
          <div>Sumbu Simetri</div>
          <div className="text-[9px] font-normal text-red-600">Garis lipat simetri</div>
        </div>
      </div>
    );
  }

  if (isPolygon) {
    return (
      <div className={`flex items-center gap-2 bg-[#F0FDF4] p-2 rounded-xl border border-[#BBF7D0] shrink-0 ${className}`}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <polygon points="20,4 37,16 30,36 10,36 3,16" fill="#BBF7D0" stroke="#16A34A" strokeWidth="2" />
        </svg>
        <div className="text-[10px] leading-tight text-emerald-900 font-bold">
          <div>Segi Banyak</div>
          <div className="text-[9px] font-normal text-emerald-700">Beraturan / Tak Beraturan</div>
        </div>
      </div>
    );
  }

  return null;
};
