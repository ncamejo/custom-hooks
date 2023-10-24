import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';


const initialState = [];

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodos = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
  
    const handleNewTodo = (todo) => {
      const action = {
        type: '[TODO] Add todo',
        payload: todo,
      };
      dispatch(action);
    };
  
    const handleDeleteTodo = (id) => {
      dispatch({
        type: '[TODO] Remove todo',
        payload: id,
      });
    };
  
    const handleToggleTodo = (id) => {
      dispatch({
        type: '[TODO] Toggle todo',
        payload: id,
      });
    };

    const todosCount = todos.length

    const pendingTodosCount = todos.filter(todo => !todo.done).length

  return {
    todos,
    pendingTodosCount,
    todosCount,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo
  }
}
