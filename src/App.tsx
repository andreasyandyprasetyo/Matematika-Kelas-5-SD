/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { DashboardTab } from './components/DashboardTab.tsx';
import { QuizTab } from './components/QuizTab.tsx';
import { AnalyticsTab } from './components/AnalyticsTab.tsx';
import { ChapterDetailModal } from './components/ChapterDetailModal.tsx';
import { CHAPTERS_DATA } from './data/chaptersData.ts';
import { QuizAttempt } from './types/math.ts';
import { getStoredAttempts } from './utils/storage.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quiz' | 'analytics'>('dashboard');
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [quizChapterId, setQuizChapterId] = useState<string>('bab-1');
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  // Load stored quiz attempts on initial render
  useEffect(() => {
    refreshAttempts();
  }, []);

  const refreshAttempts = () => {
    setAttempts(getStoredAttempts());
  };

  // Open Chapter Detail View in Tab 1
  const handleOpenChapter = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseChapter = () => {
    setSelectedChapterId(null);
  };

  // Switch to Quiz Tab for a specific chapter
  const handleGoToQuizTabWithChapter = (chapterId: string) => {
    setQuizChapterId(chapterId);
    setSelectedChapterId(null);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeChapterData = selectedChapterId
    ? CHAPTERS_DATA.find((c) => c.id === selectedChapterId) || null
    : null;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#423229] flex flex-col font-sans selection:bg-[#F59E0B] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'dashboard') {
            setSelectedChapterId(null);
          }
        }}
        totalAttemptsCount={attempts.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* If a chapter detail modal is open in Dashboard */}
        {activeTab === 'dashboard' && activeChapterData ? (
          <ChapterDetailModal
            chapter={activeChapterData}
            onBack={handleCloseChapter}
            onGoToQuizTab={() => handleGoToQuizTabWithChapter(activeChapterData.id)}
          />
        ) : activeTab === 'dashboard' ? (
          <DashboardTab
            onSelectChapter={handleOpenChapter}
            onGoToQuizTabWithChapter={handleGoToQuizTabWithChapter}
          />
        ) : null}

        {/* Tab 2: Bank Soal 10 Soal PG per Bab */}
        {activeTab === 'quiz' && (
          <QuizTab
            initialChapterId={quizChapterId}
            onGoToAnalytics={() => {
              setActiveTab('analytics');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToChapterStudy={(chapterId) => {
              handleOpenChapter(chapterId);
            }}
            onAttemptSaved={refreshAttempts}
          />
        )}

        {/* Tab 3: Grafik Perkembangan & Rekomendasi */}
        {activeTab === 'analytics' && (
          <AnalyticsTab
            attempts={attempts}
            onGoToChapter={handleOpenChapter}
            onGoToQuizForChapter={handleGoToQuizTabWithChapter}
            onRefreshData={refreshAttempts}
          />
        )}
      </main>

      {/* Pastel Footer */}
      <footer className="mt-auto border-t border-[#EADCC9] bg-[#FAF5EE] py-6 text-center text-xs text-[#8C6D58] font-medium">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-black text-[#6F4E37]">
            Matematika Juara Kelas 5 SD • Kurikulum Nasional (Kurikulum Merdeka)
          </p>
          <p>
            Didesain dengan sentuhan warna pastel ceria (merah, kuning, hijau, biru, coklat) dan gambar ilustrasi untuk mendampingi belajar siswa.
          </p>
        </div>
      </footer>
    </div>
  );
}
