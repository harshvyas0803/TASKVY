import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import sequelize from './models/Sequalize.js';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();




const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Test route
app.get('/', (req, res) => {
  res.send('Hello from the TASKVY App!');
});

// API Routes
app.use('/api/user', authRoutes);
app.use('/api/todos', todoRoutes);
// app.use('/api/notes', noteRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Server error' });
});

// Sync database and start server
sequelize.sync({ alter: true }).then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => console.error('Database sync error:', err));
