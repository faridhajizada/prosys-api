const express = require("express");
const multer = require("multer");
const {
  getImages,
  uploadImage,
  getImageByFilename,
} = require("../controllers/imageController");

const router = express.Router();
const upload = multer(); // Используем multer для работы с буфером памяти

// Маршрут для загрузки изображения
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
 *         description: Image uploaded successfully and stored as Base64 in JSON
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 filename:
 *                   type: string
 *       400:
 *         description: Bad Request
 */
router.post("/upload", upload.single("image"), uploadImage);

// Маршрут для получения всех изображений
/**
 * @swagger
 * /images:
 *   get:
 *     summary: Get all images
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: List of images stored in JSON
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   filename:
 *                     type: string
 *                   base64:
 *                     type: string
 */
router.get("/", getImages);

// Маршрут для получения изображения по имени файла
/**
 * @swagger
 * /images/{filename}:
 *   get:
 *     summary: Get image by filename
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The image filename
 *     responses:
 *       200:
 *         description: Base64 string of the image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 filename:
 *                   type: string
 *                 base64:
 *                   type: string
 *       404:
 *         description: Image not found
 */
router.get("/:filename", getImageByFilename);

module.exports = router;
