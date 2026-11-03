import React from 'react';
import { BookOpen, Award, BarChart3, Sparkles } from 'lucide-react';
import { PASTEL_MASCOT_IMG } from './common/PastelIllustration.tsx';

interface NavbarProps {
  activeTab: 'dashboard' | 'quiz' | 'analytics';
  setActiveTab: (tab: 'dashboard' | 'quiz' | 'analytics') => void;
  totalAttemptsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  totalAttemptsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADCC9] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Pastel Branding */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <img
                src={PASTEL_MASCOT_IMG}
                alt="Maskot Matematika Juara"
                className="w-12 h-12 rounded-2xl object-cover shadow-sm border-2 border-[#FDE68A] group-hover:scale-105 transition-transform bg-[#FFFBEB]"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#38BDF8] border-2 border-white flex items-center justify-center text-[10px] text-white font-black">
                5
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-[#6F4E37] tracking-tight">
                  Matematika<span className="text-[#0284C7]">Juara</span>
                </span>
                <span className="bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Kelas 5 SD
                </span>
              </div>
              <p className="text-xs text-[#8C6D58] font-medium hidden sm:block">
                Kurikulum Nasional • Nuansa Pastel Ceria 🎨
              </p>
            </div>
          </div>

          {/* Navigation Tabs with Pastel Palette */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {/* Tab 1: Biru Pastel */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
                activeTab === 'dashboard'
                  ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-md shadow-sky-100'
                  : 'bg-white text-[#52606D] hover:text-[#0284C7] hover:bg-[#E0F2FE] border-[#E2E8F0]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Dashboard & Materi</span>
            </button>

            {/* Tab 2: Hijau Pastel */}
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
                activeTab === 'quiz'
                  ? 'bg-[#16A34A] text-white border-[#16A34A] shadow-md shadow-green-100'
                  : 'bg-white text-[#52606D] hover:text-[#16A34A] hover:bg-[#DCFCE7] border-[#E2E8F0]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Latihan 10 Soal</span>
            </button>

            {/* Tab 3: Coklat & Kuning Pastel */}
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
                activeTab === 'analytics'
                  ? 'bg-[#7F5539] text-white border-[#7F5539] shadow-md shadow-amber-100'
                  : 'bg-white text-[#52606D] hover:text-[#7F5539] hover:bg-[#F0E5D4] border-[#E2E8F0]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Grafik & Analisis</span>
              {totalAttemptsCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  activeTab === 'analytics' ? 'bg-[#583925] text-white' : 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                }`}>
                  {totalAttemptsCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
