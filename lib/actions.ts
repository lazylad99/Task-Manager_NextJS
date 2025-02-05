'use server'

import { revalidatePath } from 'next/cache';
import connectDB from './mongodb';
import { Task } from '../models/Task';
import { ITask } from '../types';
import { serializeData } from './utils';


export async function getTasks() {
  try {
    await connectDB();
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    return serializeData(tasks);
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
}

export async function addTask(formData: FormData) {
  try {
    await connectDB();
    
    const task = {
      title: formData.get('title'),
      description: formData.get('description'),
      dueDate: new Date(formData.get('dueDate') as string),
      completed: false,
    };

    await Task.create(task);
    revalidatePath('/');
  } catch (error: unknown) {
    console.error('Failed to create task:', error);
    throw new Error('Failed to create task. Please try again later.');
  }
}

export async function updateTask(id: string, updates: Partial<ITask>) {
  try {
    await connectDB();
    await Task.findByIdAndUpdate(id, updates);
    revalidatePath('/');
  } catch (error: unknown) {
    console.error('Failed to update task:', error);
    throw new Error('Failed to update task. Please try again later.');
  }
}

export async function deleteTask(id: string) {
  try {
    await connectDB();
    await Task.findByIdAndDelete(id);
    revalidatePath('/');
  } catch (error: unknown) {
    console.error('Failed to delete task:', error);
    throw new Error('Failed to delete task. Please try again later.');
  }
}