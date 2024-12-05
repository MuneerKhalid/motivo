import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  password: string;
  tasks: mongoose.Types.ObjectId[];
  comparePassword(enteredPassword: string): Promise<boolean>;
  _id: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  },
  { timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
