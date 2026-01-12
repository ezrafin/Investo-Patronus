import type {
  Course,
  Unit,
  Lesson,
  VideoContent,
  ArticleContent,
  QuizContent,
} from '../courseTypes';

// Placeholder course - content will be added gradually
export const financeMarketsCourse: Course = {
  id: 'finance-markets',
  title: 'Finance & Markets',
  description: 'Comprehensive study of financial markets, instruments, and investment strategies',
  finalExamPassRate: 75,
  units: [
    {
      id: 'unit-1',
      title: 'Unit 1: Introduction to Financial Markets',
      description: 'Basic concepts of financial markets',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'Introduction to financial markets',
          duration: '25 min',
          contentItems: [
            {
              id: 'finance-u1-l1-video-1',
              type: 'video',
              title: 'Introduction to financial markets',
              videoIndex: 0,
            } as VideoContent,
            {
              id: 'finance-u1-l1-article',
              type: 'article',
              title: 'Introduction to financial markets',
              content: '# Introduction to financial markets\n\nLesson content will be refined and expanded.',
              importantPoints: [],
            } as ArticleContent,
            {
              id: 'finance-u1-l1-quiz',
              type: 'quiz',
              title: 'Quiz: Introduction to financial markets',
              questions: [],
            } as QuizContent,
          ],
        },
      ],
    },
  ],
  finalExam: [],
};

