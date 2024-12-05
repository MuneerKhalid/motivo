import { Request, Response } from 'express';
import Task from '../../Models/Task/Task';
import User from '../../Models/User/User';

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, category } = req.body;
    const userId = (req as any).user.id;

    if (!title || !category || !userId) {
      res.status(400).json({ message: 'Title, category, and user are required.' });
      return;
    }

    const task = new Task({
      title,
      description,
      category,
      user: userId,
    });

    await task.save();

    await User.findByIdAndUpdate(userId, { $push: { tasks: task._id } });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const tasks = await Task.find({ user: userId }).populate('category', 'name');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId).populate('category', 'name');
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { title, description, category } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, category },
      { new: true }
    ).populate('category', 'name');

    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const userId = (req as any).user.id;

    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    if (task.user.toString() !== userId) {
      res.status(403).json({ message: 'You are not authorized to delete this task' });
      return;
    }

    await Task.findByIdAndDelete(taskId);

    await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
