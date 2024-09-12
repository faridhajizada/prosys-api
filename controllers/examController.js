const fs = require('fs');
const path = './data/exams.json';

const getExams = (req, res) => {
  const exams = JSON.parse(fs.readFileSync(path));
  res.json(exams);
};

const addExam = (req, res) => {
  const exams = JSON.parse(fs.readFileSync(path));
  const { lessonCode, studentNumber, date, grade } = req.body;

  if (!lessonCode || !studentNumber) {
    return res.status(400).json({ message: 'lessonCode и studentNumber req.' });
  }

  const existingExam = exams.find(
    (exam) => exam.lessonCode === lessonCode && exam.studentNumber === studentNumber
  );
  
  if (existingExam) {
    return res.status(400).json({ message: 'Exams with our key has' });
  }
  const newExam = { lessonCode, studentNumber, date, grade };
  exams.push(newExam);
  
  fs.writeFileSync(path, JSON.stringify(exams));
  res.status(201).json(newExam);
};

const updateExam = (req, res) => {
  const exams = JSON.parse(fs.readFileSync(path));
  const { lessonCode, studentNumber } = req.params;
  const updatedData = req.body;

  console.log('Updating exam with lessonCode:', lessonCode, 'studentNumber:', studentNumber);
  console.log('Updated data:', updatedData);

  const examIndex = exams.findIndex(
    (exam) => exam.lessonCode === lessonCode && exam.studentNumber === studentNumber
  );
  
  if (examIndex === -1) {
    return res.status(404).json({ message: 'Exam not found.' });
  }

  exams[examIndex] = { ...exams[examIndex], ...updatedData };
  fs.writeFileSync(path, JSON.stringify(exams));
  res.json(exams[examIndex]);
};


const deleteExam = (req, res) => {
  let exams = JSON.parse(fs.readFileSync(path));
  const { lessonCode, studentNumber } = req.params;

  console.log('Deleting exam with lessonCode:', lessonCode, 'studentNumber:', studentNumber);

  exams = exams.filter(
    (exam) => exam.lessonCode !== lessonCode || exam.studentNumber !== studentNumber
  );

  fs.writeFileSync(path, JSON.stringify(exams));

  res.status(204).send();
};


module.exports = {
  getExams,
  addExam,
  updateExam,
  deleteExam,
};
