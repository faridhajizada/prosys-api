const fs = require('fs'); // Импортируем fs для работы с файловой системой
const path = require('path');
const multer = require('multer');

// Конфигурация для multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a file" });
  }
  res.status(200).json({
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
};

// Новый метод для получения списка изображений
const getImages = (req, res) => {
  const uploadsDir = path.join(__dirname, '../uploads');

  // Читаем содержимое директории
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Unable to scan files" });
    }

    // Формируем полный путь для каждого файла
    const imageFiles = files.map(file => ({
      filename: file,
      url: `/uploads/${file}`
    }));

    res.status(200).json(imageFiles);
  });
};

module.exports = {
  upload,
  uploadImage,
  getImages  // Экспортируем новый контроллер
};