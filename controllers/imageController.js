const fs = require("fs");
const path = require("path");

// Преобразование изображения в Base64 строку
function imageToBase64(filePath) {
  const file = fs.readFileSync(filePath);
  return file.toString("base64");
}

// Получение всех изображений из JSON файла
const getImages = (req, res) => {
  const jsonFilePath = path.join(__dirname, "../uploads/images.json");

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Unable to read JSON file" });
    }

    const imagesData = JSON.parse(data);
    res.status(200).json(imagesData.images);
  });
};

// Получение изображения по имени файла
const getImageByFilename = (req, res) => {
  const filename = req.params.filename;
  const jsonFilePath = path.join(__dirname, "../uploads/images.json");

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Unable to read JSON file" });
    }

    const imagesData = JSON.parse(data);
    const image = imagesData.images.find((img) => img.filename === filename);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json(image);
  });
};

// Загрузка изображения и добавление его в JSON файл
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  const base64String = req.file.buffer.toString("base64");
  const jsonFilePath = path.join(__dirname, "../uploads/images.json");

  let imagesData = { images: [] };

  // Если JSON файл существует, читаем данные
  if (fs.existsSync(jsonFilePath)) {
    const fileData = fs.readFileSync(jsonFilePath, "utf8");
    imagesData = JSON.parse(fileData);
  }

  // Добавляем новое изображение
  imagesData.images.push({
    filename: req.file.originalname,
    base64: base64String,
  });

  // Сохраняем JSON файл
  fs.writeFileSync(jsonFilePath, JSON.stringify(imagesData, null, 2));

  res.status(200).json({
    message: "File uploaded and stored as Base64 in JSON",
    filename: req.file.originalname,
  });
};

module.exports = {
  getImages,
  getImageByFilename,
  uploadImage,
};
