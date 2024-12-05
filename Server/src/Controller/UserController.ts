import { Request, Response } from "express";
import User from "../Models/UserModel";
import Task from "../Models/TaskModel";
import Category from "../Models/CategoryModel";


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
