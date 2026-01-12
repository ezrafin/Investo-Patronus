import type { Course } from '../courseTypes';

// Individual course definitions
import { macroeconomicsCourse } from './macroeconomics';
import { microeconomicsCourse } from './microeconomics';
import { financeMarketsCourse } from './finance-markets';
import { economicsPersonalFinanceCourse } from './economics-personal-finance';

const courses: Course[] = [
  macroeconomicsCourse,
  microeconomicsCourse,
  financeMarketsCourse,
  economicsPersonalFinanceCourse,
];

export function getCourseById(courseId: string): Course | undefined {
  return courses.find((course) => course.id === courseId);
}

export function getAllCourses(): Course[] {
  return courses;
}

export { type Course } from '../courseTypes';


