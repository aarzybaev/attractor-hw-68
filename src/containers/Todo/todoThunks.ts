import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI';
import {ApiTodo, ApiTodos, Todo} from '../../type';
import {RootState} from '../../app/store';

export const fetchTodo = createAsyncThunk(
  'todo/fetch',
  async () => {
    const {data: todos} = await axiosAPI.get<ApiTodos | null>('/todos.json');
    if (todos) {
      const newTodos: Todo[] = Object.keys(todos).map(id => ({...todos[id], id}));
      return newTodos;
    } else {
      return [];
    }
  }
);

export const  addTodo = createAsyncThunk<void, string, {state: RootState}>(
  'todo/add',
  async (arg) => {
    await axiosAPI.post<ApiTodo>('todos.json', {title: arg, status: false});
  }
);

export const  deleteTodo = createAsyncThunk<void, string, {state: RootState}>(
  'todo/delete',
  async (arg) => {
    await axiosAPI.delete<ApiTodo>('todos/' + arg + '.json');
  }
);

export const  editTodo = createAsyncThunk<void, Todo, {state: RootState}>(
  'todo/edit',
  async (arg) => {
    console.log(arg);
    await axiosAPI.put<ApiTodo>('todos/' + arg.id + '.json', {title: arg.title, status: arg.status});
  }
);
