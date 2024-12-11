import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('MONGO_URI is not defined in the environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully');

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB connection lost');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    process.on('SIGINT', async () => {
      console.log('SIGINT signal received: closing MongoDB connection');
      await mongoose.disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('SIGTERM signal received: closing MongoDB connection');
      await mongoose.disconnect();
      process.exit(0);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to MongoDB:', error.message);
      console.error(error.stack);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    process.exit(1);
  }
};

export default connectDB;
