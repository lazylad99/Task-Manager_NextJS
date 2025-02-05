import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Task Management</h1>
      <div className="space-y-8">
        <TaskForm />
        <Suspense fallback={<div>Loading tasks...</div>}>
          <TaskList />
        </Suspense>
      </div>
    </main>
  );
}