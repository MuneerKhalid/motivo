
const mongoose = require('mongoose');

let isConnected = false; 

const connectDB = async () => {
  if (isConnected) {
    console.log('Database is already connected');
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } 
  catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);

    process.exit(1);
  }
};

module.exports = connectDB;
