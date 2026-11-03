import { QuizAttempt, Recommendation, Semester } from '../types/math.ts';

const ATTEMPTS_KEY = 'matematika_sd5_attempts_v1';
const ACTIVE_TAB_KEY = 'matematika_sd5_active_tab';

export function getStoredAttempts(): QuizAttempt[] {
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load quiz attempts from storage:', e);
    return [];
  }
}

export function saveQuizAttempt(attempt: QuizAttempt): void {
  try {
    const current = getStoredAttempts();
    const updated = [attempt, ...current];
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save quiz attempt:', e);
  }
}

export function clearAttempts(): void {
  try {
    localStorage.removeItem(ATTEMPTS_KEY);
  } catch (e) {
    console.error('Failed to clear attempts:', e);
  }
}

export const CHAPTER_INFO_MAP: Record<string, { title: string; number: number; semester: Semester }> = {
  'bab-1': { title: 'Bilangan Cacah Sampai 100.000', number: 1, semester: 1 },
  'bab-2': { title: 'KPK dan FPB', number: 2, semester: 1 },
  'bab-3': { title: 'Bilangan Pecahan', number: 3, semester: 1 },
  'bab-4': { title: 'Keliling Bangun Datar', number: 4, semester: 1 },
  'bab-5': { title: 'Luas Daerah Bangun Datar', number: 5, semester: 1 },
  'bab-6': { title: 'Sudut', number: 6, semester: 2 },
  'bab-7': { title: 'Membandingkan Ciri-Ciri Bangun Datar', number: 7, semester: 2 },
  'bab-8': { title: 'Data', number: 8, semester: 2 },
  'bab-9': { title: 'Bilangan Cacah Sampai 1.000.000', number: 9, semester: 2 },
};

export function calculateRecommendations(attempts: QuizAttempt[]): Recommendation[] {
  const recommendations: Recommendation[] = [];

  for (const [chapterId, info] of Object.entries(CHAPTER_INFO_MAP)) {
    const chapterAttempts = attempts.filter((a) => a.chapterId === chapterId);

    if (chapterAttempts.length === 0) {
      recommendations.push({
        chapterId,
        chapterNumber: info.number,
        chapterTitle: info.title,
        semester: info.semester,
        averageScore: 0,
        attemptsCount: 0,
        status: 'belum_dikerjakan',
        advice: 'Kamu belum mencoba latihan 10 soal untuk bab ini. Ayo uji kemampuanmu sekarang!',
        suggestedTopics: ['Membaca materi bab', 'Mengerjakan kuis pemahaman', 'Latihan soal mandiri'],
      });
      continue;
    }

    const totalScore = chapterAttempts.reduce((sum, a) => sum + a.score, 0);
    const avgScore = Math.round(totalScore / chapterAttempts.length);

    let status: Recommendation['status'] = 'sangat_baik';
    let advice = 'Luar biasa! Pemahamanmu pada bab ini sudah sangat matang. Pertahankan prestasimu!';
    let suggestedTopics: string[] = ['Pertahankan dengan mengulang soal tantangan'];

    if (avgScore < 70) {
      status = 'perlu_perhatian';
      advice = 'Nilaimu masih di bawah 70. Sangat disarankan untuk membaca ulang materi konsep dasar dan pembahasan soal.';
      suggestedTopics = ['Pelajari kembali konsep inti', 'Cermati pembahasan pada setiap kesalahan', 'Kerjakan ulang latihan'];
    } else if (avgScore < 85) {
      status = 'cukup';
      advice = 'Hasilmu sudah cukup bagus, namun masih ada beberapa soal yang perlu dicermati lebih teliti lagi.';
      suggestedTopics = ['Cermati langkah pengerjaan yang keliru', 'Latihan 1x lagi untuk meraih nilai 100'];
    }

    recommendations.push({
      chapterId,
      chapterNumber: info.number,
      chapterTitle: info.title,
      semester: info.semester,
      averageScore: avgScore,
      attemptsCount: chapterAttempts.length,
      status,
      advice,
      suggestedTopics,
    });
  }

  // Sort: 'perlu_perhatian' first, then 'belum_dikerjakan', then 'cukup', then 'sangat_baik'
  const rankMap: Record<Recommendation['status'], number> = {
    perlu_perhatian: 1,
    belum_dikerjakan: 2,
    cukup: 3,
    sangat_baik: 4,
  };

  return recommendations.sort((a, b) => {
    if (rankMap[a.status] !== rankMap[b.status]) {
      return rankMap[a.status] - rankMap[b.status];
    }
    return a.chapterNumber - b.chapterNumber;
  });
}

/**
 * Seed initial sample evaluation data so the child/teacher can explore the Analytics tab immediately
 */
export function seedSampleAttempts(): void {
  const sampleData: QuizAttempt[] = [
    {
      id: 'sample-1',
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
      chapterId: 'bab-1',
      chapterNumber: 1,
      chapterTitle: 'Bilangan Cacah Sampai 100.000',
      totalQuestions: 10,
      score: 90,
      correctCount: 9,
      incorrectCount: 1,
      answers: [],
    },
    {
      id: 'sample-2',
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
      chapterId: 'bab-2',
      chapterNumber: 2,
      chapterTitle: 'KPK dan FPB',
      totalQuestions: 10,
      score: 60,
      correctCount: 6,
      incorrectCount: 4,
      answers: [],
    },
    {
      id: 'sample-3',
      timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
      chapterId: 'bab-3',
      chapterNumber: 3,
      chapterTitle: 'Bilangan Pecahan',
      totalQuestions: 10,
      score: 50,
      correctCount: 5,
      incorrectCount: 5,
      answers: [],
    },
    {
      id: 'sample-4',
      timestamp: Date.now() - 1000 * 60 * 60 * 4, // 4 hours ago
      chapterId: 'bab-4',
      chapterNumber: 4,
      chapterTitle: 'Keliling Bangun Datar',
      totalQuestions: 10,
      score: 80,
      correctCount: 8,
      incorrectCount: 2,
      answers: [],
    },
  ];

  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(sampleData));
}
