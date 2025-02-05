import TaskItem from './TaskItem';
import { getTasks } from '@/lib/actions';
import { ClipboardList } from 'lucide-react';

export default async function TaskList() {
  const tasks = await getTasks();

  if (!tasks.length) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <ClipboardList className="w-12 h-12 mx-auto text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks yet</h3>
        <p className="mt-1 text-gray-500">Get started by creating a new task above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}