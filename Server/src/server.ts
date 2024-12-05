import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/Auth/AuthRoute';
import taskRoutes from './routes/Task/TaskRoute';
import categoryRoute from './routes/Category/CategoryRoute';
import userRoutes from './routes/User/UserRoutes';

dotenv.config();
connectDB();

const app: Application = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/category', categoryRoute);
app.use('/api/user', userRoutes);

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
