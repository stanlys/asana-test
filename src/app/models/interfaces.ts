export type IStatus = 'todo' | 'in-progress' | 'done';

export type IPriority = 'low' | 'medium' | 'high';

export type ITask = {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  priority: IPriority;
  status: IStatus;
  assignees: string[];
};

export type IUser = {
  login: string;
  password: string;
  email: string;
};

export type IUserLogin = Omit<IUser, 'email'>;

export type ITaskCreate = Omit<ITask, 'id'>;
