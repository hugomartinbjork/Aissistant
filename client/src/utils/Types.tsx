export interface User {
  id: number
  email: string
  token: string
}

export interface SignUpData {
  email: string
  password: string
}

export interface Task {
  title: string;
  importance: number;
  comment?: string;
}
