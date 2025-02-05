'use client'

import { useState } from 'react';
import { format } from 'date-fns';
import { updateTask, deleteTask } from '@/lib/actions';
import type { ITask } from '@/types';
import { Calendar, Check, Clock, Edit2, Trash2, X } from 'lucide-react';

export default function TaskItem({ task }: { task: ITask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async () => {
    await updateTask(task._id!.toString(), editedTask);
    setIsEditing(false);
  };
  
  const handleToggleComplete = async () => {
    await updateTask(task._id!.toString(), { ...task, completed: !task.completed });
  };
  
  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteTask(task._id!.toString());
  };
  

  if (isEditing) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-100 space-y-4 transform transition-all duration-200">
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          className="block w-full rounded-lg border-gray-200 bg-gray-50 text-gray-900 shadow-sm p-3 
                   focus:border-indigo-500 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
        />
        <textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          rows={3}
          className="block w-full rounded-lg border-gray-200 bg-gray-50 text-gray-900 shadow-sm p-3 
                   focus:border-indigo-500 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
        />
        <input
          type="datetime-local"
          value={format(new Date(editedTask.dueDate), "yyyy-MM-dd'T'HH:mm")}
          onChange={(e) => setEditedTask({ ...editedTask, dueDate: new Date(e.target.value) })}
          className="block w-full rounded-lg border-gray-200 bg-gray-50 text-gray-900 shadow-sm p-3 
                   focus:border-indigo-500 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
        />
        <div className="flex space-x-3">
          <button
            onClick={handleUpdate}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
                     transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Check className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 
                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 
                     transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    );
  }

  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`group p-6 bg-white rounded-lg shadow-lg border border-gray-100 
                    transform transition-all duration-200 hover:shadow-xl
                    ${task.completed ? 'opacity-75' : ''} 
                    ${isOverdue ? 'border-l-4 border-l-red-500' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className={`text-lg text-black font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          <p className="mt-2 text-gray-600">{task.description}</p>
        </div>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full
                     transition-colors duration-200"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full
                     transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(task.dueDate), 'PPp')}</span>
          </div>
        </div>
        <button
          onClick={handleToggleComplete}
          className={`px-4 py-2 rounded-full flex items-center space-x-1 transition-colors duration-200
                   ${task.completed 
                     ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                     : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
        >
          {task.completed ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
          <span>{task.completed ? 'Completed' : 'Pending'}</span>
        </button>
      </div>
    </div>
  );
}