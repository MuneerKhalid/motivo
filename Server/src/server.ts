import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/AuthRoute';
import taskRoutes from './routes/TaskRoute';
import categoryRoute from './routes/CategoryRoute';
import userRoutes from './routes/UserRoutes';

dotenv.config();
connectDB();

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/category', categoryRoute);
app.use('/api/user', userRoutes);

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
