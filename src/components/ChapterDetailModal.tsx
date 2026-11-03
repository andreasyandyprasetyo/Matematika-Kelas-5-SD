import React, { useState } from 'react';
import { ChapterData } from '../types/math.ts';
import { InteractiveVisual } from './visuals/InteractiveVisual.tsx';
import { checkFillInAnswer } from '../utils/evaluator.ts';
import { fireCelebrationConfetti } from '../utils/confetti.ts';
import { PASTEL_THEMES } from '../utils/pastelTheme.ts';
import { ChapterIllustration, PASTEL_MASCOT_IMG } from './common/PastelIllustration.tsx';
import { ShapeExplanationFigure } from './common/ShapeExplanationFigure.tsx';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Trophy,
  Send,
  RotateCcw,
  Lightbulb,
  Check,
} from 'lucide-react';

interface ChapterDetailModalProps {
  chapter: ChapterData;
  onBack: () => void;
  onGoToQuizTab?: () => void;
}

export const ChapterDetailModal: React.FC<ChapterDetailModalProps> = ({
  chapter,
  onBack,
  onGoToQuizTab,
}) => {
  // Navigation within chapter: 'materi' | 'kuis_cepat' | 'uji_akhir'
  const [activeSection, setActiveSection] = useState<'materi' | 'kuis_cepat' | 'uji_akhir'>('materi');

  // State for Quick Quiz (3 Soal PG)
  const [quickQuizAnswers, setQuickQuizAnswers] = useState<Record<string, number | null>>({});

  // State for Chapter End MC (5 Soal PG)
  const [mcAnswers, setMcAnswers] = useState<Record<string, number | null>>({});

  // State for Chapter End Fill-in (5 Soal Isian)
  const [fillInputs, setFillInputs] = useState<Record<string, string>>({});
  const [fillSubmitted, setFillSubmitted] = useState<Record<string, boolean>>({});
  const [fillIsCorrect, setFillIsCorrect] = useState<Record<string, boolean>>({});

  // Handler for Quick Quiz (3 Soal PG)
  const handleQuickQuizSelect = (questionId: string, optionIdx: number, correctIdx: number) => {
    setQuickQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    if (optionIdx === correctIdx) {
      fireCelebrationConfetti();
    }
  };

  // Handler for Chapter End MC (5 Soal PG)
  const handleMcSelect = (questionId: string, optionIdx: number, correctIdx: number) => {
    setMcAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    if (optionIdx === correctIdx) {
      fireCelebrationConfetti();
    }
  };

  // Handler for "Serahkan Jawaban" per Isian Singkat
  const handleSubmitFill = (questionId: string, acceptable: string[]) => {
    const rawVal = fillInputs[questionId] || '';
    if (!rawVal.trim()) return;

    const isCorrect = checkFillInAnswer(rawVal, acceptable);
    setFillSubmitted((prev) => ({ ...prev, [questionId]: true }));
    setFillIsCorrect((prev) => ({ ...prev, [questionId]: isCorrect }));

    if (isCorrect) {
      fireCelebrationConfetti();
    }
  };

  // Reset helpers
  const handleResetQuickQuiz = () => setQuickQuizAnswers({});
  const handleResetExam = () => {
    setMcAnswers({});
    setFillInputs({});
    setFillSubmitted({});
    setFillIsCorrect({});
  };

  const pastel = PASTEL_THEMES[chapter.themePastel];

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-20">
      {/* Chapter Top Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#EADCC9] shadow-xs sticky top-20 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-[#6F4E37] hover:text-[#0284C7] bg-[#FAF5EE] hover:bg-[#E0F2FE] border border-[#EADCC9] px-3.5 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </button>

          {/* Sub Navigation */}
          <div className="flex items-center bg-[#FAF5EE] border border-[#EADCC9] p-1 rounded-2xl">
            <button
              onClick={() => setActiveSection('materi')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeSection === 'materi'
                  ? 'bg-white text-[#6F4E37] shadow-xs border border-[#EADCC9]'
                  : 'text-[#8C6D58] hover:text-[#6F4E37]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>1. Materi Pembelajaran</span>
            </button>
            <button
              onClick={() => setActiveSection('kuis_cepat')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeSection === 'kuis_cepat'
                  ? 'bg-white text-[#6F4E37] shadow-xs border border-[#EADCC9]'
                  : 'text-[#8C6D58] hover:text-[#6F4E37]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>2. Kuis Cepat (3 Soal)</span>
            </button>
            <button
              onClick={() => setActiveSection('uji_akhir')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeSection === 'uji_akhir'
                  ? 'bg-white text-[#6F4E37] shadow-xs border border-[#EADCC9]'
                  : 'text-[#8C6D58] hover:text-[#6F4E37]'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>3. Uji Akhir Bab (5 PG + 5 Isian)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        {/* Chapter Header Banner with Pastel Theme & Illustrations */}
        <div className={`rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden mb-8 border-2 ${pastel.cardBorder} ${pastel.cardBg}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-black px-3 py-1 rounded-full border ${pastel.badgeBg} ${pastel.badgeText} ${pastel.cardBorder} uppercase tracking-wider`}>
                  Semester {chapter.semester}
                </span>
                <span className="bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-xs font-black px-3 py-1 rounded-full">
                  Bab {chapter.chapterNumber}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Tema: {pastel.name}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-800">
                {chapter.title}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-medium">
                {chapter.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                {chapter.subtopics.map((sub, idx) => (
                  <span
                    key={idx}
                    className="bg-white/80 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1 rounded-xl shadow-2xs"
                  >
                    ✓ {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Illustration on Right Side */}
            <div className="shrink-0 flex items-center gap-3 bg-white p-3 rounded-3xl border border-white shadow-sm">
              <img
                src={PASTEL_MASCOT_IMG}
                alt="Maskot"
                className="w-16 h-16 rounded-2xl object-cover border border-[#FDE68A]"
              />
              <ChapterIllustration
                chapterNumber={chapter.chapterNumber}
                pastelColor={chapter.themePastel}
              />
            </div>
          </div>
        </div>

        {/* ================= SECTION 1: MATERI PEMBELAJARAN ================= */}
        {activeSection === 'materi' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                    Materi Pembelajaran Lengkap
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Baca dan pahami materi di bawah ini dengan santai sebelum menjawab soal kuis!
                  </p>
                </div>
              </div>

              {/* Sections list */}
              <div className="space-y-8">
                {chapter.sections.map((sec, idx) => (
                  <div key={idx} className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-3 text-indigo-900">
                      {sec.title}
                    </h3>

                    {/* Explanatory text */}
                    <div className="space-y-2 text-slate-700 text-sm sm:text-base leading-relaxed">
                      {sec.content.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>

                    {/* Optional Formula Box */}
                    {sec.formula && (
                      <div className="my-4 bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-r-xl">
                        <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
                          📐 Rumus Penting:
                        </div>
                        <div className="font-mono font-bold text-indigo-900 text-sm sm:text-base">
                          {sec.formula}
                        </div>
                      </div>
                    )}

                    {/* Optional Tips Box */}
                    {sec.tips && (
                      <div className="my-4 bg-amber-50 border border-amber-200 p-3.5 rounded-xl flex items-start gap-2.5 text-xs sm:text-sm text-amber-900">
                        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Tips Cepat:</strong> {sec.tips}
                        </div>
                      </div>
                    )}

                    {/* Optional Interactive Visual Tool */}
                    {sec.visualType && <InteractiveVisual type={sec.visualType} />}

                    {/* Examples */}
                    {sec.examples && sec.examples.length > 0 && (
                      <div className="mt-5 space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Contoh Soal & Cara Mengerjakan:
                        </h4>
                        {sec.examples.map((ex, exIdx) => (
                          <div
                            key={exIdx}
                            className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="font-bold text-slate-800 text-sm sm:text-base">
                                Soal: {ex.question}
                              </div>
                              <ShapeExplanationFigure text={ex.question + ' ' + ex.answer} />
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                              <span className="text-xs font-bold text-indigo-700">Langkah Penyelesaian:</span>
                              {ex.steps.map((st, sIdx) => (
                                <div key={sIdx} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2">
                                  <span className="text-indigo-500">•</span>
                                  <span>{st}</span>
                                </div>
                              ))}
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-emerald-700 flex items-center gap-1.5">
                              <Check className="w-4 h-4 text-emerald-600" />
                              Jawaban: {ex.answer}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Next step CTA */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-slate-600 font-medium">
                  Sudah membaca materi di atas? Ayo uji pemahamanmu dengan 3 soal kuis singkat!
                </p>
                <button
                  onClick={() => setActiveSection('kuis_cepat')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-indigo-200 flex items-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Lanjut ke Kuis Cepat (3 Soal)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= SECTION 2: KUIS CEPAT PEMAHAMAN (3 SOAL PG) ================= */}
        {activeSection === 'kuis_cepat' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Kuis Cepat Pemahaman Materi
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                    3 Soal Pilihan Ganda Pemahaman
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Bila jawabanmu benar akan muncul konfeti apresiasi! Bila salah, langsung pelajari pembahasannya.
                  </p>
                </div>
                <button
                  onClick={handleResetQuickQuiz}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Kuis</span>
                </button>
              </div>

              {/* 3 Questions */}
              <div className="space-y-8">
                {chapter.quickQuiz.map((q, qIdx) => {
                  const selected = quickQuizAnswers[q.id];
                  const hasAnswered = selected !== undefined && selected !== null;
                  const isCorrect = selected === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 sm:p-6 rounded-2xl border-2 transition-all ${
                        !hasAnswered
                          ? 'border-slate-200 bg-white'
                          : isCorrect
                          ? 'border-emerald-300 bg-emerald-50/40'
                          : 'border-rose-300 bg-rose-50/40'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center justify-center shrink-0 text-sm shadow-xs">
                          {qIdx + 1}
                        </span>
                        <div className="font-bold text-slate-800 text-base sm:text-lg">
                          {q.question}
                        </div>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selected === optIdx;
                          const isThisCorrect = optIdx === q.correctIndex;

                          let btnStyle = 'bg-slate-50 border-slate-200 hover:bg-indigo-50/60 hover:border-indigo-300 text-slate-800';
                          if (hasAnswered) {
                            if (isThisCorrect) {
                              btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                            } else if (isOptionSelected && !isThisCorrect) {
                              btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 line-through';
                            } else {
                              btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleQuickQuizSelect(q.id, optIdx, q.correctIndex)}
                              disabled={hasAnswered}
                              className={`p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-6 h-6 rounded-full bg-white/80 border border-slate-300 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                              {hasAnswered && isThisCorrect && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                              )}
                              {hasAnswered && isOptionSelected && !isThisCorrect && (
                                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback & Pembahasan */}
                      {hasAnswered && (
                        <div className="mt-4 pt-4 border-t border-slate-200/60">
                          {isCorrect ? (
                            <div className="bg-emerald-100 border border-emerald-300 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-emerald-900 font-bold text-sm">
                              <div className="flex items-start gap-3">
                                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 animate-bounce mt-0.5" />
                                <div>
                                  <span>🎉 Luar Biasa! Jawabanmu Benar!</span>
                                  <p className="text-xs font-normal text-emerald-800 mt-0.5">
                                    {q.explanation}
                                  </p>
                                </div>
                              </div>
                              <ShapeExplanationFigure text={q.question + ' ' + q.explanation} />
                            </div>
                          ) : (
                            <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl space-y-2">
                              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                                <span>Jawabanmu belum tepat. Jawaban yang benar adalah {String.fromCharCode(65 + q.correctIndex)}.</span>
                              </div>
                              <div className="bg-white p-3 rounded-lg border border-rose-100 text-xs sm:text-sm text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                  <span className="font-bold text-indigo-700">💡 Pembahasan Soal: </span>
                                  {q.explanation}
                                </div>
                                <ShapeExplanationFigure text={q.question + ' ' + q.explanation} />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom CTA to Uji Akhir Bab */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setActiveSection('materi')}
                  className="text-sm font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali ke Materi</span>
                </button>
                <button
                  onClick={() => setActiveSection('uji_akhir')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-indigo-200 flex items-center gap-2 transition-all"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Lanjut ke Uji Akhir Bab (5 PG + 5 Isian)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= SECTION 3: UJI AKHIR BAB (5 PG & 5 ISIAN SINGKAT) ================= */}
        {activeSection === 'uji_akhir' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-800 text-xs font-extrabold px-3 py-1 rounded-full mb-2">
                    <Trophy className="w-3.5 h-3.5" />
                    Uji Kompetensi Akhir Bab
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                    5 Soal Pilihan Ganda & 5 Soal Isian Singkat
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Pada soal isian, ketik angka jawabanmu lalu klik tombol <span className="font-bold text-indigo-600">"Serahkan Jawaban"</span> pada masing-masing nomor!
                  </p>
                </div>
                <button
                  onClick={handleResetExam}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Jawaban Uji Bab</span>
                </button>
              </div>

              {/* PART A: 5 SOAL PILIHAN GANDA */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4 bg-indigo-50/70 p-3 rounded-xl border border-indigo-200">
                  <span className="font-extrabold text-indigo-900 text-sm">
                    Bagian A: 5 Soal Pilihan Ganda
                  </span>
                </div>

                <div className="space-y-6">
                  {chapter.chapterTestMC.map((mc, idx) => {
                    const selected = mcAnswers[mc.id];
                    const hasAnswered = selected !== undefined && selected !== null;
                    const isCorrect = selected === mc.correctIndex;

                    return (
                      <div
                        key={mc.id}
                        className={`p-5 rounded-2xl border-2 transition-all ${
                          !hasAnswered
                            ? 'border-slate-200 bg-white'
                            : isCorrect
                            ? 'border-emerald-300 bg-emerald-50/40'
                            : 'border-rose-300 bg-rose-50/40'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                            {idx + 1}
                          </span>
                          <div className="font-bold text-slate-800 text-sm sm:text-base">
                            {mc.question}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                          {mc.options.map((opt, optIdx) => {
                            const isSelected = selected === optIdx;
                            const isRight = optIdx === mc.correctIndex;

                            let optCls = 'bg-slate-50 border-slate-200 hover:bg-indigo-50/50 hover:border-indigo-300 text-slate-800';
                            if (hasAnswered) {
                              if (isRight) {
                                optCls = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                              } else if (isSelected && !isRight) {
                                optCls = 'bg-rose-100 border-rose-500 text-rose-950 line-through';
                              } else {
                                optCls = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleMcSelect(mc.id, optIdx, mc.correctIndex)}
                                disabled={hasAnswered}
                                className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${optCls}`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full bg-white border border-slate-300 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span>{opt}</span>
                                </div>
                                {hasAnswered && isRight && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                                {hasAnswered && isSelected && !isRight && (
                                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {hasAnswered && (
                          <div className="mt-3 pt-3 border-t border-slate-200/60">
                            {isCorrect ? (
                              <div className="text-xs font-bold text-emerald-800 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <Sparkles className="w-4 h-4 text-emerald-600" />
                                  <span>Bagus sekali! Jawabanmu benar.</span>
                                </div>
                                <ShapeExplanationFigure text={mc.question + ' ' + mc.explanation} />
                              </div>
                            ) : (
                              <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 space-y-1.5">
                                <div className="text-xs font-bold text-rose-800">
                                  Jawaban belum tepat. Jawaban benar: {String.fromCharCode(65 + mc.correctIndex)}
                                </div>
                                <div className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <div>
                                    <strong className="text-indigo-700">Pembahasan:</strong> {mc.explanation}
                                  </div>
                                  <ShapeExplanationFigure text={mc.question + ' ' + mc.explanation} />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PART B: 5 SOAL ISIAN SINGKAT (DENGAN TRIGER SERAHKAN PER NOMOR) */}
              <div>
                <div className="flex items-center justify-between mb-4 bg-purple-50/70 p-3 rounded-xl border border-purple-200">
                  <span className="font-extrabold text-purple-900 text-sm">
                    Bagian B: 5 Soal Isian Singkat (Ketik Angka & Klik Serahkan)
                  </span>
                  <span className="text-[11px] font-semibold text-purple-700">
                    Triger Serahkan per nomor
                  </span>
                </div>

                <div className="space-y-6">
                  {chapter.chapterTestFill.map((fill, fIdx) => {
                    const isSubmitted = fillSubmitted[fill.id];
                    const isCorrect = fillIsCorrect[fill.id];
                    const currentVal = fillInputs[fill.id] || '';

                    return (
                      <div
                        key={fill.id}
                        className={`p-5 rounded-2xl border-2 transition-all ${
                          !isSubmitted
                            ? 'border-slate-200 bg-white'
                            : isCorrect
                            ? 'border-emerald-300 bg-emerald-50/40'
                            : 'border-rose-300 bg-rose-50/40'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <span className="w-7 h-7 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                            {fIdx + 1}
                          </span>
                          <div>
                            <div className="font-bold text-slate-800 text-sm sm:text-base">
                              {fill.question}
                            </div>
                            {fill.hint && (
                              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                                <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                                <span>Petunjuk: {fill.hint}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Input Box and "Serahkan Jawaban" Trigger Button */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 my-3">
                          <input
                            type="text"
                            value={currentVal}
                            onChange={(e) =>
                              setFillInputs((prev) => ({ ...prev, [fill.id]: e.target.value }))
                            }
                            disabled={isSubmitted}
                            placeholder="Ketik angka jawabanmu di sini..."
                            className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                              !isSubmitted
                                ? 'bg-slate-50 border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100'
                                : isCorrect
                                ? 'bg-emerald-100/50 border-emerald-400 text-emerald-950 font-bold'
                                : 'bg-rose-100/50 border-rose-400 text-rose-950 font-bold'
                            }`}
                          />
                          <button
                            onClick={() => handleSubmitFill(fill.id, fill.acceptableAnswers)}
                            disabled={isSubmitted || !currentVal.trim()}
                            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
                              isSubmitted
                                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                                : !currentVal.trim()
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-200 active:scale-95'
                            }`}
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Serahkan Jawaban</span>
                          </button>
                        </div>

                        {/* Feedback per Isian Singkat */}
                        {isSubmitted && (
                          <div className="mt-3 pt-3 border-t border-slate-200/60">
                            {isCorrect ? (
                              <div className="bg-emerald-100 border border-emerald-300 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-emerald-900 text-xs sm:text-sm font-bold">
                                <div className="flex items-center gap-2">
                                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                                  <span>🎉 Tepat sekali! Jawabanmu: {currentVal} ({fill.displayAnswer}).</span>
                                </div>
                                <ShapeExplanationFigure text={fill.question + ' ' + fill.explanation} />
                              </div>
                            ) : (
                              <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl space-y-1.5">
                                <div className="text-xs font-bold text-rose-800 flex items-center gap-2">
                                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                  <span>Jawabanmu ({currentVal}) belum tepat. Jawaban yang benar adalah {fill.displayAnswer}.</span>
                                </div>
                                <div className="bg-white p-3 rounded-lg border border-rose-100 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <div>
                                    <strong className="text-purple-700">💡 Pembahasan Soal Isian: </strong>
                                    {fill.explanation}
                                  </div>
                                  <ShapeExplanationFigure text={fill.question + ' ' + fill.explanation} />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setActiveSection('kuis_cepat')}
                  className="text-sm font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali ke Kuis Cepat</span>
                </button>
                {onGoToQuizTab && (
                  <button
                    onClick={onGoToQuizTab}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-indigo-200 flex items-center gap-2 transition-all"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Lanjut ke Tab Latihan 10 Soal Bab</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
