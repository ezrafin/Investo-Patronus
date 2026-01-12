export const EDUCATION_BASE_PATH = '/education';

export const educationRoutes = {
  root: EDUCATION_BASE_PATH,
  learning: `${EDUCATION_BASE_PATH}/learning`,
  course: `${EDUCATION_BASE_PATH}/course`,
  basicArticles: `${EDUCATION_BASE_PATH}/basic`,
  advancedArticles: `${EDUCATION_BASE_PATH}/advanced`,
  article: `${EDUCATION_BASE_PATH}/article/:articleId`,
} as const;

export function getEducationRootPath() {
  return educationRoutes.root;
}

export function getEducationLearningPath() {
  return educationRoutes.learning;
}

export function getEducationCoursePath() {
  return educationRoutes.course;
}

export function getEducationBasicArticlesPath() {
  return educationRoutes.basicArticles;
}

export function getEducationAdvancedArticlesPath() {
  return educationRoutes.advancedArticles;
}

export function getEducationArticlePath(articleId: string) {
  return `${EDUCATION_BASE_PATH}/article/${articleId}`;
}

// Course paths (using /academy for Academy courses)
// Note: /education/course is used for Mentor Education
export function getCourseListingPath() {
  return '/academy';
}

export function getCoursePath(courseId: string) {
  return `/academy/${courseId}`;
}

