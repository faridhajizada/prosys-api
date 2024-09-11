const fs = require('fs');
const path = './data/students.json';

const getStudents = (req, res) => {
  const students = JSON.parse(fs.readFileSync(path));
  res.json(students);
};

const addStudent = (req, res) => {
  const students = JSON.parse(fs.readFileSync(path));
  const newStudent = req.body;
  students.push(newStudent);
  fs.writeFileSync(path, JSON.stringify(students));
  res.status(201).json(newStudent);
};

const updateStudent = (req, res) => {
  const students = JSON.parse(fs.readFileSync(path));
  const studentIndex = students.findIndex((s) => s.id === parseInt(req.params.id));
  if (studentIndex !== -1) {
    students[studentIndex] = { ...students[studentIndex], ...req.body };
    fs.writeFileSync(path, JSON.stringify(students));
    res.json(students[studentIndex]);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
};

const deleteStudent = (req, res) => {
  let students = JSON.parse(fs.readFileSync(path));
  students = students.filter((s) => s.id !== parseInt(req.params.id));
  fs.writeFileSync(path, JSON.stringify(students));
  res.status(204).send();
};

module.exports = { getStudents, addStudent, updateStudent, deleteStudent };
