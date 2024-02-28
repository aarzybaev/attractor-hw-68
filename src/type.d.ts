export interface ApiTodo {
  title: string;
  status: boolean;
}

export interface Todo extends ApiTodo {
  id: string;
}

export interface ApiTodos {
  [id: string]: ApiTodo;
}