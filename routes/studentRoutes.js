const express = require('express');
const { getStudents, addStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const router = express.Router();

/**
 * @openapi
 * /students:
 *   get:
 *     description: Get all students
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   firstName:
 *                     type: string
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     example: "Doe"
 *                   class:
 *                     type: integer
 *                     example: 10
 */
router.get('/', getStudents);

/**
 * @openapi
 * /students:
 *   post:
 *     description: Add a new student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               class:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Student created
 */
router.post('/', addStudent);

/**
 * @openapi
 * /students/{id}:
 *   put:
 *     description: Update a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student
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
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               class:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Student updated
 */
router.put('/:id', updateStudent);

/**
 * @openapi
 * /students/{id}:
 *   delete:
 *     description: Delete a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Student deleted
 */
router.delete('/:id', deleteStudent);

module.exports = router;
