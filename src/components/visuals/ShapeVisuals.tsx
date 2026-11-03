import React from 'react';
import { Sparkles, CheckCircle2, RotateCw } from 'lucide-react';

// ==========================================
// BAB 4: KELILING BANGUN DATAR VISUALS
// ==========================================

export const PerimeterConceptVisual: React.FC = () => {
  return (
    <div className="my-5 p-5 bg-[#F0FDF4] rounded-2xl border-2 border-[#BBF7D0]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-[#16A34A]" />
        <h4 className="font-bold text-slate-800 text-sm">
          Ilustrasi Konsep Keliling: Menghitung Panjang Seluruh Sisi Luar
        </h4>
      </div>
      <p className="text-xs text-slate-600 mb-4">
        Bayangkan seorang pelari berlari menyusuri seluruh tepi lapangan dari titik awal (A) memutari tepi hingga kembali ke (A).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lapangan Persegi Panjang */}
        <div className="bg-white p-4 rounded-xl border border-[#BBF7D0] shadow-xs flex flex-col items-center">
          <div className="text-xs font-bold text-emerald-800 mb-2">Lapangan Persegi Panjang</div>
          <svg width="240" height="130" viewBox="0 0 240 130" className="overflow-visible">
            {/* Background shape */}
            <rect x="30" y="25" width="180" height="80" rx="8" fill="#DCFCE7" stroke="#16A34A" strokeWidth="3" />
            {/* Running path arrows */}
            <path
              d="M 28 23 L 212 23 L 212 107 L 28 107 Z"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            {/* Corner points */}
            <circle cx="30" cy="25" r="5" fill="#EF4444" />
            <text x="18" y="22" className="text-[11px] font-bold fill-red-600">A (Mulai)</text>
            <circle cx="210" cy="25" r="4" fill="#3B82F6" />
            <text x="215" y="22" className="text-[11px] font-bold fill-blue-600">B</text>
            <circle cx="210" cy="105" r="4" fill="#3B82F6" />
            <text x="215" y="115" className="text-[11px] font-bold fill-blue-600">C</text>
            <circle cx="30" cy="105" r="4" fill="#3B82F6" />
            <text x="18" y="115" className="text-[11px] font-bold fill-blue-600">D</text>

            {/* Side labels */}
            <text x="100" y="18" className="text-[11px] font-extrabold fill-slate-700">Panjang (p)</text>
            <text x="100" y="122" className="text-[11px] font-extrabold fill-slate-700">Panjang (p)</text>
            <text x="0" y="70" className="text-[11px] font-extrabold fill-slate-700" transform="rotate(-90 10 70)">Lebar (l)</text>
            <text x="220" y="70" className="text-[11px] font-extrabold fill-slate-700">Lebar (l)</text>
          </svg>
          <div className="mt-2 text-center text-xs font-bold text-slate-700 bg-[#F0FDF4] px-3 py-1.5 rounded-lg border border-[#BBF7D0]">
            Keliling = AB + BC + CD + DA = <span className="text-[#16A34A]">2 × (p + l)</span>
          </div>
        </div>

        {/* Segitiga Sembarang */}
        <div className="bg-white p-4 rounded-xl border border-[#BBF7D0] shadow-xs flex flex-col items-center">
          <div className="text-xs font-bold text-emerald-800 mb-2">Taman Berbentuk Segitiga</div>
          <svg width="220" height="130" viewBox="0 0 220 130" className="overflow-visible">
            <polygon points="110,20 190,105 30,105" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" strokeLinejoin="round" />
            {/* Side Labels */}
            <text x="50" y="55" className="text-[11px] font-extrabold fill-amber-800">Sisi a</text>
            <text x="160" y="55" className="text-[11px] font-extrabold fill-amber-800">Sisi b</text>
            <text x="100" y="122" className="text-[11px] font-extrabold fill-amber-800">Sisi c (Alas)</text>

            <circle cx="110" cy="20" r="4" fill="#D97706" />
            <circle cx="190" cy="105" r="4" fill="#D97706" />
            <circle cx="30" cy="105" r="4" fill="#D97706" />
          </svg>
          <div className="mt-2 text-center text-xs font-bold text-slate-700 bg-[#FFFBEB] px-3 py-1.5 rounded-lg border border-[#FDE68A]">
            Keliling = Sisi a + Sisi b + Sisi c = <span className="text-[#D97706]">a + b + c</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PerimeterSquareRectVisual: React.FC = () => {
  return (
    <div className="my-5 p-5 bg-[#F0F9FF] rounded-2xl border-2 border-[#BAE6FD]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-[#0284C7]" />
        <h4 className="font-bold text-slate-800 text-sm">
          Gambar Bangun & Rumus Keliling: Persegi vs Persegi Panjang
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Persegi */}
        <div className="bg-white p-4 rounded-xl border border-[#BAE6FD] shadow-xs flex flex-col items-center">
          <div className="text-xs font-extrabold text-[#0284C7] uppercase tracking-wider mb-2">1. Persegi (Bujur Sangkar)</div>
          <svg width="180" height="150" viewBox="0 0 180 150" className="overflow-visible">
            {/* Square shape */}
            <rect x="40" y="25" width="100" height="100" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
            {/* Tick marks indicating equal 4 sides */}
            <line x1="88" y1="20" x2="92" y2="30" stroke="#0284C7" strokeWidth="2" />
            <line x1="88" y1="120" x2="92" y2="130" stroke="#0284C7" strokeWidth="2" />
            <line x1="35" y1="73" x2="45" y2="77" stroke="#0284C7" strokeWidth="2" />
            <line x1="135" y1="73" x2="145" y2="77" stroke="#0284C7" strokeWidth="2" />
            {/* Right angle marks */}
            <path d="M 40 37 L 52 37 L 52 25" fill="none" stroke="#0284C7" strokeWidth="1.5" />
            <path d="M 128 25 L 128 37 L 140 37" fill="none" stroke="#0284C7" strokeWidth="1.5" />
            <path d="M 40 113 L 52 113 L 52 125" fill="none" stroke="#0284C7" strokeWidth="1.5" />
            <path d="M 128 125 L 128 113 L 140 113" fill="none" stroke="#0284C7" strokeWidth="1.5" />

            {/* Labels */}
            <text x="85" y="15" className="text-xs font-bold fill-[#0369A1]">sisi (s)</text>
            <text x="85" y="142" className="text-xs font-bold fill-[#0369A1]">sisi (s)</text>
            <text x="10" y="78" className="text-xs font-bold fill-[#0369A1]">sisi (s)</text>
            <text x="146" y="78" className="text-xs font-bold fill-[#0369A1]">sisi (s)</text>
          </svg>
          <div className="w-full text-center mt-2 bg-[#E0F2FE] p-2 rounded-lg border border-[#BAE6FD]">
            <div className="text-xs text-slate-600 font-medium">4 sisi sama panjang</div>
            <div className="text-sm font-black text-[#0284C7]">K = s + s + s + s = 4 × s</div>
          </div>
        </div>

        {/* Persegi Panjang */}
        <div className="bg-white p-4 rounded-xl border border-[#BAE6FD] shadow-xs flex flex-col items-center">
          <div className="text-xs font-extrabold text-[#0284C7] uppercase tracking-wider mb-2">2. Persegi Panjang</div>
          <svg width="220" height="150" viewBox="0 0 220 150" className="overflow-visible">
            {/* Rect shape */}
            <rect x="25" y="35" width="170" height="80" rx="4" fill="#F0FDF4" stroke="#16A34A" strokeWidth="3" />
            {/* Double tick marks for length */}
            <line x1="106" y1="30" x2="110" y2="40" stroke="#16A34A" strokeWidth="2" />
            <line x1="112" y1="30" x2="116" y2="40" stroke="#16A34A" strokeWidth="2" />
            <line x1="106" y1="110" x2="110" y2="120" stroke="#16A34A" strokeWidth="2" />
            <line x1="112" y1="110" x2="116" y2="120" stroke="#16A34A" strokeWidth="2" />
            {/* Single tick for width */}
            <line x1="20" y1="72" x2="30" y2="78" stroke="#16A34A" strokeWidth="2" />
            <line x1="190" y1="72" x2="200" y2="78" stroke="#16A34A" strokeWidth="2" />

            {/* Labels */}
            <text x="85" y="25" className="text-xs font-bold fill-emerald-800">Panjang (p)</text>
            <text x="85" y="135" className="text-xs font-bold fill-emerald-800">Panjang (p)</text>
            <text x="0" y="78" className="text-xs font-bold fill-emerald-800" transform="rotate(-90 8 78)">Lebar (l)</text>
            <text x="200" y="78" className="text-xs font-bold fill-emerald-800">Lebar (l)</text>
          </svg>
          <div className="w-full text-center mt-2 bg-[#DCFCE7] p-2 rounded-lg border border-[#BBF7D0]">
            <div className="text-xs text-slate-600 font-medium">2 sisi panjang + 2 sisi lebar</div>
            <div className="text-sm font-black text-[#16A34A]">K = 2 × (p + l)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PerimeterOtherShapesVisual: React.FC = () => {
  return (
    <div className="my-5 p-5 bg-[#FAF5EE] rounded-2xl border-2 border-[#EADCC9]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-[#7F5539]" />
        <h4 className="font-bold text-slate-800 text-sm">
          Gambar Bangun: Keliling Jajar Genjang, Trapesium, & Segitiga
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Jajar Genjang */}
        <div className="bg-white p-4 rounded-xl border border-[#EADCC9] shadow-xs flex flex-col items-center">
          <div className="text-xs font-bold text-[#7F5539] mb-1">Jajar Genjang</div>
          <svg width="220" height="120" viewBox="0 0 220 120" className="overflow-visible">
            <polygon points="55,20 195,20 165,95 25,95" fill="#FFF7ED" stroke="#EA580C" strokeWidth="3" strokeLinejoin="round" />
            <text x="95" y="15" className="text-xs font-bold fill-orange-800">Sisi Alas (a)</text>
            <text x="80" y="112" className="text-xs font-bold fill-orange-800">Sisi Alas (a)</text>
            <text x="20" y="55" className="text-xs font-bold fill-orange-800">Miring (b)</text>
            <text x="180" y="55" className="text-xs font-bold fill-orange-800">Miring (b)</text>
          </svg>
          <div className="w-full text-center mt-2 bg-orange-50 p-2 rounded-lg border border-orange-200">
            <div className="text-xs font-bold text-orange-900">Keliling = 2 × (a + b)</div>
            <div className="text-[11px] text-orange-700">Jumlahkan sepasang alas dan sepasang sisi miring</div>
          </div>
        </div>

        {/* Trapesium */}
        <div className="bg-white p-4 rounded-xl border border-[#EADCC9] shadow-xs flex flex-col items-center">
          <div className="text-xs font-bold text-[#7F5539] mb-1">Trapesium Sama Kaki</div>
          <svg width="220" height="120" viewBox="0 0 220 120" className="overflow-visible">
            <polygon points="65,20 155,20 195,95 25,95" fill="#FAF5FF" stroke="#9333EA" strokeWidth="3" strokeLinejoin="round" />
            <text x="90" y="15" className="text-xs font-bold fill-purple-800">Sisi Atas (a)</text>
            <text x="85" y="112" className="text-xs font-bold fill-purple-800">Sisi Bawah (b)</text>
            <text x="22" y="55" className="text-xs font-bold fill-purple-800">Sisi c</text>
            <text x="175" y="55" className="text-xs font-bold fill-purple-800">Sisi d</text>
          </svg>
          <div className="w-full text-center mt-2 bg-purple-50 p-2 rounded-lg border border-purple-200">
            <div className="text-xs font-bold text-purple-900">Keliling = a + b + c + d</div>
            <div className="text-[11px] text-purple-700">Jumlahkan keempat sisi luarnya</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PerimeterCircleVisual: React.FC = () => {
  return (
    <div className="my-5 p-5 bg-[#F0F9FF] rounded-2xl border-2 border-[#BAE6FD]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-[#0284C7]" />
        <h4 className="font-bold text-slate-800 text-sm">
          Gambar Bangun Lingkaran: Jari-Jari (r) & Diameter (d)
        </h4>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-6 bg-white p-5 rounded-xl border border-[#BAE6FD] shadow-xs">
        {/* Circle Diagram */}
        <div className="relative flex flex-col items-center">
          <svg width="200" height="170" viewBox="0 0 200 170" className="overflow-visible">
            {/* Circle boundary */}
            <circle cx="100" cy="85" r="65" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3.5" />
            {/* Center point */}
            <circle cx="100" cy="85" r="4.5" fill="#EF4444" />
            <text x="103" y="78" className="text-[11px] font-black fill-red-600">Pusat O</text>

            {/* Radius line r */}
            <line x1="100" y1="85" x2="165" y2="85" stroke="#EF4444" strokeWidth="2.5" />
            <text x="125" y="78" className="text-[11px] font-black fill-red-600">r</text>

            {/* Diameter line d */}
            <line x1="35" y1="85" x2="100" y2="85" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="3 3" />
            <text x="55" y="78" className="text-[11px] font-black fill-blue-600">r</text>

            {/* Circular perimeter arrow indicator */}
            <path
              d="M 100 12 A 73 73 0 1 1 90 13"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
            <polygon points="90,13 97,7 96,19" fill="#F59E0B" />
            <text x="60" y="8" className="text-[11px] font-black fill-amber-600">Keliling (K)</text>
          </svg>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">
            Diameter (d) = 2 × Jari-Jari (r)
          </div>
        </div>

        {/* Formulas & Explanation */}
        <div className="space-y-3 max-w-sm">
          <div className="bg-[#E0F2FE] p-3 rounded-xl border border-[#BAE6FD]">
            <div className="text-xs font-bold text-[#0369A1] uppercase mb-1">Rumus Keliling Lingkaran:</div>
            <div className="text-base font-black text-[#0284C7] font-mono">K = 2 × π × r</div>
            <div className="text-sm font-bold text-[#0369A1] font-mono mt-0.5">atau K = π × d</div>
          </div>
          <div className="bg-[#FFFBEB] p-3 rounded-xl border border-[#FDE68A] text-xs text-amber-900 space-y-1">
            <div className="font-bold">✨ Nilai Konstanta π (Pi):</div>
            <div>• Gunakan <span className="font-bold font-mono">π = 22/7</span> jika jari-jari (r) atau diameter (d) adalah kelipatan 7 (misal: 7, 14, 21, 28 cm).</div>
            <div>• Gunakan <span className="font-bold font-mono">π = 3,14</span> jika jari-jari (r) atau diameter (d) bukan kelipatan 7 (misal: 10, 20 cm).</div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// BAB 5: LUAS DAERAH BANGUN DATAR VISUALS
// ==========================================

export const AreaTriangleVisual: React.FC = () => {
  return (
    <div className="my-5 p-5 bg-[#FFF1F2] rounded-2xl border-2 border-[#FECDD3]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-[#F43F5E]" />
        <h4 className="font-bold text-slate-800 text-sm">
          Gambar Bangun & Konsep Luas Segitiga: Setengah Persegi Panjang
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Segitiga Siku-Siku & Kotak */}
        <div className="bg-white p-4 rounded-xl border border-[#FECDD3] shadow-xs flex flex-col items-center">
          <div className="text-xs font-bold text-[#F43F5E] mb-2">Mengapa rumus ada 1/2?</div>
          <svg width="220" height="140" viewBox="0 0 220 140" className="overflow-visible">
            {/* Surrounding rectangle with dotted line */}
            <rect x="35" y="20" width="140" height="90" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
            <polygon points="35,110 175,110 35,20" fill="#FFE4E6" stroke="#F43F5E" strokeWidth="3" />
            <polygon points="35,20 175,20 175,110" fill="#F1F5F9" opacity="0.6" stroke="#CBD5E1" strokeWidth="1" />

            {/* Siku-siku */}
            <rect x="35" y="98" width="12" height="12" fill="none" stroke="#F43F5E" strokeWidth="1.5" />

            {/* Labels */}
            <text x="85" y="128" className="text-xs font-bold fill-rose-800">Alas (a)</text>
            <text x="5" y="70" className="text-xs font-bold fill-rose-800" transform="rotate(-90 12 70)">Tinggi (t)</text>
            <text x="110" y="55" className="text-[11px] font-bold fill-slate-400">1/2 bagian</text>
            <text x="70" y="85" className="text-xs font-bold fill-rose-700">Luas Segitiga</text>
          </svg>
          <div className="text-center text-xs text-slate-600 mt-1">
            Segitiga adalah <span className="font-bold text-rose-600">setengah (1/2)</span> dari persegi panjang yang berukuran alas (a) dan tinggi (t).
          </div>
        </div>

        {/* Segitiga Sembarang dengan Garis Tinggi Tegak Lurus */}
        <div className="bg-white p-4 rounded-xl border border-[#FECDD3] shadow-xs flex flex-col items-center">
          <div className="text-xs font-bold text-[#F43F5E] mb-2">Segitiga dengan Garis Tinggi (t)</div>
          <svg width="220" height="140" viewBox="0 0 220 140" className="overflow-visible">
            <polygon points="40,110 190,110 110,25" fill="#FFE4E6" stroke="#F43F5E" strokeWidth="3" strokeLinejoin="round" />
            {/* Height dotted line */}
            <line x1="110" y1="25" x2="110" y2="110" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 3" />
            <rect x="110" y="98" width="12" height="12" fill="none" stroke="#7C3AED" strokeWidth="1.5" />

            {/* Labels */}
            <text x="115" y="70" className="text-xs font-extrabold fill-purple-800">Tinggi (t)</text>
            <text x="100" y="128" className="text-xs font-extrabold fill-rose-800">Alas (a)</text>
            <circle cx="110" cy="25" r="4" fill="#7C3AED" />
            <circle cx="40" cy="110" r="4" fill="#F43F5E" />
            <circle cx="190" cy="110" r="4" fill="#F43F5E" />
          </svg>
          <div className="w-full text-center mt-2 bg-rose-50 p-2 rounded-lg border border-rose-200">
            <div className="text-xs text-rose-800 font-medium">Tinggi (t) harus selalu tegak lurus (90°) dengan alas (a)</div>
            <div className="text-sm font-black text-rose-600 font-mono">Luas = 1/2 × a × t</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AreaParallelogramVisual: React.FC = () => {
  return (
    <div className="my-5 p-5 bg-[#FFFBEB] rounded-2xl border-2 border-[#FDE68A]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-[#F59E0B]" />
        <h4 className="font-bold text-slate-800 text-sm">
          Gambar Bangun & Pembuktian Luas Jajar Genjang: L = alas × tinggi
        </h4>
      </div>

      <div className="bg-white p-5 rounded-xl border border-[#FDE68A] shadow-xs flex flex-col md:flex-row items-center justify-around gap-6">
        <svg width="270" height="140" viewBox="0 0 270 140" className="overflow-visible">
          {/* Main Parallelogram */}
          <polygon points="50,110 200,110 230,30 80,30" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />

          {/* Dotted height line */}
          <line x1="80" y1="30" x2="80" y2="110" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 3" />
          <rect x="80" y="98" width="12" height="12" fill="none" stroke="#2563EB" strokeWidth="1.5" />
          <text x="85" y="75" className="text-xs font-extrabold fill-blue-700">t (tinggi)</text>

          {/* Cut triangle demonstration (moved to right side) */}
          <polygon points="50,110 80,110 80,30" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Arrow showing move */}
          <path d="M 65 70 Q 140 0 215 70" fill="none" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrow)" />
          <polygon points="200,110 230,110 230,30" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" strokeDasharray="4 3" />

          {/* Labels */}
          <text x="115" y="128" className="text-xs font-extrabold fill-amber-900">Alas (a)</text>
          <text x="135" y="22" className="text-xs font-bold fill-slate-500">Alas (a)</text>
        </svg>

        <div className="space-y-3 max-w-sm">
          <div className="bg-[#FEF3C7] p-3 rounded-xl border border-[#FDE68A]">
            <div className="text-xs font-bold text-amber-900 uppercase">Rumus Luas Jajar Genjang:</div>
            <div className="text-lg font-black text-amber-700 font-mono">Luas = a × t</div>
          </div>
          <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
            <strong className="text-slate-800">💡 Penjelasan Visual:</strong>
            <p className="mt-1">
              Segitiga di sebelah kiri dipotong menurut garis tinggi (t), lalu dipindahkan ke sebelah kanan. Bentuknya tepat berubah menjadi <strong className="text-amber-800">persegi panjang</strong> dengan panjang = alas (a) dan lebar = tinggi (t). Jadi luasnya sama: <strong className="text-amber-800">a × t</strong>!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AreaTrapezoidVisual: React.FC = () => {
  return (
    <div className="my-5 p-5 bg-[#F0FDF4] rounded-2xl border-2 border-[#BBF7D0]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-[#16A34A]" />
        <h4 className="font-bold text-slate-800 text-sm">
          Gambar Bangun & Rumus Luas Trapesium
        </h4>
      </div>

      <div className="bg-white p-5 rounded-xl border border-[#BBF7D0] shadow-xs flex flex-col md:flex-row items-center justify-around gap-6">
        <svg width="260" height="150" viewBox="0 0 260 150" className="overflow-visible">
          {/* Trapezoid */}
          <polygon points="65,30 175,30 225,115 25,115" fill="#DCFCE7" stroke="#16A34A" strokeWidth="3" strokeLinejoin="round" />

          {/* Parallel lines marker */}
          <line x1="115" y1="26" x2="125" y2="30" stroke="#16A34A" strokeWidth="2" />
          <line x1="115" y1="34" x2="125" y2="30" stroke="#16A34A" strokeWidth="2" />
          <line x1="120" y1="111" x2="130" y2="115" stroke="#16A34A" strokeWidth="2" />
          <line x1="120" y1="119" x2="130" y2="115" stroke="#16A34A" strokeWidth="2" />

          {/* Height line t */}
          <line x1="65" y1="30" x2="65" y2="115" stroke="#EA580C" strokeWidth="2.5" strokeDasharray="4 3" />
          <rect x="65" y="103" width="12" height="12" fill="none" stroke="#EA580C" strokeWidth="1.5" />
          <text x="35" y="75" className="text-xs font-black fill-orange-700">Tinggi (t)</text>

          {/* Labels */}
          <text x="100" y="20" className="text-xs font-black fill-emerald-800">Sisi Sejajar Atas (a)</text>
          <text x="90" y="135" className="text-xs font-black fill-emerald-800">Sisi Sejajar Bawah (b)</text>
        </svg>

        <div className="space-y-3 max-w-sm">
          <div className="bg-[#DCFCE7] p-3 rounded-xl border border-[#BBF7D0]">
            <div className="text-xs font-bold text-emerald-900 uppercase">Rumus Luas Trapesium:</div>
            <div className="text-base font-black text-emerald-700 font-mono">
              L = 1/2 × (a + b) × t
            </div>
            <div className="text-[11px] text-emerald-800 mt-1">
              "Setengah dikali (jumlah sisi sejajar) dikali tinggi"
            </div>
          </div>
          <div className="text-xs text-slate-600 bg-[#F0FDF4] p-3 rounded-xl border border-[#BBF7D0]">
            <strong>Catatan Penting:</strong>
            <p className="mt-1">
              Jumlahkan terlebih dahulu kedua sisi yang saling sejajar (a + b), kemudian kalikan dengan tinggi tegak lurus (t), lalu bagi dua!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AreaKiteRhombusVisual: React.FC = () => {
  return (
    <div className="my-5 p-5 bg-[#FAF5EE] rounded-2xl border-2 border-[#EADCC9]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-[#7F5539]" />
        <h4 className="font-bold text-slate-800 text-sm">
          Gambar Bangun: Luas Layang-Layang & Belah Ketupat (Diagonal 1 & Diagonal 2)
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Layang-Layang */}
        <div className="bg-white p-4 rounded-xl border border-[#EADCC9] shadow-xs flex flex-col items-center">
          <div className="text-xs font-extrabold text-[#7F5539] uppercase mb-2">1. Layang-Layang</div>
          <svg width="180" height="170" viewBox="0 0 180 170" className="overflow-visible">
            {/* Kite polygon */}
            <polygon points="90,15 155,75 90,155 25,75" fill="#FAF5FF" stroke="#9333EA" strokeWidth="3" strokeLinejoin="round" />

            {/* Diagonal 1 (horizontal) */}
            <line x1="25" y1="75" x2="155" y2="75" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="4 3" />
            <text x="120" y="68" className="text-xs font-extrabold fill-blue-700">d1</text>

            {/* Diagonal 2 (vertical) */}
            <line x1="90" y1="15" x2="90" y2="155" stroke="#EA580C" strokeWidth="2.5" strokeDasharray="4 3" />
            <text x="96" y="115" className="text-xs font-extrabold fill-orange-700">d2</text>

            {/* Right angle at intersection */}
            <rect x="90" y="75" width="10" height="10" fill="none" stroke="#475569" strokeWidth="1" />
          </svg>
          <div className="w-full text-center mt-2 bg-purple-50 p-2 rounded-lg border border-purple-200">
            <div className="text-xs font-bold text-purple-900">Kedua diagonal berpotongan 90°</div>
            <div className="text-sm font-black text-purple-700 font-mono">Luas = 1/2 × d1 × d2</div>
          </div>
        </div>

        {/* Belah Ketupat */}
        <div className="bg-white p-4 rounded-xl border border-[#EADCC9] shadow-xs flex flex-col items-center">
          <div className="text-xs font-extrabold text-[#7F5539] uppercase mb-2">2. Belah Ketupat</div>
          <svg width="180" height="170" viewBox="0 0 180 170" className="overflow-visible">
            {/* Rhombus polygon */}
            <polygon points="90,20 150,85 90,150 30,85" fill="#FFE4E6" stroke="#E11D48" strokeWidth="3" strokeLinejoin="round" />

            {/* Equal side ticks */}
            <line x1="56" y1="50" x2="64" y2="54" stroke="#E11D48" strokeWidth="2" />
            <line x1="116" y1="50" x2="124" y2="54" stroke="#E11D48" strokeWidth="2" />
            <line x1="56" y1="116" x2="64" y2="120" stroke="#E11D48" strokeWidth="2" />
            <line x1="116" y1="116" x2="124" y2="120" stroke="#E11D48" strokeWidth="2" />

            {/* Diagonals */}
            <line x1="30" y1="85" x2="150" y2="85" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="4 3" />
            <text x="120" y="78" className="text-xs font-extrabold fill-blue-700">d1</text>
            <line x1="90" y1="20" x2="90" y2="150" stroke="#16A34A" strokeWidth="2.5" strokeDasharray="4 3" />
            <text x="96" y="115" className="text-xs font-extrabold fill-emerald-700">d2</text>
            <rect x="90" y="85" width="10" height="10" fill="none" stroke="#475569" strokeWidth="1" />
          </svg>
          <div className="w-full text-center mt-2 bg-rose-50 p-2 rounded-lg border border-rose-200">
            <div className="text-xs font-bold text-rose-900">4 sisi sama panjang, diagonal siku-siku</div>
            <div className="text-sm font-black text-rose-700 font-mono">Luas = 1/2 × d1 × d2</div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// BAB 7: MEMBANDINGKAN BANGUN DATAR VISUALS
// ==========================================

export const RegularIrregularVisual: React.FC = () => {
  return (
    <div className="my-5 p-5 bg-[#FFF1F2] rounded-2xl border-2 border-[#FECDD3]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-[#F43F5E]" />
        <h4 className="font-bold text-slate-800 text-sm">
          Perbandingan Gambar: Segi Banyak Beraturan vs Segi Banyak Tidak Beraturan
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Kolom Beraturan */}
        <div className="bg-white p-4 rounded-xl border border-emerald-300 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-100">
            <span className="text-xs font-extrabold text-emerald-700 uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Segi Banyak Beraturan
            </span>
            <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
              Semua sisi & sudut sama
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-xs">
            {/* Segitiga Sama Sisi */}
            <div className="bg-[#F0FDF4] p-3 rounded-xl border border-[#BBF7D0] flex flex-col items-center">
              <svg width="70" height="60" viewBox="0 0 70 60">
                <polygon points="35,5 65,55 5,55" fill="#BBF7D0" stroke="#16A34A" strokeWidth="2.5" />
              </svg>
              <span className="font-bold text-emerald-900 mt-1">Segitiga Sama Sisi</span>
              <span className="text-[10px] text-emerald-700">3 sisi sama, 60°</span>
            </div>

            {/* Persegi */}
            <div className="bg-[#F0FDF4] p-3 rounded-xl border border-[#BBF7D0] flex flex-col items-center">
              <svg width="70" height="60" viewBox="0 0 70 60">
                <rect x="10" y="5" width="50" height="50" rx="3" fill="#BBF7D0" stroke="#16A34A" strokeWidth="2.5" />
              </svg>
              <span className="font-bold text-emerald-900 mt-1">Persegi</span>
              <span className="text-[10px] text-emerald-700">4 sisi sama, 90°</span>
            </div>

            {/* Pentagon (Segi Lima) */}
            <div className="bg-[#F0FDF4] p-3 rounded-xl border border-[#BBF7D0] flex flex-col items-center">
              <svg width="70" height="60" viewBox="0 0 70 60">
                <polygon points="35,5 65,26 53,57 17,57 5,26" fill="#BBF7D0" stroke="#16A34A" strokeWidth="2.5" />
              </svg>
              <span className="font-bold text-emerald-900 mt-1">Segi Lima (Pentagon)</span>
              <span className="text-[10px] text-emerald-700">5 sisi sama panjang</span>
            </div>

            {/* Heksagon (Segi Enam) */}
            <div className="bg-[#F0FDF4] p-3 rounded-xl border border-[#BBF7D0] flex flex-col items-center">
              <svg width="70" height="60" viewBox="0 0 70 60">
                <polygon points="35,5 60,18 60,44 35,57 10,44 10,18" fill="#BBF7D0" stroke="#16A34A" strokeWidth="2.5" />
              </svg>
              <span className="font-bold text-emerald-900 mt-1">Segi Enam (Heksagon)</span>
              <span className="text-[10px] text-emerald-700">6 sisi sama panjang</span>
            </div>
          </div>
        </div>

        {/* Kolom Tidak Beraturan */}
        <div className="bg-white p-4 rounded-xl border border-rose-300 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-rose-100">
            <span className="text-xs font-extrabold text-rose-700 uppercase">
              ⚠️ Segi Banyak Tidak Beraturan
            </span>
            <span className="text-[11px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
              Sisi / sudut berbeda
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-xs">
            {/* Persegi Panjang */}
            <div className="bg-[#FFF1F2] p-3 rounded-xl border border-[#FECDD3] flex flex-col items-center">
              <svg width="70" height="60" viewBox="0 0 70 60">
                <rect x="5" y="15" width="60" height="30" rx="3" fill="#FECDD3" stroke="#E11D48" strokeWidth="2.5" />
              </svg>
              <span className="font-bold text-rose-900 mt-1">Persegi Panjang</span>
              <span className="text-[10px] text-rose-700">Panjang ≠ Lebar</span>
            </div>

            {/* Segitiga Siku-Siku */}
            <div className="bg-[#FFF1F2] p-3 rounded-xl border border-[#FECDD3] flex flex-col items-center">
              <svg width="70" height="60" viewBox="0 0 70 60">
                <polygon points="10,10 60,50 10,50" fill="#FECDD3" stroke="#E11D48" strokeWidth="2.5" />
              </svg>
              <span className="font-bold text-rose-900 mt-1">Segitiga Siku-Siku</span>
              <span className="text-[10px] text-rose-700">Sisi & sudut beda</span>
            </div>

            {/* Jajar Genjang */}
            <div className="bg-[#FFF1F2] p-3 rounded-xl border border-[#FECDD3] flex flex-col items-center">
              <svg width="70" height="60" viewBox="0 0 70 60">
                <polygon points="18,15 65,15 52,48 5,48" fill="#FECDD3" stroke="#E11D48" strokeWidth="2.5" />
              </svg>
              <span className="font-bold text-rose-900 mt-1">Jajar Genjang</span>
              <span className="text-[10px] text-rose-700">Sudut ada lancip/tumpul</span>
            </div>

            {/* Trapesium */}
            <div className="bg-[#FFF1F2] p-3 rounded-xl border border-[#FECDD3] flex flex-col items-center">
              <svg width="70" height="60" viewBox="0 0 70 60">
                <polygon points="20,15 50,15 65,48 5,48" fill="#FECDD3" stroke="#E11D48" strokeWidth="2.5" />
              </svg>
              <span className="font-bold text-rose-900 mt-1">Trapesium</span>
              <span className="text-[10px] text-rose-700">Sisi tidak sama panjang</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShapeComparisonVisual: React.FC = () => {
  return (
    <div className="my-5 p-5 bg-[#F0F9FF] rounded-2xl border-2 border-[#BAE6FD]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-[#0284C7]" />
        <h4 className="font-bold text-slate-800 text-sm">
          Perbandingan Gambar: Membedakan Sifat Persegi, Persegi Panjang, & Belah Ketupat
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Persegi */}
        <div className="bg-white p-3.5 rounded-xl border border-[#BAE6FD] flex flex-col items-center text-center">
          <div className="text-xs font-black text-[#0284C7] mb-2">PERSEGI</div>
          <svg width="100" height="90" viewBox="0 0 100 90">
            <rect x="15" y="10" width="70" height="70" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
            <rect x="15" y="10" width="10" height="10" fill="none" stroke="#0284C7" strokeWidth="1" />
            <rect x="75" y="10" width="10" height="10" fill="none" stroke="#0284C7" strokeWidth="1" />
            <rect x="15" y="70" width="10" height="10" fill="none" stroke="#0284C7" strokeWidth="1" />
            <rect x="75" y="70" width="10" height="10" fill="none" stroke="#0284C7" strokeWidth="1" />
          </svg>
          <div className="text-[11px] text-slate-600 space-y-1 mt-2 text-left w-full bg-slate-50 p-2 rounded-lg">
            <div>• <strong className="text-blue-800">4 sisi sama panjang</strong></div>
            <div>• <strong className="text-blue-800">4 sudut siku-siku (90°)</strong></div>
            <div>• 2 diagonal sama & tegak lurus</div>
            <div>• 4 simetri lipat & 4 putar</div>
          </div>
        </div>

        {/* Persegi Panjang */}
        <div className="bg-white p-3.5 rounded-xl border border-[#BAE6FD] flex flex-col items-center text-center">
          <div className="text-xs font-black text-emerald-700 mb-2">PERSEGI PANJANG</div>
          <svg width="100" height="90" viewBox="0 0 100 90">
            <rect x="5" y="20" width="90" height="50" rx="3" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.5" />
            <rect x="5" y="20" width="8" height="8" fill="none" stroke="#16A34A" strokeWidth="1" />
            <rect x="87" y="20" width="8" height="8" fill="none" stroke="#16A34A" strokeWidth="1" />
            <rect x="5" y="62" width="8" height="8" fill="none" stroke="#16A34A" strokeWidth="1" />
            <rect x="87" y="62" width="8" height="8" fill="none" stroke="#16A34A" strokeWidth="1" />
          </svg>
          <div className="text-[11px] text-slate-600 space-y-1 mt-2 text-left w-full bg-slate-50 p-2 rounded-lg">
            <div>• <strong className="text-emerald-800">Sisi berhadapan sama</strong></div>
            <div>• <strong className="text-emerald-800">4 sudut siku-siku (90°)</strong></div>
            <div>• 2 diagonal sama panjang</div>
            <div>• 2 simetri lipat & 2 putar</div>
          </div>
        </div>

        {/* Belah Ketupat */}
        <div className="bg-white p-3.5 rounded-xl border border-[#BAE6FD] flex flex-col items-center text-center">
          <div className="text-xs font-black text-rose-700 mb-2">BELAH KETUPAT</div>
          <svg width="100" height="90" viewBox="0 0 100 90">
            <polygon points="50,10 88,45 50,80 12,45" fill="#FFE4E6" stroke="#E11D48" strokeWidth="2.5" />
            <line x1="12" y1="45" x2="88" y2="45" stroke="#E11D48" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="50" y1="10" x2="50" y2="80" stroke="#E11D48" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
          <div className="text-[11px] text-slate-600 space-y-1 mt-2 text-left w-full bg-slate-50 p-2 rounded-lg">
            <div>• <strong className="text-rose-800">4 sisi sama panjang</strong></div>
            <div>• <strong className="text-rose-800">Sudut TIDAK 90°</strong> (ada lancip & tumpul)</div>
            <div>• 2 diagonal berpotongan 90°</div>
            <div>• 2 simetri lipat & 2 putar</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SymmetryVisual: React.FC = () => {
  return (
    <div className="my-5 p-5 bg-[#FAF5EE] rounded-2xl border-2 border-[#EADCC9]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-[#7F5539]" />
        <h4 className="font-bold text-slate-800 text-sm">
          Gambar Sumbu Simetri Lipat (Garis Merah Putus-Putus) & Simetri Putar
        </h4>
      </div>
      <p className="text-xs text-slate-600 mb-4">
        Sumbu simetri membagi bangun menjadi dua bagian yang tepat saling menutup satu sama lain saat dilipat.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {/* Persegi - 4 Sumbu Simetri */}
        <div className="bg-white p-3 rounded-xl border border-[#EADCC9] shadow-xs flex flex-col items-center">
          <svg width="90" height="90" viewBox="0 0 90 90" className="overflow-visible">
            <rect x="15" y="15" width="60" height="60" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
            {/* 4 lines of symmetry */}
            <line x1="45" y1="5" x2="45" y2="85" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" />
            <line x1="5" y1="45" x2="85" y2="45" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" />
            <line x1="10" y1="10" x2="80" y2="80" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" />
            <line x1="10" y1="80" x2="80" y2="10" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" />
          </svg>
          <div className="font-extrabold text-xs text-slate-800 mt-2">Persegi</div>
          <div className="text-[11px] font-bold text-red-600">4 Simetri Lipat</div>
          <div className="text-[10px] text-slate-500">4 Simetri Putar</div>
        </div>

        {/* Persegi Panjang - 2 Sumbu Simetri */}
        <div className="bg-white p-3 rounded-xl border border-[#EADCC9] shadow-xs flex flex-col items-center">
          <svg width="90" height="90" viewBox="0 0 90 90" className="overflow-visible">
            <rect x="5" y="22" width="80" height="46" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.5" />
            {/* 2 lines of symmetry (horizontal & vertical only!) */}
            <line x1="45" y1="10" x2="45" y2="80" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" />
            <line x1="0" y1="45" x2="90" y2="45" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" />
          </svg>
          <div className="font-extrabold text-xs text-slate-800 mt-2">Persegi Panjang</div>
          <div className="text-[11px] font-bold text-red-600">2 Simetri Lipat</div>
          <div className="text-[10px] text-slate-500">2 Simetri Putar</div>
        </div>

        {/* Segitiga Sama Sisi - 3 Sumbu Simetri */}
        <div className="bg-white p-3 rounded-xl border border-[#EADCC9] shadow-xs flex flex-col items-center">
          <svg width="90" height="90" viewBox="0 0 90 90" className="overflow-visible">
            <polygon points="45,15 80,75 10,75" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
            {/* 3 lines of symmetry */}
            <line x1="45" y1="5" x2="45" y2="80" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" />
            <line x1="8" y1="78" x2="68" y2="40" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" />
            <line x1="82" y1="78" x2="22" y2="40" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 3" />
          </svg>
          <div className="font-extrabold text-xs text-slate-800 mt-2">Segitiga Sama Sisi</div>
          <div className="text-[11px] font-bold text-red-600">3 Simetri Lipat</div>
          <div className="text-[10px] text-slate-500">3 Simetri Putar</div>
        </div>

        {/* Lingkaran - Tak Terhingga */}
        <div className="bg-white p-3 rounded-xl border border-[#EADCC9] shadow-xs flex flex-col items-center">
          <svg width="90" height="90" viewBox="0 0 90 90" className="overflow-visible">
            <circle cx="45" cy="45" r="32" fill="#FFE4E6" stroke="#E11D48" strokeWidth="2.5" />
            <line x1="45" y1="5" x2="45" y2="85" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="5" y1="45" x2="85" y2="45" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="17" y1="17" x2="73" y2="73" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="17" y1="73" x2="73" y2="17" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
          <div className="font-extrabold text-xs text-slate-800 mt-2">Lingkaran</div>
          <div className="text-[11px] font-bold text-red-600">Tak Terhingga</div>
          <div className="text-[10px] text-slate-500">Tak Terhingga</div>
        </div>
      </div>
    </div>
  );
};
