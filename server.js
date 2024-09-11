const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const examRoutes = require('./routes/examRoutes');
const { swaggerUi, specs } = require('./swagger');

const app = express();
const PORT = 3009;

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/students', studentRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/exams', examRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
