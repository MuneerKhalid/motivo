import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  category: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'; 
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'overdue'],
      default: 'pending',
    },
    dueDate: { type: Date },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;
