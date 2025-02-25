 
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.todos.push(action.payload);
      },
      prepare(title, description) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            completed: false,
          },
        };
      },
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo(state, action) {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo(state, action) {
      const { id, title, description } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.title = title;
        todo.description = description;
      }
    },
    // If you need to set the entire list (e.g., from an API call)
    setTodos(state, action) {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, updateTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
