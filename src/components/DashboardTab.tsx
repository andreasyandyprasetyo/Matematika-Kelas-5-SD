import React, { useState } from 'react';
import { CHAPTERS_DATA } from '../data/chaptersData.ts';
import { ChapterData, Semester } from '../types/math.ts';
import { PASTEL_THEMES, PastelColor } from '../utils/pastelTheme.ts';
import { ChapterIllustration, PASTEL_BANNER_IMG, PASTEL_MASCOT_IMG } from './common/PastelIllustration.tsx';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  Trophy,
  GraduationCap,
  Palette,
} from 'lucide-react';

interface DashboardTabProps {
  onSelectChapter: (chapterId: string) => void;
  onGoToQuizTabWithChapter: (chapterId: string) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  onSelectChapter,
  onGoToQuizTabWithChapter,
}) => {
  const [semesterFilter, setSemesterFilter] = useState<'all' | Semester>('all');
  const [pastelFilter, setPastelFilter] = useState<'all' | PastelColor>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredChapters = CHAPTERS_DATA.filter((chapter) => {
    const matchesSemester = semesterFilter === 'all' || chapter.semester === semesterFilter;
    const matchesPastel = pastelFilter === 'all' || chapter.themePastel === pastelFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.subtopics.some((st) => st.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSemester && matchesPastel && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Welcome Banner with Pastel Illustration Image */}
      <div className="relative overflow-hidden rounded-3xl bg-[#FAF5EE] border-2 border-[#EADCC9] shadow-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between p-6 sm:p-8 gap-6">
          <div className="flex-1 space-y-3 z-10">
            <div className="inline-flex items-center gap-2 bg-[#DCFCE7] border border-[#BBF7D0] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#166534]">
              <GraduationCap className="w-4 h-4 text-[#16A34A]" />
              <span>Kurikulum Nasional SD Kelas 5 • Nuansa Pastel</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#6F4E37]">
              Selamat Datang di Dunia Matematika Pastel! 🎨✨
            </h1>

            <p className="text-[#7F5539] text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
              Ayo jelajahi 9 bab materi matematika dengan warna-warni pastel yang lembut dan menyenangkan: <span className="font-bold text-[#BE123C]">Merah</span>, <span className="font-bold text-[#B45309]">Kuning</span>, <span className="font-bold text-[#15803D]">Hijau</span>, <span className="font-bold text-[#0369A1]">Biru</span>, dan <span className="font-bold text-[#6F4E37]">Coklat</span>!
            </p>

            {/* Pastel Feature Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5 bg-[#E0F2FE] text-[#075985] px-3 py-1 rounded-xl border border-[#BAE6FD]">
                <CheckCircle2 className="w-4 h-4 text-[#0284C7]" /> 9 Bab Lengkap
              </span>
              <span className="flex items-center gap-1.5 bg-[#FEF3C7] text-[#92400E] px-3 py-1 rounded-xl border border-[#FDE68A]">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" /> Konfeti Apresiasi
              </span>
              <span className="flex items-center gap-1.5 bg-[#FFE4E6] text-[#9F1239] px-3 py-1 rounded-xl border border-[#FECDD3]">
                <Trophy className="w-4 h-4 text-[#F43F5E]" /> Pembahasan Lengkap
              </span>
            </div>
          </div>

          {/* Banner Illustration */}
          <div className="w-full lg:w-1/3 max-w-md shrink-0">
            <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-md">
              <img
                src={PASTEL_BANNER_IMG}
                alt="Ilustrasi Matematika Anak Pastel"
                className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#6F4E37] shadow-xs">
                Belajar Seru & Asyik
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar with Pastel Options */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#EADCC9] shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Semester Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-[#FAF5EE] p-1.5 rounded-2xl border border-[#EADCC9]">
            <button
              onClick={() => setSemesterFilter('all')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                semesterFilter === 'all'
                  ? 'bg-white text-[#6F4E37] shadow-xs border border-[#EADCC9]'
                  : 'text-[#8C6D58] hover:text-[#6F4E37]'
              }`}
            >
              Semua Bab (9)
            </button>
            <button
              onClick={() => setSemesterFilter(1)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                semesterFilter === 1
                  ? 'bg-[#0284C7] text-white shadow-xs'
                  : 'text-[#8C6D58] hover:text-[#0284C7]'
              }`}
            >
              Semester 1 (Bab 1 - 5)
            </button>
            <button
              onClick={() => setSemesterFilter(2)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                semesterFilter === 2
                  ? 'bg-[#7F5539] text-white shadow-xs'
                  : 'text-[#8C6D58] hover:text-[#7F5539]'
              }`}
            >
              Semester 2 (Bab 6 - 9)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari materi bab (misal: FPB, Pecahan, Sudut, Keliling)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#EADCC9] bg-[#FAF5EE]/60 text-xs sm:text-sm font-medium focus:outline-hidden focus:bg-white focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100 transition-all"
            />
          </div>
        </div>

        {/* Pastel Color Palette Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F0E5D4]">
          <span className="text-xs font-bold text-[#8C6D58] flex items-center gap-1.5 mr-1">
            <Palette className="w-3.5 h-3.5" />
            <span>Pilihan Warna Pastel:</span>
          </span>
          <button
            onClick={() => setPastelFilter('all')}
            className={`text-xs px-2.5 py-1 rounded-xl font-bold transition-all ${
              pastelFilter === 'all'
                ? 'bg-[#6F4E37] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua Warna
          </button>
          <button
            onClick={() => setPastelFilter('biru')}
            className={`text-xs px-2.5 py-1 rounded-xl font-bold border transition-all ${
              pastelFilter === 'biru'
                ? 'bg-[#0284C7] text-white border-[#0284C7]'
                : 'bg-[#F0F9FF] text-[#075985] border-[#BAE6FD] hover:bg-[#E0F2FE]'
            }`}
          >
            🔵 Biru Pastel
          </button>
          <button
            onClick={() => setPastelFilter('hijau')}
            className={`text-xs px-2.5 py-1 rounded-xl font-bold border transition-all ${
              pastelFilter === 'hijau'
                ? 'bg-[#16A34A] text-white border-[#16A34A]'
                : 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0] hover:bg-[#DCFCE7]'
            }`}
          >
            🟢 Hijau Pastel
          </button>
          <button
            onClick={() => setPastelFilter('kuning')}
            className={`text-xs px-2.5 py-1 rounded-xl font-bold border transition-all ${
              pastelFilter === 'kuning'
                ? 'bg-[#F59E0B] text-white border-[#F59E0B]'
                : 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A] hover:bg-[#FEF3C7]'
            }`}
          >
            🟡 Kuning Pastel
          </button>
          <button
            onClick={() => setPastelFilter('merah')}
            className={`text-xs px-2.5 py-1 rounded-xl font-bold border transition-all ${
              pastelFilter === 'merah'
                ? 'bg-[#F43F5E] text-white border-[#F43F5E]'
                : 'bg-[#FFF1F2] text-[#9F1239] border-[#FECDD3] hover:bg-[#FFE4E6]'
            }`}
          >
            🔴 Merah Pastel
          </button>
          <button
            onClick={() => setPastelFilter('coklat')}
            className={`text-xs px-2.5 py-1 rounded-xl font-bold border transition-all ${
              pastelFilter === 'coklat'
                ? 'bg-[#7F5539] text-white border-[#7F5539]'
                : 'bg-[#FAF5EE] text-[#6F4E37] border-[#EADCC9] hover:bg-[#F0E5D4]'
            }`}
          >
            🟤 Coklat Pastel
          </button>
        </div>
      </div>

      {/* Chapters Grid with Pastel Theme & Illustrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChapters.map((chapter: ChapterData) => {
          const pastel = PASTEL_THEMES[chapter.themePastel];

          return (
            <div
              key={chapter.id}
              className={`group ${pastel.cardBg} rounded-3xl border-2 ${pastel.cardBorder} hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden shadow-xs`}
            >
              {/* Top Accent Strip */}
              <div className={`h-3 w-full bg-gradient-to-r ${pastel.headerBg}`} />

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Badges & Cute Chapter Illustration */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-full border ${pastel.badgeBg} ${pastel.badgeText} ${pastel.cardBorder}`}>
                          Semester {chapter.semester}
                        </span>
                        <span className="text-xs font-black text-slate-500">
                          Bab {chapter.chapterNumber}
                        </span>
                      </div>
                      <span className="inline-block text-[10px] font-bold text-slate-400">
                        Warna: {pastel.name}
                      </span>
                    </div>

                    {/* Cute Math Vector Illustration */}
                    <div className="shrink-0 p-1 bg-white/80 rounded-2xl shadow-xs border border-white">
                      <ChapterIllustration
                        chapterNumber={chapter.chapterNumber}
                        pastelColor={chapter.themePastel}
                      />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    onClick={() => onSelectChapter(chapter.id)}
                    className="text-lg font-black text-slate-800 hover:text-slate-900 transition-colors cursor-pointer mb-1 line-clamp-1"
                  >
                    {chapter.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold mb-4 line-clamp-2">
                    {chapter.tagline}
                  </p>

                  {/* Subtopics Checklist Preview */}
                  <div className="space-y-1.5 mb-6 bg-white/70 p-3.5 rounded-2xl border border-white shadow-xs">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Cakupan Materi Pembelajaran:
                    </div>
                    {chapter.subtopics.slice(0, 3).map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="text-xs text-slate-700 flex items-start gap-1.5 font-medium line-clamp-1"
                      >
                        <span className={`${pastel.accentText} font-black shrink-0`}>✓</span>
                        <span>{sub}</span>
                      </div>
                    ))}
                    {chapter.subtopics.length > 3 && (
                      <div className={`text-[11px] font-bold ${pastel.accentText} pt-0.5`}>
                        +{chapter.subtopics.length - 3} materi lainnya...
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-3 border-t border-slate-200/60">
                  <button
                    onClick={() => onSelectChapter(chapter.id)}
                    className={`w-full ${pastel.buttonBg} ${pastel.buttonHover} ${pastel.buttonText} font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all group-hover:shadow-md`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Buka Materi & Kuis</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onGoToQuizTabWithChapter(chapter.id)}
                    className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs py-2 px-3 rounded-xl transition-all border border-slate-200 flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>Latihan 10 Soal Bab Ini</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-16 bg-[#FAF5EE] rounded-3xl border border-[#EADCC9] p-8">
          <BookOpen className="w-12 h-12 text-[#8C6D58] mx-auto mb-3 opacity-50" />
          <h3 className="text-base font-bold text-[#6F4E37]">Materi Tidak Ditemukan</h3>
          <p className="text-xs text-[#8C6D58] mt-1">
            Coba gunakan kata kunci lain atau pilih Semua Bab dan Semua Warna.
          </p>
        </div>
      )}
    </div>
  );
};
