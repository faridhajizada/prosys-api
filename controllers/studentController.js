const fs = require("fs").promises;
const path = "./data/students.json";

const getStudents = async (req, res) => {
  try {
    const data = await fs.readFile(path, "utf-8");
    const students = JSON.parse(data);
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error reading students data", error: err.message });
  }
};

const addStudent = async (req, res) => {
  try {
    const data = await fs.readFile(path, "utf-8");
    const students = JSON.parse(data);
    const newStudent = req.body;

    if (!newStudent.number || !newStudent.firstName || !newStudent.lastName || !newStudent.class) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    students.push(newStudent);
    await fs.writeFile(path, JSON.stringify(students, null, 2));
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: "Error adding student", error: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const data = await fs.readFile(path, "utf-8");
    const students = JSON.parse(data);
    const studentIndex = students.findIndex(s => s.number === parseInt(req.params.number));

    if (studentIndex !== -1) {
      students[studentIndex] = { ...students[studentIndex], ...req.body };
      await fs.writeFile(path, JSON.stringify(students, null, 2));
      res.json(students[studentIndex]);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating student", error: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const data = await fs.readFile(path, "utf-8");
    let students = JSON.parse(data);
    students = students.filter(s => s.number !== parseInt(req.params.number));

    if (students.length === JSON.parse(data).length) {
      return res.status(404).json({ message: "Student not found" });
    }

    await fs.writeFile(path, JSON.stringify(students, null, 2));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error: err.message });
  }
};

module.exports = { getStudents, addStudent, updateStudent, deleteStudent };
