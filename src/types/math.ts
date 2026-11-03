export type Semester = 1 | 2;

export interface TopicSection {
  title: string;
  subtitle?: string;
  content: string[];
  visualType?:
    | 'place_value'
    | 'factor_tree'
    | 'fraction_bars'
    | 'perimeter_concept'
    | 'perimeter_square_rect'
    | 'perimeter_other_shapes'
    | 'perimeter_circle'
    | 'area_triangle'
    | 'area_parallelogram'
    | 'area_trapezoid'
    | 'area_kite_rhombus'
    | 'regular_irregular'
    | 'shape_comparison'
    | 'symmetry_visual'
    | 'perimeter_shape'
    | 'area_shape'
    | 'angle_protractor'
    | 'shape_properties'
    | 'data_chart'
    | 'million_place_value'
    | string;
  formula?: string;
  tips?: string;
  examples: {
    question: string;
    steps: string[];
    answer: string;
  }[];
}

export interface QuickQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChapterMCQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChapterFillQuestion {
  id: string;
  question: string;
  acceptableAnswers: string[];
  displayAnswer: string;
  hint?: string;
  explanation: string;
  unit?: string;
}

export interface ChapterData {
  id: string;
  chapterNumber: number;
  semester: Semester;
  title: string;
  tagline: string;
  iconName: string;
  themeColor: string; // Legacy Tailwind color class
  themePastel: 'merah' | 'kuning' | 'hijau' | 'biru' | 'coklat';
  description: string;
  subtopics: string[];
  sections: TopicSection[];
  quickQuiz: QuickQuizQuestion[]; // 3 soal pilihan ganda pemahaman materi
  chapterTestMC: ChapterMCQuestion[]; // 5 soal pilihan ganda akhir bab
  chapterTestFill: ChapterFillQuestion[]; // 5 soal isian singkat akhir bab (angka)
}

export interface BankQuestion {
  id: string;
  chapterId: string;
  chapterNumber: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  subtopicTag: string;
}

export interface QuizAttempt {
  id: string;
  timestamp: number;
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  totalQuestions: number;
  score: number; // 0-100
  correctCount: number;
  incorrectCount: number;
  answers: {
    questionId: string;
    questionText: string;
    userChoice: number;
    correctChoice: number;
    isCorrect: boolean;
    explanation: string;
    subtopicTag: string;
  }[];
}

export interface Recommendation {
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  semester: Semester;
  averageScore: number;
  attemptsCount: number;
  status: 'perlu_perhatian' | 'cukup' | 'sangat_baik' | 'belum_dikerjakan';
  advice: string;
  suggestedTopics: string[];
}
