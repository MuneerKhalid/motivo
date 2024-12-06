import { Request, Response } from "express";
import User from "../Models/UserModel";
import Task from "../Models/TaskModel";
import Category from "../Models/CategoryModel";
import generateResetToken from "../middleware/JWT_reset_password";
import sendEmail from "../config/nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';


export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find()
      .select("-password")
      .populate({
        path: "tasks",
        select: "title description category status priority dueDate ",
        populate: {
          path: "category",
          select: "name",
        },
      })
      .populate('categories', 'name');
      
    if (!users || users.length === 0) {
      res.status(404).json({ message: "No users found" });
      return;
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "tasks",
        select: "title description category",
        populate: {
          path: "category",
          select: "name",
        },
      });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "tasks",
        select: "title description category",
        populate: {
          path: "category",
          select: "name",
        },
      });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name is required to update." });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    await Task.deleteMany({ user: userId });
    await Category.deleteMany({ user: userId });

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "User and associated tasks deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const sendResetPassEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    const resetToken = generateResetToken(user._id);
    const resetURL = `http://localhost:5173//reset-password/${resetToken}`;

    await sendEmail(
      email,
      'Password Reset Request',
      `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetURL}" target="_blank">${resetURL}</a>
      <p>If you didn't request this, please ignore this email.</p>
      `
    );

    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Error sending email.', error: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
}};

export const resetUserPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
};
