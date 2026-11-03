import React, { useState } from 'react';
import { Sparkles, Compass } from 'lucide-react';
import {
  PerimeterConceptVisual,
  PerimeterSquareRectVisual,
  PerimeterOtherShapesVisual,
  PerimeterCircleVisual,
  AreaTriangleVisual,
  AreaParallelogramVisual,
  AreaTrapezoidVisual,
  AreaKiteRhombusVisual,
  RegularIrregularVisual,
  ShapeComparisonVisual,
  SymmetryVisual,
} from './ShapeVisuals.tsx';

interface InteractiveVisualProps {
  type: string;
}

export const InteractiveVisual: React.FC<InteractiveVisualProps> = ({ type }) => {
  // Angle slider for protractor
  const [angle, setAngle] = useState<number>(60);
  // Fraction slider
  const [fractionDenom, setFractionDenom] = useState<number>(4);
  const [fractionNum, setFractionNum] = useState<number>(2);

  if (type === 'angle_protractor') {
    let angleType = 'Sudut Lancip (< 90°)';
    let badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
    if (angle === 90) {
      angleType = 'Sudut Siku-Siku (Tepat 90°)';
      badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    } else if (angle > 90 && angle < 180) {
      angleType = 'Sudut Tumpul (90° < Sudut < 180°)';
      badgeColor = 'bg-indigo-100 text-indigo-800 border-indigo-300';
    } else if (angle === 180) {
      angleType = 'Sudut Lurus (Tepat 180°)';
      badgeColor = 'bg-purple-100 text-purple-800 border-purple-300';
    }

    const rad = (angle * Math.PI) / 180;
    const rayLength = 95;
    const x2 = 120 + rayLength * Math.cos(-rad);
    const y2 = 120 + rayLength * Math.sin(-rad);

    return (
      <div className="my-5 p-5 bg-gradient-to-br from-indigo-50/70 to-blue-50/50 rounded-2xl border border-indigo-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600" />
            <h4 className="font-bold text-slate-800 text-sm">Eksperimen Interaktif: Busur & Besar Sudut</h4>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${badgeColor}`}>
            {angleType}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Protractor SVG Graphic */}
          <div className="relative w-64 h-36 bg-white rounded-xl shadow-xs border border-indigo-100 flex items-end justify-center pb-2 overflow-hidden">
            <svg width="240" height="130" viewBox="0 0 240 130" className="overflow-visible">
              {/* Semicircle protractor outline */}
              <path
                d="M 20 120 A 100 100 0 0 1 220 120 Z"
                fill="#f8fafc"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              {/* Angle arc highlight */}
              <path
                d={`M 120 120 L 170 120 A 50 50 0 0 0 ${120 + 50 * Math.cos(-rad)} ${120 + 50 * Math.sin(-rad)} Z`}
                fill="rgba(99, 102, 241, 0.25)"
                stroke="#6366f1"
                strokeWidth="1.5"
              />
              {/* Base line (0 degrees) */}
              <line x1="20" y1="120" x2="220" y2="120" stroke="#475569" strokeWidth="2.5" />
              {/* Stationary ray along 0° */}
              <line x1="120" y1="120" x2="215" y2="120" stroke="#0ea5e9" strokeWidth="3.5" strokeLinecap="round" />
              {/* Dynamic rotating ray */}
              <line x1="120" y1="120" x2={x2} y2={y2} stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />
              {/* Center point */}
              <circle cx="120" cy="120" r="5" fill="#4338ca" />

              {/* Tick marks for common angles */}
              {[30, 45, 60, 90, 120, 135, 150].map((deg) => {
                const rTick = (deg * Math.PI) / 180;
                const tx1 = 120 + 95 * Math.cos(-rTick);
                const ty1 = 120 + 95 * Math.sin(-rTick);
                const tx2 = 120 + 100 * Math.cos(-rTick);
                const ty2 = 120 + 100 * Math.sin(-rTick);
                return (
                  <line
                    key={deg}
                    x1={tx1}
                    y1={ty1}
                    x2={tx2}
                    y2={ty2}
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>
            <div className="absolute top-2 left-3 text-[11px] font-bold text-slate-500">
              0° sampai 180°
            </div>
            <div className="absolute top-2 right-3 font-extrabold text-indigo-700 text-lg">
              {angle}°
            </div>
          </div>

          {/* Interactive Slider */}
          <div className="flex-1 w-full space-y-3">
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Geser untuk mengubah besar sudut:</span>
              <span className="text-indigo-600 font-bold">{angle} Derajat</span>
            </div>
            <input
              type="range"
              min="10"
              max="180"
              step="5"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[30, 45, 60, 90, 120, 150, 180].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAngle(preset)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    angle === preset
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {preset}°
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'place_value') {
    return (
      <div className="my-5 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
        <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          Tabel Nilai Tempat: 74.325
        </h4>
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-xs">
            <div className="text-slate-500 font-semibold mb-1">Puluhan Ribu</div>
            <div className="text-2xl font-black text-blue-600">7</div>
            <div className="text-[11px] text-slate-600 mt-1 font-mono">70.000</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-xs">
            <div className="text-slate-500 font-semibold mb-1">Ribuan</div>
            <div className="text-2xl font-black text-indigo-600">4</div>
            <div className="text-[11px] text-slate-600 mt-1 font-mono">4.000</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-xs">
            <div className="text-slate-500 font-semibold mb-1">Ratusan</div>
            <div className="text-2xl font-black text-teal-600">3</div>
            <div className="text-[11px] text-slate-600 mt-1 font-mono">300</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-xs">
            <div className="text-slate-500 font-semibold mb-1">Puluhan</div>
            <div className="text-2xl font-black text-amber-600">2</div>
            <div className="text-[11px] text-slate-600 mt-1 font-mono">20</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-xs">
            <div className="text-slate-500 font-semibold mb-1">Satuan</div>
            <div className="text-2xl font-black text-rose-600">5</div>
            <div className="text-[11px] text-slate-600 mt-1 font-mono">5</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'million_place_value') {
    return (
      <div className="my-5 p-5 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-200">
        <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-600" />
          Bagan Nilai Tempat Bilangan Hingga 1 Juta: 852.410
        </h4>
        <div className="grid grid-cols-6 gap-2 text-center text-xs">
          <div className="bg-white p-2.5 rounded-xl border border-violet-200 shadow-xs">
            <div className="text-slate-500 font-medium text-[10px]">Ratusan Ribu</div>
            <div className="text-xl font-black text-violet-600">8</div>
            <div className="text-[10px] text-slate-500 font-mono">800.000</div>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-violet-200 shadow-xs">
            <div className="text-slate-500 font-medium text-[10px]">Puluhan Ribu</div>
            <div className="text-xl font-black text-purple-600">5</div>
            <div className="text-[10px] text-slate-500 font-mono">50.000</div>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-violet-200 shadow-xs">
            <div className="text-slate-500 font-medium text-[10px]">Ribuan</div>
            <div className="text-xl font-black text-indigo-600">2</div>
            <div className="text-[10px] text-slate-500 font-mono">2.000</div>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-violet-200 shadow-xs">
            <div className="text-slate-500 font-medium text-[10px]">Ratusan</div>
            <div className="text-xl font-black text-blue-600">4</div>
            <div className="text-[10px] text-slate-500 font-mono">400</div>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-violet-200 shadow-xs">
            <div className="text-slate-500 font-medium text-[10px]">Puluhan</div>
            <div className="text-xl font-black text-emerald-600">1</div>
            <div className="text-[10px] text-slate-500 font-mono">10</div>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-violet-200 shadow-xs">
            <div className="text-slate-500 font-medium text-[10px]">Satuan</div>
            <div className="text-xl font-black text-slate-400">0</div>
            <div className="text-[10px] text-slate-500 font-mono">0</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'factor_tree') {
    return (
      <div className="my-5 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
        <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Ilustrasi Pohon Faktor: Bilangan 24
        </h4>
        <div className="flex flex-col items-center justify-center font-bold text-slate-800 text-sm py-2">
          <div className="bg-emerald-600 text-white px-4 py-1.5 rounded-full shadow-xs">24</div>
          <div className="text-emerald-400 my-1">↙ ↘</div>
          <div className="flex items-center gap-8">
            <div className="bg-amber-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center border-2 border-amber-600 shadow-xs">2</div>
            <div className="bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-300">12</div>
          </div>
          <div className="text-emerald-400 my-1 ml-16">↙ ↘</div>
          <div className="flex items-center gap-8 ml-16">
            <div className="bg-amber-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center border-2 border-amber-600 shadow-xs">2</div>
            <div className="bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-300">6</div>
          </div>
          <div className="text-emerald-400 my-1 ml-32">↙ ↘</div>
          <div className="flex items-center gap-6 ml-32">
            <div className="bg-amber-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center border-2 border-amber-600 shadow-xs">2</div>
            <div className="bg-amber-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center border-2 border-amber-600 shadow-xs">3</div>
          </div>
        </div>
        <div className="mt-3 text-center text-xs text-emerald-900 font-semibold bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-200">
          Faktorisasi Prima 24 = 2 × 2 × 2 × 3 = <span className="font-mono text-emerald-700 font-black">2³ × 3</span>
        </div>
      </div>
    );
  }

  if (type === 'fraction_bars') {
    return (
      <div className="my-5 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
        <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          Eksplorasi Pecahan Senilai & Batang Pecahan
        </h4>
        <div className="space-y-2.5 text-xs">
          <div>
            <div className="text-slate-600 font-semibold mb-1">1 Utuh (1/1)</div>
            <div className="w-full h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white font-bold">1</div>
          </div>
          <div>
            <div className="text-slate-600 font-semibold mb-1">Pecahan 1/2 (Setengah)</div>
            <div className="grid grid-cols-2 gap-1 h-8">
              <div className="bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">1/2</div>
              <div className="bg-blue-200 rounded-lg flex items-center justify-center text-blue-800 font-bold">1/2</div>
            </div>
          </div>
          <div>
            <div className="text-slate-600 font-semibold mb-1">Pecahan 2/4 (Senilai dengan 1/2)</div>
            <div className="grid grid-cols-4 gap-1 h-8">
              <div className="bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">1/4</div>
              <div className="bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">1/4</div>
              <div className="bg-emerald-200 rounded-lg flex items-center justify-center text-emerald-800 font-bold">1/4</div>
              <div className="bg-emerald-200 rounded-lg flex items-center justify-center text-emerald-800 font-bold">1/4</div>
            </div>
          </div>
          <div>
            <div className="text-slate-600 font-semibold mb-1">Pecahan 4/8 (Senilai dengan 1/2 dan 2/4)</div>
            <div className="grid grid-cols-8 gap-0.5 h-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-purple-500 rounded-sm flex items-center justify-center text-white font-bold text-[10px]">1/8</div>
              ))}
              {[5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-purple-200 rounded-sm flex items-center justify-center text-purple-900 font-bold text-[10px]">1/8</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'data_chart') {
    return (
      <div className="my-5 p-5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200">
        <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-600" />
          Contoh Diagram Batang: Buah Favorit Kelas 5
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-16 font-semibold text-slate-700">Apel</span>
            <div className="flex-1 bg-slate-200 h-6 rounded-md overflow-hidden">
              <div className="bg-rose-500 h-full flex items-center justify-end pr-2 text-white font-bold text-xs" style={{ width: '80%' }}>
                8 siswa
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-16 font-semibold text-slate-700">Jeruk</span>
            <div className="flex-1 bg-slate-200 h-6 rounded-md overflow-hidden">
              <div className="bg-amber-500 h-full flex items-center justify-end pr-2 text-white font-bold text-xs" style={{ width: '60%' }}>
                6 siswa
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-16 font-semibold text-slate-700">Pisang</span>
            <div className="flex-1 bg-slate-200 h-6 rounded-md overflow-hidden">
              <div className="bg-yellow-500 h-full flex items-center justify-end pr-2 text-white font-bold text-xs" style={{ width: '100%' }}>
                10 siswa
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-16 font-semibold text-slate-700">Mangga</span>
            <div className="flex-1 bg-slate-200 h-6 rounded-md overflow-hidden">
              <div className="bg-emerald-500 h-full flex items-center justify-end pr-2 text-white font-bold text-xs" style={{ width: '40%' }}>
                4 siswa
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Bab 4 Visuals
  if (type === 'perimeter_concept') {
    return <PerimeterConceptVisual />;
  }
  if (type === 'perimeter_square_rect' || type === 'perimeter_shape') {
    return <PerimeterSquareRectVisual />;
  }
  if (type === 'perimeter_other_shapes') {
    return <PerimeterOtherShapesVisual />;
  }
  if (type === 'perimeter_circle') {
    return <PerimeterCircleVisual />;
  }

  // Bab 5 Visuals
  if (type === 'area_triangle' || type === 'area_shape') {
    return <AreaTriangleVisual />;
  }
  if (type === 'area_parallelogram') {
    return <AreaParallelogramVisual />;
  }
  if (type === 'area_trapezoid') {
    return <AreaTrapezoidVisual />;
  }
  if (type === 'area_kite_rhombus') {
    return <AreaKiteRhombusVisual />;
  }

  // Bab 7 Visuals
  if (type === 'regular_irregular') {
    return <RegularIrregularVisual />;
  }
  if (type === 'shape_comparison' || type === 'shape_properties') {
    return <ShapeComparisonVisual />;
  }
  if (type === 'symmetry_visual') {
    return <SymmetryVisual />;
  }

  return null;
};
