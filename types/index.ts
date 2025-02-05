import mongoose from 'mongoose';

export interface ITask {
  _id: string | mongoose.Types.ObjectId; // Allow both types
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}