const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cors = require('cors');

const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/recipes', recipeRoutes);

// Swagger docs
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 404 Not Found Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// 500 Internal Server Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
