import React, { useState, useEffect, useRef } from 'react';
import { BANK_SOAL_DATA } from '../data/bankSoalData.ts';
import { CHAPTERS_DATA } from '../data/chaptersData.ts';
import { BankQuestion, QuizAttempt } from '../types/math.ts';
import { saveQuizAttempt } from '../utils/storage.ts';
import { fireCelebrationConfetti } from '../utils/confetti.ts';
import { PASTEL_THEMES } from '../utils/pastelTheme.ts';
import { PASTEL_TROPHY_IMG } from './common/PastelIllustration.tsx';
import { ShapeExplanationFigure } from './common/ShapeExplanationFigure.tsx';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BarChart3,
  Edit3,
  Trash2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';

interface QuizTabProps {
  initialChapterId?: string;
  onGoToAnalytics: () => void;
  onGoToChapterStudy: (chapterId: string) => void;
  onAttemptSaved: () => void;
}

export const QuizTab: React.FC<QuizTabProps> = ({
  initialChapterId = 'bab-1',
  onGoToAnalytics,
  onGoToChapterStudy,
  onAttemptSaved,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(initialChapterId);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [lastAttempt, setLastAttempt] = useState<QuizAttempt | null>(null);

  // Scratchpad (Papan Coret-coret) toggle
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Sync if initialChapterId changes from parent
  useEffect(() => {
    if (initialChapterId) {
      setSelectedChapterId(initialChapterId);
      handleReset();
    }
  }, [initialChapterId]);

  const questions: BankQuestion[] = BANK_SOAL_DATA[selectedChapterId] || [];
  const currentChapter = CHAPTERS_DATA.find((c) => c.id === selectedChapterId) || CHAPTERS_DATA[0];

  const handleReset = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setLastAttempt(null);
    clearScratchpad();
  };

  const handleSelectAnswer = (optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    if (isSubmitted) return;

    let correctCount = 0;
    const answersRecord = questions.map((q, idx) => {
      const choice = userAnswers[idx];
      const isCorrect = choice === q.correctIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        questionText: q.question,
        userChoice: choice !== undefined ? choice : -1,
        correctChoice: q.correctIndex,
        isCorrect,
        explanation: q.explanation,
        subtopicTag: q.subtopicTag,
      };
    });

    const totalQuestions = questions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      timestamp: Date.now(),
      chapterId: selectedChapterId,
      chapterNumber: currentChapter.chapterNumber,
      chapterTitle: currentChapter.title,
      totalQuestions,
      score,
      correctCount,
      incorrectCount: totalQuestions - correctCount,
      answers: answersRecord,
    };

    saveQuizAttempt(attempt);
    setLastAttempt(attempt);
    setIsSubmitted(true);
    onAttemptSaved();

    if (score >= 70) {
      fireCelebrationConfetti();
    }
  };

  // Canvas Scratchpad Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#4338ca';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearScratchpad = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const answeredCount = Object.keys(userAnswers).length;
  const currentQ = questions[currentIndex];

  return (
    <div className="space-y-6 pb-20">
      {/* Chapter Selection Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              Pilih Bab Latihan (10 Soal Pilihan Ganda)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Hasil pengerjaan 10 soal ini langsung tercatat dan dianalisis di Tab 3!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowScratchpad(!showScratchpad)}
              className={`text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                showScratchpad
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{showScratchpad ? 'Tutup Papan Coret' : 'Papan Coret-coret'}</span>
            </button>
          </div>
        </div>

        {/* Horizontal scroll of 9 Bab with pastel accents */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {CHAPTERS_DATA.map((ch) => {
            const isSelected = ch.id === selectedChapterId;
            const pastel = PASTEL_THEMES[ch.themePastel];

            return (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChapterId(ch.id);
                  handleReset();
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 border ${
                  isSelected
                    ? `${pastel.buttonBg} ${pastel.buttonText} shadow-md`
                    : `${pastel.cardBg} ${pastel.cardBorder} text-slate-700 hover:brightness-95`
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isSelected ? 'bg-white text-slate-900' : `${pastel.badgeBg} ${pastel.badgeText}`
                }`}>
                  {ch.chapterNumber}
                </span>
                <span className="truncate max-w-[140px]">{ch.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional Scratchpad Canvas */}
      {showScratchpad && (
        <div className="bg-amber-50/80 border-2 border-amber-300 rounded-3xl p-4 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
              <Edit3 className="w-4 h-4 text-amber-700" />
              Papan Coret-Coret Hitungan (Gunakan Mouse / Layar Sentuh)
            </span>
            <button
              onClick={clearScratchpad}
              className="text-xs font-bold text-rose-700 hover:text-rose-900 bg-white px-2.5 py-1 rounded-lg border border-amber-300 flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Bersihkan Coretan</span>
            </button>
          </div>
          <canvas
            ref={canvasRef}
            width={760}
            height={160}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-40 bg-white rounded-2xl border border-amber-200 cursor-crosshair touch-none shadow-inner"
          />
        </div>
      )}

      {/* QUIZ ACTIVE VIEW (NOT SUBMITTED) */}
      {!isSubmitted && currentQ && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          {/* Header Progress & Navigator */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100 mb-6">
            <div>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Bab {currentChapter.chapterNumber}: {currentChapter.title}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-800 mt-2">
                Soal Nomor {currentIndex + 1} dari {questions.length}
              </h3>
            </div>

            {/* Answered Counter & Progress Bar */}
            <div className="text-right">
              <div className="text-xs font-bold text-slate-600 mb-1">
                Terjawab: <span className="text-indigo-600 font-extrabold">{answeredCount}</span>/{questions.length} Soal
              </div>
              <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* 1 to 10 Question Navigator Buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {questions.map((_, idx) => {
              const isAnswered = userAnswers[idx] !== undefined;
              const isCurrent = currentIndex === idx;

              let btnCls = 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';
              if (isCurrent) {
                btnCls = 'bg-indigo-600 text-white border-indigo-600 font-black shadow-sm ring-2 ring-indigo-200';
              } else if (isAnswered) {
                btnCls = 'bg-indigo-100 text-indigo-800 border-indigo-300 font-bold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-9 h-9 rounded-xl border text-xs flex items-center justify-center transition-all ${btnCls}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Question Text */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                Topik: {currentQ.subtopicTag}
              </span>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* Options A, B, C, D */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = userAnswers[currentIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectAnswer(optIdx)}
                  className={`p-4 rounded-2xl border-2 text-left text-sm font-semibold transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Nav: Prev, Next, Submit */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-100">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <div className="flex items-center gap-2">
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
                >
                  <span>Berikutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all animate-pulse"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesai & Serahkan Ujian</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* QUIZ RESULTS VIEW (SUBMITTED) */}
      {isSubmitted && lastAttempt && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Result Score Banner with Trophy Illustration */}
          <div className="bg-[#FAF5EE] border-2 border-[#EADCC9] rounded-3xl p-6 sm:p-8 shadow-md text-center relative overflow-hidden">
            <div className="relative z-10 max-w-xl mx-auto space-y-3">
              <span className="bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                Hasil Latihan 10 Soal • Bab {currentChapter.chapterNumber}
              </span>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-2">
                <img
                  src={PASTEL_TROPHY_IMG}
                  alt="Piala Prestasi Pastel"
                  className="w-24 h-24 rounded-2xl object-cover shadow-sm border-2 border-[#FDE68A] bg-white p-1"
                />
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#6F4E37]">
                    {lastAttempt.score >= 80
                      ? '🌟 Luar Biasa! Nilaimu Sangat Bagus!'
                      : lastAttempt.score >= 60
                      ? '👍 Bagus! Terus Tingkatkan Pemahamanmu!'
                      : '💪 Jangan Patah Semangat, Ayo Pelajari Ulang!'}
                  </h2>
                  <div className="mt-2 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white text-[#0284C7] text-3xl font-black shadow-md border-3 border-[#FDE68A]">
                    {lastAttempt.score}
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 text-xs font-bold pt-1">
                <span className="bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  {lastAttempt.correctCount} Soal Benar
                </span>
                <span className="bg-[#FFE4E6] text-[#9F1239] border border-[#FECDD3] px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
                  <XCircle className="w-4 h-4 text-[#F43F5E]" />
                  {lastAttempt.incorrectCount} Soal Salah
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onGoToAnalytics}
                  className="bg-[#F59E0B] hover:bg-[#D97706] text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Lihat Grafik Perkembangan di Tab 3</span>
                </button>

                <button
                  onClick={() => onGoToChapterStudy(selectedChapterId)}
                  className="bg-white hover:bg-[#FAF5EE] text-[#6F4E37] border border-[#EADCC9] font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs flex items-center gap-2 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Pelajari Materi Bab Ini</span>
                </button>

                <button
                  onClick={handleReset}
                  className="bg-white text-slate-800 hover:bg-slate-100 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs flex items-center gap-2 transition-all border border-slate-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Latihan</span>
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Question Review & Pembahasan */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Pembahasan Lengkap 10 Soal
            </h3>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const userChoice = userAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border-2 transition-all ${
                      isCorrect
                        ? 'border-emerald-300 bg-emerald-50/30'
                        : 'border-rose-300 bg-rose-50/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg font-black flex items-center justify-center shrink-0 text-xs ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-bold text-slate-800 text-sm sm:text-base">
                            {q.question}
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1 inline-block">
                            Topik: {q.subtopicTag}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1 ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Salah
                          </>
                        )}
                      </span>
                    </div>

                    {/* Options list showing right and wrong */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3">
                      {q.options.map((opt, optIdx) => {
                        const isUserOpt = userChoice === optIdx;
                        const isRightOpt = optIdx === q.correctIndex;

                        let optCls = 'bg-white border-slate-200 text-slate-500 opacity-70';
                        if (isRightOpt) {
                          optCls = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                        } else if (isUserOpt && !isRightOpt) {
                          optCls = 'bg-rose-100 border-rose-500 text-rose-950 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${optCls}`}
                          >
                            <span className="flex items-center gap-2">
                              <strong className="font-mono">{String.fromCharCode(65 + optIdx)}.</strong>
                              <span>{opt}</span>
                            </span>
                            {isRightOpt && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                            {isUserOpt && !isRightOpt && <XCircle className="w-4 h-4 text-rose-600" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Full Explanation */}
                    <div className="mt-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="font-bold text-indigo-700 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4" />
                          <span>Pembahasan Soal:</span>
                        </div>
                        <p className="leading-relaxed">{q.explanation}</p>
                      </div>
                      <ShapeExplanationFigure text={q.question + ' ' + q.explanation} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
