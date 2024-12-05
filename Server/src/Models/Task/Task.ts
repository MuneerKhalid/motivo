import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from '../Category/Category';
import { IUser } from '../User/User';

export interface ITask extends Document {
  title: string;
  description?: string;
  category: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;