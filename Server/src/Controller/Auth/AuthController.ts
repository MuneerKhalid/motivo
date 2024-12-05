import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../../Models/User/User';

interface CustomJwtPayload {
  id: string;
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    const existingUser = await User.findOne({ name });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user: IUser = await User.create({ name, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    const user = await User.findOne({ name });
    if (!user || !(await user.comparePassword(password))) {
      res.status(400).json({ message: 'Invalid name or password' });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    // Since the user is authenticated, we already have the user ID in req.user (set by the 'protect' middleware)
    const userId = (req as any).user.id; // Access the user ID from req.user

    // Fetch the user data from the database by ID
    const user = await User.findById(userId).select('-password'); // Exclude password field

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Respond with the user data
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
