'use client'

import { useState } from 'react';
import { addTask } from '@/lib/actions';
import { Calendar, FileText, PlusCircle } from 'lucide-react';

export default function TaskForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      setIsLoading(true);
      await addTask(formData);
      const form = document.querySelector('form');
      form?.reset();
      setIsExpanded(false);
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="transition-all duration-300 ease-in-out">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full bg-white rounded-lg shadow p-4 flex items-center justify-center space-x-2 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Task</span>
        </button>
      ) : (
        <form action={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-lg border border-gray-100">
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Title</span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder="Enter task title"
              className="mt-1 block w-full rounded-lg border-gray-200 bg-gray-50 text-gray-900 shadow-sm p-3 
                       focus:border-indigo-500 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Description</span>
            </label>
            <textarea
              name="description"
              id="description"
              required
              placeholder="Enter task description"
              rows={3}
              className="mt-1 block w-full rounded-lg border-gray-200 bg-gray-50 text-gray-900 shadow-sm p-3 
                       focus:border-indigo-500 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Due Date</span>
            </label>
            <input
              type="datetime-local"
              name="dueDate"
              id="dueDate"
              required
              className="mt-1 block w-full rounded-lg border-gray-200 bg-gray-50 text-gray-900 shadow-sm p-3 
                       focus:border-indigo-500 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
            />
          </div>
          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
                       disabled:opacity-50 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" />
                  <span>Add Task</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-4 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 
                       focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 
                       transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}