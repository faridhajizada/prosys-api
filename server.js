const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const studentRoutes = require("./routes/studentRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const examRoutes = require("./routes/examRoutes");
const imageRoutes = require("./routes/imageRoutes");
const { swaggerUi, specs } = require("./swagger");

const app = express();
const PORT = 3009;

app.use(cors());
app.use(bodyParser.json());

// Статический маршрут для доступа к загруженным изображениям
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/students", studentRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/exams", examRoutes);
app.use("/images", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});