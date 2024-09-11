const express = require('express');
const { getLessons, addLesson, updateLesson, deleteLesson } = require('../controllers/lessonController');
const router = express.Router();

/**
 * @openapi
 * /lessons:
 *   get:
 *     description: Get all lessons
 *     responses:
 *       200:
 *         description: A list of lessons
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
 * /lessons:
 *   post:
 *     description: Add a new lesson
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
 *         description: Lesson created
 */
router.post('/', addLesson);

/**
 * @openapi
 * /lessons/{code}:
 *   put:
 *     description: Update a lesson by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: The code of the lesson
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
 *         description: Lesson updated
 */
router.put('/:code', updateLesson);

/**
 * @openapi
 * /lessons/{code}:
 *   delete:
 *     description: Delete a lesson by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: The code of the lesson
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Lesson deleted
 */
router.delete('/:code', deleteLesson);

module.exports = router;
