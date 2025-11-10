import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import coursesRoutes from './routes/courses.js';
import careerRoutes from './routes/career.js';
import { testConnection } from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/career', careerRoutes);

const PORT = process.env.PORT || 5000;

// Test database connection before starting server
testConnection().then((isConnected) => {
  if (isConnected) {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } else {
    console.error('Failed to connect to database. Server not started.');
    process.exit(1);
  }
});
