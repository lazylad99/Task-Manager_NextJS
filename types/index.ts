export interface ITask {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}