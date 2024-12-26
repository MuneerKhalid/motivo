import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/AuthRoute';
import taskRoutes from './routes/TaskRoute';
import categoryRoute from './routes/CategoryRoute';
import userRoutes from './routes/UserRoutes';
import { protect } from './middleware/AuthMiddleware';

dotenv.config();
connectDB();

const app: Application = express();

app.use(cors({
  origin: ['https://motivo-c7c3c.firebaseapp.com', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/task', protect, taskRoutes);
app.use('/api/category', protect, categoryRoute);
app.use('/api/user', protect, userRoutes);

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
