const fs = require('fs');
const path = './data/lessons.json';

// Helper function to read lessons from the file
const readLessonsFromFile = () => {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading lessons file:', error);
    return [];
  }
};

// Helper function to write lessons to the file
const writeLessonsToFile = (lessons) => {
  try {
    fs.writeFileSync(path, JSON.stringify(lessons, null, 2));
  } catch (error) {
    console.error('Error writing to lessons file:', error);
  }
};

const getLessons = (req, res) => {
  const lessons = readLessonsFromFile();
  res.json(lessons);
};

const addLesson = (req, res) => {
  const lessons = readLessonsFromFile();
  const newLesson = req.body;

  // Check if lesson with the same code already exists
  if (lessons.find((lesson) => lesson.code === newLesson.code)) {
    return res.status(400).json({ message: 'Lesson with this code already exists' });
  }

  lessons.push(newLesson);
  writeLessonsToFile(lessons);
  res.status(201).json(newLesson);
};

const updateLesson = (req, res) => {
  const lessons = readLessonsFromFile();
  const lessonIndex = lessons.findIndex((l) => l.code === req.params.code);

  if (lessonIndex !== -1) {
    lessons[lessonIndex] = { ...lessons[lessonIndex], ...req.body };
    writeLessonsToFile(lessons);
    res.json(lessons[lessonIndex]);
  } else {
    res.status(404).json({ message: 'Lesson not found' });
  }
};

const deleteLesson = (req, res) => {
  let lessons = readLessonsFromFile();
  const lessonIndex = lessons.findIndex((l) => l.code === req.params.code);

  if (lessonIndex !== -1) {
    lessons = lessons.filter((l) => l.code !== req.params.code);
    writeLessonsToFile(lessons);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Lesson not found' });
  }
};

module.exports = {
  getLessons,
  addLesson,
  updateLesson,
  deleteLesson,
};
