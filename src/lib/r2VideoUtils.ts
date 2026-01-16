/**
 * Utility functions for generating Cloudflare R2 video URLs
 * 
 * Structure:
 * - Macroeconomics: /macro/Macroeconomics-U1-L1-V1.mp4
 * - Microeconomics: /micro/Microeconomics-U1-L1-V1.mp4
 * - Finance & Markets: /fin/Finance&Markets-U1-L1-V1.mp4
 * - Economics & Personal Finance: /personal/Economics&Personal-U1-L1-V1.mp4
 */

const R2_PUBLIC_URL = 'https://pub-3a415fdd495c4b5eaaadb487006b4f22.r2.dev';

/**
 * Course folder mapping
 */
const COURSE_FOLDERS: Record<string, string> = {
  macroeconomics: 'macro',
  microeconomics: 'micro',
  'finance-markets': 'fin',
  'economics-personal-finance': 'personal'
};

/**
 * Course name prefixes for filenames
 */
const COURSE_PREFIXES: Record<string, string> = {
  macroeconomics: 'Macroeconomics',
  microeconomics: 'Microeconomics',
  'finance-markets': 'Finance&Markets',
  'economics-personal-finance': 'Economics&Personal'
};

/**
 * Generate video filename based on course, unit, lesson, and video number
 * 
 * @param courseId - Course ID (e.g., 'macroeconomics')
 * @param unitIndex - Unit index (0-based, will be converted to 1-based for filename)
 * @param lessonIndex - Lesson index (0-based, will be converted to 1-based for filename)
 * @param videoIndex - Video index (0-based, will be converted to 1-based for filename)
 * @returns Generated filename (e.g., 'Macroeconomics-U1-L1-V1.mp4')
 */
export function generateVideoFilename(
  courseId: string,
  unitIndex: number,
  lessonIndex: number,
  videoIndex: number = 0
): string {
  const prefix = COURSE_PREFIXES[courseId] || courseId;
  const unit = unitIndex + 1; // Convert to 1-based
  const lesson = lessonIndex + 1; // Convert to 1-based
  const video = videoIndex + 1; // Convert to 1-based
  
  return `${prefix}-U${unit}-L${lesson}-V${video}.mp4`;
}

/**
 * Generate full R2 URL for a video
 * 
 * @param courseId - Course ID
 * @param unitIndex - Unit index (0-based)
 * @param lessonIndex - Lesson index (0-based)
 * @param videoIndex - Video index (0-based, defaults to 0 for first video)
 * @returns Full R2 URL to the video
 */
export function getVideoUrl(
  courseId: string,
  unitIndex: number,
  lessonIndex: number,
  videoIndex: number = 0
): string {
  const folder = COURSE_FOLDERS[courseId] || courseId;
  const filename = generateVideoFilename(courseId, unitIndex, lessonIndex, videoIndex);
  
  // Encode the filename to handle special characters like & in URL
  const encodedFilename = encodeURIComponent(filename);
  
  return `${R2_PUBLIC_URL}/${folder}/${encodedFilename}`;
}

/**
 * Generate all video URLs for a lesson (supports multiple videos per lesson)
 * 
 * @param courseId - Course ID
 * @param unitIndex - Unit index (0-based)
 * @param lessonIndex - Lesson index (0-based)
 * @param videoCount - Number of videos in the lesson (default: 1)
 * @returns Array of video URLs
 */
export function getLessonVideoUrls(
  courseId: string,
  unitIndex: number,
  lessonIndex: number,
  videoCount: number = 1
): string[] {
  return Array.from({ length: videoCount }, (_, i) =>
    getVideoUrl(courseId, unitIndex, lessonIndex, i)
  );
}

/**
 * Get video URL for a VideoContent item
 * 
 * @param courseId - Course ID
 * @param unitIndex - Unit index (0-based)
 * @param lessonIndex - Lesson index (0-based)
 * @param videoContent - VideoContent item with videoIndex
 * @returns Full R2 URL to the video
 */
export function getVideoContentUrl(
  courseId: string,
  unitIndex: number,
  lessonIndex: number,
  videoContent: { videoIndex: number }
): string {
  return getVideoUrl(courseId, unitIndex, lessonIndex, videoContent.videoIndex);
}

/**
 * Get course folder name for a given course ID
 */
export function getCourseFolder(courseId: string): string {
  return COURSE_FOLDERS[courseId] || courseId;
}

