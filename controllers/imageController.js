const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Настройка для хранения загруженных файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    // Преобразуем имя файла в безопасный для URL формат
    const safeFileName = encodeURIComponent(`${Date.now()}-${file.originalname}`);
    cb(null, safeFileName);
  },
});

const upload = multer({ storage: storage });

// Загрузка изображения
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a file" });
  }
  res.status(200).json({
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
};

// Получение списка изображений
const getImages = (req, res) => {
  const uploadsDir = path.join(__dirname, '../uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Unable to scan files" });
    }

    const imageFiles = files.map(file => ({
      filename: decodeURIComponent(file), // Декодируем имя файла для отображения
      url: `/uploads/${encodeURIComponent(file)}` // Кодируем URL для безопасности
    }));

    res.status(200).json(imageFiles);
  });
};

module.exports = {
  upload,
  uploadImage,
  getImages  
};