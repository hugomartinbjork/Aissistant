export interface User {
  id: number;
  email: string;
  token: string;
}

export interface Task {
  title: string;
  importance: number;
  comment?: string;
}
