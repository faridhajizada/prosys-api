const fs = require('fs');
const path = './data/lessons.json';

const getLessons = (req, res) => {
  const lessons = JSON.parse(fs.readFileSync(path));
  res.json(lessons);
};

const addLesson = (req, res) => {
  const lessons = JSON.parse(fs.readFileSync(path));
  const newLesson = req.body;
  lessons.push(newLesson);
  fs.writeFileSync(path, JSON.stringify(lessons));
  res.status(201).json(newLesson);
};

const updateLesson = (req, res) => {
  const lessons = JSON.parse(fs.readFileSync(path));
  const lessonIndex = lessons.findIndex((l) => l.id === parseInt(req.params.id));
  if (lessonIndex !== -1) {
    lessons[lessonIndex] = { ...lessons[lessonIndex], ...req.body };
    fs.writeFileSync(path, JSON.stringify(lessons));
    res.json(lessons[lessonIndex]);
  } else {
    res.status(404).json({ message: 'Lesson not found' });
  }
};

const deleteLesson = (req, res) => {
  let lessons = JSON.parse(fs.readFileSync(path));
  lessons = lessons.filter((l) => l.id !== parseInt(req.params.id));
  fs.writeFileSync(path, JSON.stringify(lessons));
  res.status(204).send();
};

module.exports = {
  getLessons,
  addLesson,
  updateLesson,
  deleteLesson,
};
