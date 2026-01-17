/**
 * Script to help translate quiz questions from TypeScript course files
 * to Russian and Polish in education.json files
 * 
 * This script extracts quiz questions from course files and provides
 * a template for manual translation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read course files
const macroPath = path.join(__dirname, '..', 'src', 'data', 'courses', 'macroeconomics.ts');
const microPath = path.join(__dirname, '..', 'src', 'data', 'courses', 'microeconomics.ts');

const macroContent = fs.readFileSync(macroPath, 'utf8');
const microContent = fs.readFileSync(microPath, 'utf8');

// Extract quiz questions using regex
function extractQuizQuestions(content, coursePrefix) {
  const quizzes = [];
  const quizRegex = /id:\s*['"]([^'"]+-quiz)['"][\s\S]*?questions:\s*\[([\s\S]*?)\]\s*,\s*\}\)/g;
  
  let match;
  while ((match = quizRegex.exec(content)) !== null) {
    const quizId = match[1];
    const questionsText = match[2];
    
    // Extract individual questions
    const questionRegex = /\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?question:\s*['"]([^'"]+)['"][\s\S]*?options:\s*\[([\s\S]*?)\][\s\S]*?correctAnswer:\s*(\d+)[\s\S]*?explanation:\s*['"]([^'"]+)['"]/g;
    const questions = [];
    
    let qMatch;
    while ((qMatch = questionRegex.exec(questionsText)) !== null) {
      const questionId = qMatch[1];
      const questionText = qMatch[2];
      const optionsText = qMatch[3];
      const correctAnswer = parseInt(qMatch[4]);
      const explanation = qMatch[5];
      
      // Extract options
      const options = optionsText.match(/['"]([^'"]+)['"]/g)?.map(opt => opt.slice(1, -1)) || [];
      
      questions.push({
        id: questionId,
        question: questionText,
        options,
        correctAnswer,
        explanation
      });
    }
    
    if (questions.length > 0) {
      quizzes.push({
        id: quizId,
        questions
      });
    }
  }
  
  return quizzes;
}

const macroQuizzes = extractQuizQuestions(macroContent, 'macroecon');
const microQuizzes = extractQuizQuestions(microContent, 'micro');

console.log(`Found ${macroQuizzes.length} quizzes in Macroeconomics`);
console.log(`Found ${microQuizzes.length} quizzes in Microeconomics`);
console.log(`Total: ${macroQuizzes.length + microQuizzes.length} quizzes`);

// Output summary
console.log('\nMacroeconomics Quizzes:');
macroQuizzes.forEach(q => {
  console.log(`  ${q.id}: ${q.questions.length} questions`);
});

console.log('\nMicroeconomics Quizzes:');
microQuizzes.forEach(q => {
  console.log(`  ${q.id}: ${q.questions.length} questions`);
});


