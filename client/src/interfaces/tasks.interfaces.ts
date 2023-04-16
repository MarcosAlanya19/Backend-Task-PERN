interface ITaskData {
  id: string;
  title: string;
  description: string;
}

type TTaskForm = Omit<ITaskData, 'id'>;
