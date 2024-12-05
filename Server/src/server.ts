import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/Auth/AuthRoute';

dotenv.config();
connectDB();

const app: Application = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
