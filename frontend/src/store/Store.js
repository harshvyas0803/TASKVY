
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import todoReducer from './slices/todoSlice';
import noteReducer from './slices/noteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
    notes: noteReducer,
  },
});

export default store;




/*

Store Creation:
configureStore({...}):
This function creates a Redux store.
reducer: { ... }:
Here, we pass an object where each key corresponds to a slice of your state:
auth: authReducer means that the state managed by authReducer will be available under state.auth.
todos: todoReducer means that the state managed by todoReducer will be available under state.todos.
Real-life analogy:
Imagine you’re organizing a filing cabinet. Each drawer is labeled (like "auth" and "todos") and contains files (state) that are managed by specific systems (reducers).




*/