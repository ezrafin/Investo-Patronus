import type {
  Course,
  Unit,
  Lesson,
  VideoContent,
  ArticleContent,
  QuizContent,
} from '../courseTypes';

// Placeholder course - content will be added gradually
export const economicsPersonalFinanceCourse: Course = {
  id: 'economics-personal-finance',
  title: 'Economics & Personal Finance',
  description: 'Understanding personal finance through economic principles',
  finalExamPassRate: 75,
  units: [
    {
      id: 'unit-1',
      title: 'Unit 1: Introduction to Personal Finance',
      description: 'Basic concepts of personal finance',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'Introduction to personal finance',
          duration: '25 min',
          contentItems: [
            {
              id: 'economics-u1-l1-video-1',
              type: 'video',
              title: 'Introduction to personal finance',
              videoIndex: 0,
            } as VideoContent,
            {
              id: 'economics-u1-l1-article',
              type: 'article',
              title: 'Introduction to personal finance',
              content: '# Introduction to personal finance\n\nLesson content will be refined and expanded.',
              importantPoints: [],
            } as ArticleContent,
            {
              id: 'economics-u1-l1-quiz',
              type: 'quiz',
              title: 'Quiz: Introduction to personal finance',
              questions: [],
            } as QuizContent,
          ],
        },
      ],
    },
  ],
  finalExam: [],
};

