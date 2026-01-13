const fs = require('fs');

// Read the macroeconomics course file
const content = fs.readFileSync('src/data/courses/macroeconomics.ts', 'utf8');

// Extract lessons
const lessons = [];
const lessonRegex = /id: 'lesson-(\d+)-(\d+)',\s+title: '([^']+)'/g;
let match;
while ((match = lessonRegex.exec(content)) !== null) {
  lessons.push({
    unit: match[1],
    lesson: match[2],
    id: `lesson-${match[1]}-${match[2]}`,
    title: match[3]
  });
}

// Extract content items
const items = [];
const itemRegex = /id: '(macroecon-u\d+-l\d+-(?:video-\d+|article|practice|quiz))',\s+type: '(video|article|practice|quiz)',\s+title: '([^']+)'/g;
while ((match = itemRegex.exec(content)) !== null) {
  const parts = match[1].match(/macroecon-u(\d+)-l(\d+)-(.*)/);
  items.push({
    unit: parts[1],
    lesson: parts[2],
    id: match[1],
    type: match[2],
    title: match[3]
  });
}

// Extract unit titles and descriptions
const units = [];
const unitRegex = /id: 'unit-(\d+)',\s+title: '([^']+)',\s+description: '([^']+)'/g;
while ((match = unitRegex.exec(content)) !== null) {
  units.push({
    id: `unit-${match[1]}`,
    title: match[2],
    description: match[3]
  });
}

// Build structure
const structure = {
  macroeconomics: {
    title: "Macroeconomics",
    description: "Comprehensive study of macroeconomic principles, policies, and their impact on global economies",
    unit: {}
  }
};

// Add units
units.forEach(u => {
  structure.macroeconomics.unit[u.id] = {
    title: u.title,
    description: u.description,
    lesson: {}
  };
});

// Add lessons
lessons.forEach(l => {
  const unitKey = `unit-${l.unit}`;
  if (structure.macroeconomics.unit[unitKey]) {
    structure.macroeconomics.unit[unitKey].lesson[l.id] = {
      title: l.title,
      contentItem: {}
    };
  }
});

// Add content items
items.forEach(item => {
  const unitKey = `unit-${item.unit}`;
  const lessonKey = `lesson-${item.unit}-${item.lesson}`;
  if (structure.macroeconomics.unit[unitKey] && 
      structure.macroeconomics.unit[unitKey].lesson[lessonKey]) {
    structure.macroeconomics.unit[unitKey].lesson[lessonKey].contentItem[item.id] = {
      title: item.title
    };
  }
});

// Write to file
fs.writeFileSync('macroeconomics-structure.json', JSON.stringify(structure, null, 2));
console.log('Structure created successfully!');
console.log(`Units: ${units.length}`);
console.log(`Lessons: ${lessons.length}`);
console.log(`Content items: ${items.length}`);

