const express = require('express');
const { upload, uploadImage, getImages } = require('../controllers/imageController');

const router = express.Router();

/**
 * @swagger
 * /images/upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 filePath:
 *                   type: string
 *       400:
 *         description: Bad Request
 */
router.post('/upload', upload.single('image'), uploadImage);

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Get all images
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: List of images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   filename:
 *                     type: string
 *                   url:
 *                     type: string
 */
router.get('/', getImages);

module.exports = router;