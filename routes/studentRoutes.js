const express = require('express');
const {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent
} = require('./../controllers/studentController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API to manage students
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get list of students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   number:
 *                     type: integer
 *                     example: 12345
 *                   firstName:
 *                     type: string
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     example: Doe
 *                   class:
 *                     type: integer
 *                     example: 10
 */

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Add a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: integer
 *                 example: 12345
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               class:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Student created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 number:
 *                   type: integer
 *                   example: 12345
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                 class:
 *                   type: integer
 *                   example: 10
 */

/**
 * @swagger
 * /api/students/{number}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         description: Student number
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               class:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Student updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 number:
 *                   type: integer
 *                   example: 12345
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                 class:
 *                   type: integer
 *                   example: 10
 */

/**
 * @swagger
 * /api/students/{number}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         description: Student number
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Student deleted
 */

router.get('/', getStudents);
router.post('/', addStudent);
router.put('/:number', updateStudent);
router.delete('/:number', deleteStudent);

module.exports = router;
