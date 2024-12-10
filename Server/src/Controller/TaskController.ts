import { Request, Response } from 'express';
import Task from '../Models/TaskModel';
import User, { IUser } from '../Models/UserModel';

interface IRequest extends Request  {
  user: IUser
}
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, category, status, dueDate, priority } = req.body;
    const userId = (req as any).user.id;

    if (!title || !userId) {
      res.status(400).json({ message: 'Title, and user are required.' });
      return;
    }

    const task = new Task({
      title,
      description,
      category,
      user: userId,
      status: status || 'pending',
      dueDate,
      priority: priority || 'medium',
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

    const tasks = await Task.find({ user: userId })
      .populate('category', 'name')
      .sort({ dueDate: 1, priority: -1 });
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
    const { title, description, category, status, dueDate, priority } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, category, status, dueDate, priority },
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

export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    if (status === undefined) {
      res.status(400).json({ message: 'Status is required' });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    ).populate('category', 'name');

    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
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

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find()
      .populate('category', 'name')
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getTaskByIdTest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId)
      .populate('category', 'name')
      .populate('user', 'name'); 

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
