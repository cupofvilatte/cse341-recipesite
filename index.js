const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./auth/passport');

const cors = require('cors');

const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./auth/routes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'fallback-dev-secret',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: 'sessions',
        }),
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/recipes', recipeRoutes);

// Swagger docs
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Welcome, ${req.user.displayName}! <a href="/auth/logout">Logout</a>`);
    } else {
        res.send('<a href="/auth/google">Login with Google</a>');
    }
});

app.use('/auth', authRoutes);

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
