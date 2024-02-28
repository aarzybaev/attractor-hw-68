import {createSlice} from '@reduxjs/toolkit';
import {fetchTodo} from './todoThunks';
import {Todo} from '../../type';


interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: boolean;
}

const initialState: TodoState = {
  todos: [{id: '', 'title': '', status: false}],
  loading: false,
  error: false
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodo.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

  }
});

export const todoReducer = todoSlice.reducer;
