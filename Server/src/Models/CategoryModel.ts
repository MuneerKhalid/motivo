import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;