const fs = require('fs');
const path = './data/exams.json';

const getExams = (req, res) => {
  const exams = JSON.parse(fs.readFileSync(path));
  res.json(exams);
};

const addExam = (req, res) => {
  const exams = JSON.parse(fs.readFileSync(path));
  const newExam = req.body;
  exams.push(newExam);
  fs.writeFileSync(path, JSON.stringify(exams));
  res.status(201).json(newExam);
};

const updateExam = (req, res) => {
  const exams = JSON.parse(fs.readFileSync(path));
  const examIndex = exams.findIndex((e) => e.id === parseInt(req.params.id));
  if (examIndex !== -1) {
    exams[examIndex] = { ...exams[examIndex], ...req.body };
    fs.writeFileSync(path, JSON.stringify(exams));
    res.json(exams[examIndex]);
  } else {
    res.status(404).json({ message: 'Exam not found' });
  }
};

const deleteExam = (req, res) => {
  let exams = JSON.parse(fs.readFileSync(path));
  exams = exams.filter((e) => e.id !== parseInt(req.params.id));
  fs.writeFileSync(path, JSON.stringify(exams));
  res.status(204).send();
};

module.exports = {
  getExams,
  addExam,
  updateExam,
  deleteExam,
};
