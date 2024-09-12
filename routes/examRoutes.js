const express = require('express');
const { getExams, addExam, updateExam, deleteExam } = require('./../controllers/examController');
const router = express.Router();

/**
 * @openapi
 * /api/exams:
 *   get:
 *     tags:
 *       - Exams
 *     summary: Get all exams
 *     description: Retrieve a list of all exams
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
 * /api/exams:
 *   post:
 *     tags:
 *       - Exams
 *     summary: Add a new exam
 *     description: Create a new exam entry
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
 *         description: Exam created successfully
 *       400:
 *         description: Bad request if the input is invalid
 */
router.post('/', addExam);

/**
 * @openapi
 * /api/exams/{lessonCode}/{studentNumber}:
 *   put:
 *     tags:
 *       - Exams
 *     summary: Update an existing exam
 *     description: Update the details of an exam based on lesson code and student number
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
 *         description: Exam updated successfully
 *       400:
 *         description: Bad request if the input is invalid
 *       404:
 *         description: Not found if the exam does not exist
 */
router.put('/:lessonCode/:studentNumber', updateExam);

/**
 * @openapi
 * /api/exams/{lessonCode}/{studentNumber}:
 *   delete:
 *     tags:
 *       - Exams
 *     summary: Delete an exam
 *     description: Remove an exam based on lesson code and student number
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
 *         description: Exam deleted successfully
 *       404:
 *         description: Not found if the exam does not exist
 */
router.delete('/:lessonCode/:studentNumber', deleteExam);

module.exports = router;
