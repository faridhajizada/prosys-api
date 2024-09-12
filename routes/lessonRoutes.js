const express = require('express');
const { getLessons, addLesson, updateLesson, deleteLesson } = require('../controllers/lessonController');
const router = express.Router();

/**
 * @openapi
 * /api/lessons:
 *   get:
 *     tags:
 *       - Lessons
 *     summary: Get all lessons
 *     description: Retrieve a list of all lessons.
 *     responses:
 *       200:
 *         description: A list of lessons.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     example: "MAT"
 *                   name:
 *                     type: string
 *                     example: "Mathematics"
 *                   class:
 *                     type: integer
 *                     example: 10
 *                   teacherFirstName:
 *                     type: string
 *                     example: "John"
 *                   teacherLastName:
 *                     type: string
 *                     example: "Doe"
 */
router.get('/', getLessons);

/**
 * @openapi
 * /api/lessons:
 *   post:
 *     tags:
 *       - Lessons
 *     summary: Add a new lesson
 *     description: Add a new lesson to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "MAT"
 *               name:
 *                 type: string
 *                 example: "Mathematics"
 *               class:
 *                 type: integer
 *                 example: 10
 *               teacherFirstName:
 *                 type: string
 *                 example: "John"
 *               teacherLastName:
 *                 type: string
 *                 example: "Doe"
 *     responses:
 *       201:
 *         description: Lesson created successfully.
 */
router.post('/', addLesson);

/**
 * @openapi
 * /api/lessons/{code}:
 *   put:
 *     tags:
 *       - Lessons
 *     summary: Update a lesson by code
 *     description: Update details of a specific lesson by its code.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: The unique code of the lesson.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mathematics"
 *               class:
 *                 type: integer
 *                 example: 10
 *               teacherFirstName:
 *                 type: string
 *                 example: "John"
 *               teacherLastName:
 *                 type: string
 *                 example: "Doe"
 *     responses:
 *       200:
 *         description: Lesson updated successfully.
 */
router.put('/:code', updateLesson);

/**
 * @openapi
 * /api/lessons/{code}:
 *   delete:
 *     tags:
 *       - Lessons
 *     summary: Delete a lesson by code
 *     description: Delete a specific lesson by its unique code.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: The unique code of the lesson.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Lesson deleted successfully.
 */
router.delete('/:code', deleteLesson);

module.exports = router;
