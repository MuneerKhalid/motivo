import { Request, Response } from 'express';
import Category from '../Models/CategoryModel';
import Task from '../Models/TaskModel';
import User from '../Models/UserModel';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userId = (req as any).user.id;

    if (!name || !userId) {
      res.status(400).json({ message: 'Name and user are required.' });
      return;
    }

    const category = new Category({ name, user: userId });
    await category.save();
    await User.findByIdAndUpdate(userId, { $push: { categories: category._id } });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getCategoriesBySignedUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const categories = await Category.find({ user: userId });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getCategoryByIdSignedUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId, user: userId });

    if (!category) {
      res.status(404).json({ message: 'Category not found or not associated with the user.' });
      return
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { categoryId } = req.params;
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Category name is required.' });
      return;
    }

    const category = await Category.findOneAndUpdate(
      { _id: categoryId, user: userId }, 
      { name },
      { new: true }
    );

    if (!category) {
      res.status(404).json({ message: 'Category not found or not associated with the user.' });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { categoryId } = req.params;

    const category = await Category.findOneAndDelete({ _id: categoryId, user: userId });

    if (!category) {
      res.status(404).json({ message: 'Category not found or not associated with the user.' });
      return;
    }

    await Task.updateMany({ category: categoryId }, { $unset: { category: "" } });

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      res.status(404).json({ message: 'No Categories found.' });
      return;
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getCategorieById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId })

    if (!category) {
      res.status(404).json({ message: 'No Categories found.' });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
};