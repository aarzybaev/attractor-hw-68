import React, {useEffect, useState} from 'react';
import {AppDispatch, RootState} from '../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, deleteTodo, editTodo, fetchTodo} from './todoThunks';

const Todo = () => {
  const [title, setTitle] = useState('');
  const todos = useSelector((state: RootState) => state.todo.todos);
  const todoLoading: boolean = useSelector((state: RootState) => state.todo.loading);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const formHandle = async (e:React.FormEvent) => {
    e.preventDefault();
    await dispatch(addTodo(title));
    await dispatch(fetchTodo());
    setTitle('');
  };

  const titleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeIsActive = async (status: boolean, id: string) => {
    const index: number = todos.findIndex(item => item.id === id);
    await dispatch(editTodo({...todos[index], status}));
    await dispatch(fetchTodo());
  };

  const deleteItem = async (id: string) => {
    await dispatch(deleteTodo(id));
    await dispatch(fetchTodo());
  };


  return (
    <>
      <div className="col-8 m-auto">
        <form className="row mt-3" onSubmit={formHandle}>
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter new todo"
              required
              onChange={titleChange}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
        <hr/>
        {todoLoading ? 'Loading ...' : todos.filter(item => !item.status).map(item => (
          <div key={item.id} className="card mt-1">
            <div className="card-body d-flex justify-content-between">
              <div>{item.title}</div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={item.id}
                  checked={item.status}
                  onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                      void changeIsActive(e.target.checked, item.id);
                    }
                  }
                />
                <label className="form-check-label" htmlFor={item.id}>
                  Status
                </label>
              </div>
            </div>
          </div>))}
        <hr/>
        {todoLoading ? 'Loading ...' : todos.filter(item => item.status).map(item => (
          <div key={item.id} className="card mt-1">
            <div className="card-body d-flex justify-content-between">
              <div>{item.title}</div>
              <button className="btn btn-danger btn-sm ms-auto me-3" onClick={() => deleteItem(item.id)}>Delete</button>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={item.id}
                  checked={item.status}
                  onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                      void changeIsActive(e.target.checked, item.id);
                    }
                  }
                />
                <label className="form-check-label" htmlFor={item.id}>
                  Status
                </label>
              </div>
            </div>
          </div>))}
      </div>
    </>
  );

};
export default Todo;