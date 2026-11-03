import React from 'react';
import { QuizAttempt } from '../types/math.ts';
import { calculateRecommendations, clearAttempts, seedSampleAttempts } from '../utils/storage.ts';
import { CHAPTERS_DATA } from '../data/chaptersData.ts';
import { PASTEL_THEMES, PastelColor } from '../utils/pastelTheme.ts';
import { ChapterIllustration, PASTEL_MASCOT_IMG, PASTEL_TROPHY_IMG } from './common/PastelIllustration.tsx';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Award,
  Sparkles,
  ArrowRight,
  Database,
  Trash2,
} from 'lucide-react';

interface AnalyticsTabProps {
  attempts: QuizAttempt[];
  onGoToChapter: (chapterId: string) => void;
  onGoToQuizForChapter: (chapterId: string) => void;
  onRefreshData: () => void;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  attempts,
  onGoToChapter,
  onGoToQuizForChapter,
  onRefreshData,
}) => {
  const recommendations = calculateRecommendations(attempts);

  // Overall Stats
  const totalAttempts = attempts.length;
  const avgScore = totalAttempts > 0
    ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts)
    : 0;

  const chaptersWithAttempts = recommendations.filter((r) => r.attemptsCount > 0);
  const chaptersMastered = chaptersWithAttempts.filter((r) => r.averageScore >= 80).length;
  const chaptersNeedReview = recommendations.filter((r) => r.status === 'perlu_perhatian');

  const handleSeed = () => {
    seedSampleAttempts();
    onRefreshData();
  };

  const handleClear = () => {
    if (window.confirm('Apakah kamu yakin ingin mengosongkan riwayat latihan?')) {
      clearAttempts();
      onRefreshData();
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Analytics Banner with Mascot Image and Pastel Styling */}
      <div className="relative overflow-hidden rounded-3xl bg-[#FAF5EE] border-2 border-[#EADCC9] p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={PASTEL_MASCOT_IMG}
              alt="Maskot Analisis Belajar"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-xs border-2 border-[#FDE68A] bg-white p-1 shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Laporan & Evaluasi Hasil Belajar Siswa</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#6F4E37]">
                Grafik Perkembangan Nilai & Rekomendasi
              </h1>
              <p className="text-[#8C6D58] text-xs sm:text-sm mt-1 max-w-xl font-medium">
                Dianalisis secara otomatis dengan paduan palet warna pastel (merah, kuning, hijau, biru, coklat) untuk kenyamanan belajar.
              </p>
            </div>
          </div>

          {/* Quick Demo Seeder / Reset */}
          <div className="flex flex-wrap items-center gap-2">
            {totalAttempts === 0 && (
              <button
                onClick={handleSeed}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
              >
                <Database className="w-4 h-4" />
                <span>Muat Data Contoh Latihan</span>
              </button>
            )}
            {totalAttempts > 0 && (
              <button
                onClick={handleClear}
                className="bg-white hover:bg-rose-50 text-[#9F1239] text-xs font-bold px-3 py-2 rounded-xl border border-[#FECDD3] flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Riwayat</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards in Pastel Tones */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Rata-Rata Nilai (Biru Pastel) */}
        <div className="bg-[#F0F9FF] p-5 rounded-2xl border-2 border-[#BAE6FD] shadow-2xs">
          <div className="text-xs font-bold text-[#075985] uppercase tracking-wider mb-1">
            Rata-Rata Nilai
          </div>
          <div className="text-3xl font-black text-[#0284C7]">
            {totalAttempts > 0 ? avgScore : '-'}
            <span className="text-sm font-semibold text-[#075985]/60">/100</span>
          </div>
          <div className="text-[11px] font-bold text-[#0369A1] mt-1">
            {avgScore >= 80 ? '🌟 Sangat Memuaskan' : avgScore >= 65 ? '👍 Cukup Bagus' : totalAttempts > 0 ? '⚠️ Butuh Peningkatan' : 'Belum ada latihan'}
          </div>
        </div>

        {/* Total Latihan (Coklat Pastel) */}
        <div className="bg-[#FAF5EE] p-5 rounded-2xl border-2 border-[#EADCC9] shadow-2xs">
          <div className="text-xs font-bold text-[#6F4E37] uppercase tracking-wider mb-1">
            Total Latihan Selesai
          </div>
          <div className="text-3xl font-black text-[#7F5539]">
            {totalAttempts}
            <span className="text-sm font-semibold text-[#8C6D58]"> sesi</span>
          </div>
          <div className="text-[11px] font-semibold text-[#8C6D58] mt-1">
            Dari seluruh bab semester 1 & 2
          </div>
        </div>

        {/* Bab Dikuasai (Hijau Pastel) */}
        <div className="bg-[#F0FDF4] p-5 rounded-2xl border-2 border-[#BBF7D0] shadow-2xs">
          <div className="text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">
            Bab Sangat Dikuasai
          </div>
          <div className="text-3xl font-black text-[#16A34A]">
            {chaptersMastered}
            <span className="text-sm font-semibold text-[#166534]/60">/9 Bab</span>
          </div>
          <div className="text-[11px] font-bold text-[#15803D] mt-1">
            Nilai rata-rata ≥ 80
          </div>
        </div>

        {/* Perlu Belajar Ulang (Merah Pastel) */}
        <div className="bg-[#FFF1F2] p-5 rounded-2xl border-2 border-[#FECDD3] shadow-2xs">
          <div className="text-xs font-bold text-[#9F1239] uppercase tracking-wider mb-1">
            Perlu Belajar Ulang
          </div>
          <div className="text-3xl font-black text-[#F43F5E]">
            {chaptersNeedReview.length}
            <span className="text-sm font-semibold text-[#9F1239]/60"> Bab</span>
          </div>
          <div className="text-[11px] font-bold text-[#BE123C] mt-1">
            Nilai rata-rata &lt; 70
          </div>
        </div>
      </div>

      {/* 1. GRAFIK PERKEMBANGAN NILAI PER BAB */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADCC9] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-xl font-black text-[#6F4E37] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#0284C7]" />
              Grafik Perkembangan Nilai per Bab
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Tingkat penguasaan materi dari Bab 1 hingga Bab 9 dengan indikator warna pastel cerah.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-[#166534] bg-[#DCFCE7] px-2.5 py-1 rounded-lg border border-[#BBF7D0]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] inline-block" /> ≥80 Dikuasai
            </span>
            <span className="flex items-center gap-1.5 text-[#92400E] bg-[#FEF3C7] px-2.5 py-1 rounded-lg border border-[#FDE68A]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] inline-block" /> 70-79 Cukup
            </span>
            <span className="flex items-center gap-1.5 text-[#9F1239] bg-[#FFE4E6] px-2.5 py-1 rounded-lg border border-[#FECDD3]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E] inline-block" /> &lt;70 Perlu Ulang
            </span>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="space-y-4">
          {recommendations.map((rec) => {
            const chData = CHAPTERS_DATA.find((c) => c.id === rec.chapterId);
            const pastel = chData ? PASTEL_THEMES[chData.themePastel] : PASTEL_THEMES['biru'];

            let barBg = 'bg-slate-200';
            let textColor = 'text-slate-400';
            let statusText = 'Belum Dikerjakan';

            if (rec.attemptsCount > 0) {
              if (rec.averageScore >= 80) {
                barBg = 'bg-[#4ADE80]';
                textColor = 'text-[#166534] font-black';
                statusText = `${rec.averageScore} / 100`;
              } else if (rec.averageScore >= 70) {
                barBg = 'bg-[#FBBF24]';
                textColor = 'text-[#92400E] font-black';
                statusText = `${rec.averageScore} / 100`;
              } else {
                barBg = 'bg-[#FB7185]';
                textColor = 'text-[#9F1239] font-black';
                statusText = `${rec.averageScore} / 100`;
              }
            }

            return (
              <div key={rec.chapterId} className="group">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-md ${pastel.badgeBg} ${pastel.badgeText} text-xs font-bold flex items-center justify-center shrink-0 border ${pastel.cardBorder}`}>
                      {rec.chapterNumber}
                    </span>
                    <span className="text-slate-800 font-bold">{rec.chapterTitle}</span>
                    <span className="text-[10px] text-slate-400 hidden sm:inline">
                      (Sem {rec.semester} • {pastel.name})
                    </span>
                  </div>
                  <span className={`text-xs ${textColor}`}>{statusText}</span>
                </div>

                <div className="w-full bg-[#FAF5EE] border border-[#EADCC9] h-4 rounded-full overflow-hidden flex items-center p-0.5">
                  <div
                    className={`${barBg} h-full rounded-full transition-all duration-500`}
                    style={{ width: rec.attemptsCount > 0 ? `${rec.averageScore}%` : '3%' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. REKOMENDASI MATERI YANG PERLU DIPELAJARI ULANG */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADCC9] shadow-xs">
        <div className="flex items-center gap-2 pb-5 border-b border-slate-100 mb-6">
          <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
          <div>
            <h2 className="text-xl font-black text-[#6F4E37]">
              Rekomendasi Materi yang Perlu Dipelajari Ulang
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Daftar prioritas belajar yang disesuaikan secara khusus berdasarkan bab yang masih memiliki nilai rendah atau belum dicoba.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => {
            const chData = CHAPTERS_DATA.find((c) => c.id === rec.chapterId);
            const pastel = chData ? PASTEL_THEMES[chData.themePastel] : PASTEL_THEMES['biru'];
            const isNeedReview = rec.status === 'perlu_perhatian';
            const isUnattempted = rec.status === 'belum_dikerjakan';

            let cardBorder = `${pastel.cardBorder} ${pastel.cardBg}`;
            let badgeBg = `${pastel.badgeBg} ${pastel.badgeText}`;
            let badgeLabel = 'Belum Ada Data';

            if (isNeedReview) {
              cardBorder = 'border-[#FECDD3] bg-[#FFF1F2]';
              badgeBg = 'bg-[#FFE4E6] text-[#9F1239] border border-[#FECDD3]';
              badgeLabel = 'Perlu Belajar Ulang';
            } else if (isUnattempted) {
              cardBorder = 'border-[#FDE68A] bg-[#FFFBEB]';
              badgeBg = 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]';
              badgeLabel = 'Belum Dikerjakan';
            } else if (rec.status === 'cukup') {
              cardBorder = 'border-[#BAE6FD] bg-[#F0F9FF]';
              badgeBg = 'bg-[#E0F2FE] text-[#075985]';
              badgeLabel = 'Cukup Baik';
            } else {
              cardBorder = 'border-[#BBF7D0] bg-[#F0FDF4]';
              badgeBg = 'bg-[#DCFCE7] text-[#166534]';
              badgeLabel = 'Sudah Menguasai';
            }

            return (
              <div
                key={rec.chapterId}
                className={`p-5 rounded-3xl border-2 flex flex-col justify-between transition-all ${cardBorder} shadow-2xs`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-black text-[#6F4E37]">
                      Bab {rec.chapterNumber} (Semester {rec.semester})
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${badgeBg}`}>
                      {badgeLabel}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="font-black text-slate-800 text-base">
                      {rec.chapterTitle}
                    </h3>
                    <div className="shrink-0 p-1 bg-white/80 rounded-xl shadow-2xs">
                      <ChapterIllustration
                        chapterNumber={rec.chapterNumber}
                        pastelColor={chData ? chData.themePastel : 'biru'}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {rec.advice}
                  </p>

                  {/* Suggested Topics list */}
                  <div className="space-y-1 mb-4">
                    {rec.suggestedTopics.map((top, tIdx) => (
                      <div key={tIdx} className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                        <Sparkles className="w-3 h-3 text-[#F59E0B] shrink-0" />
                        <span>{top}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions: Pelajari Ulang or Tes */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-200/60">
                  <button
                    onClick={() => onGoToChapter(rec.chapterId)}
                    className="flex-1 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs py-2 px-3 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Pelajari Materi Bab</span>
                  </button>

                  <button
                    onClick={() => onGoToQuizForChapter(rec.chapterId)}
                    className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1 transition-all"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Uji 10 Soal</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. RIWAYAT LATIHAN TERAKHIR */}
      {attempts.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADCC9] shadow-xs">
          <h3 className="text-lg font-black text-[#6F4E37] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F59E0B]" />
            Riwayat Seluruh Sesi Latihan Siswa
          </h3>

          <div className="divide-y divide-slate-100 overflow-hidden">
            {attempts.map((att) => {
              const dateStr = new Date(att.timestamp).toLocaleString('id-ID', {
                dateStyle: 'medium',
                timeStyle: 'short',
              });

              return (
                <div
                  key={att.id}
                  className="py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm"
                >
                  <div>
                    <span className="font-extrabold text-slate-800">
                      Bab {att.chapterNumber}: {att.chapterTitle}
                    </span>
                    <div className="text-[11px] text-slate-400 mt-0.5">{dateStr}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-600">
                      {att.correctCount}/{att.totalQuestions} Benar
                    </span>
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-full ${
                        att.score >= 80
                          ? 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]'
                          : att.score >= 70
                          ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                          : 'bg-[#FFE4E6] text-[#9F1239] border border-[#FECDD3]'
                      }`}
                    >
                      Nilai {att.score}
                    </span>
                    <button
                      onClick={() => onGoToQuizForChapter(att.chapterId)}
                      className="text-xs font-bold text-[#0284C7] hover:text-[#0369A1] flex items-center gap-1"
                    >
                      <span>Coba Lagi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
