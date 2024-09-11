const express = require('express');
const { getExams, addExam, updateExam, deleteExam } = require('./../controllers/examController');
const router = express.Router();

/**
 * @openapi
 * /exams:
 *   get:
 *     description: Get all exams
 *     responses:
 *       200:
 *         description: A list of exams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   lessonCode:
 *                     type: string
 *                     example: "MTH"
 *                   studentNumber:
 *                     type: integer
 *                     example: 12345
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2024-05-21"
 *                   grade:
 *                     type: integer
 *                     example: 85
 */
router.get('/', getExams);

/**
 * @openapi
 * /exams:
 *   post:
 *     description: Add a new exam
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lessonCode:
 *                 type: string
 *                 example: "MTH"
 *               studentNumber:
 *                 type: integer
 *                 example: 12345
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-05-21"
 *               grade:
 *                 type: integer
 *                 example: 85
 *     responses:
 *       201:
 *         description: Exam created
 */
router.post('/', addExam);

/**
 * @openapi
 * /exams/{lessonCode}/{studentNumber}:
 *   put:
 *     description: Update an exam by lesson code and student number
 *     parameters:
 *       - in: path
 *         name: lessonCode
 *         required: true
 *         description: The code of the lesson
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentNumber
 *         required: true
 *         description: The number of the student
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-05-21"
 *               grade:
 *                 type: integer
 *                 example: 85
 *     responses:
 *       200:
 *         description: Exam updated
 */
router.put('/:lessonCode/:studentNumber', updateExam);

/**
 * @openapi
 * /exams/{lessonCode}/{studentNumber}:
 *   delete:
 *     description: Delete an exam by lesson code and student number
 *     parameters:
 *       - in: path
 *         name: lessonCode
 *         required: true
 *         description: The code of the lesson
 *         schema:
 *           type: string
 *       - in: path
 *         name: studentNumber
 *         required: true
 *         description: The number of the student
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Exam deleted
 */
router.delete('/:lessonCode/:studentNumber', deleteExam);

module.exports = router;
